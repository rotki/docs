---
description: Run rotki in a Docker container, with configuration, Docker Compose templates, updating, and migrating data from the desktop app.
---

# Docker & Self-Hosting

rotki provides official Docker images starting from v1.11.0. Images are published on [DockerHub](https://hub.docker.com/r/rotki/rotki) as `rotki/rotki`.

> [!WARNING]
> Never publish the container's port directly to the internet. rotki was not built to be the only thing between the internet and your data. Keep it on a trusted network, behind a VPN, or behind a reverse proxy you control that authenticates every request and terminates TLS. See [Security](#security) for what the port exposes and how to lock it down.

> [!NOTE]
> Versions up to v1.13.2 report a dev version inside the app due to an old build process issue. This is cosmetic and doesn't affect functionality.

## Quick start

Pull the latest image:

```sh
docker pull rotki/rotki:latest
```

Start a container with persistent data and log volumes:

```sh
docker run -d --name rotki \
    -p 8084:80 \
    -v $HOME/.rotki/data:/data \
    -v $HOME/.rotki/logs:/logs \
    rotki/rotki:latest
```

Open `http://localhost:8084` in your browser and you'll see the rotki login screen. If port `8084` is taken, pick any free port and change the left-hand side of `-p`.

Your account data lives under `~/.rotki/data`; your logs are under `~/.rotki/logs`. Both survive container restarts and upgrades as long as you reuse the same volumes.

> [!NOTE]
> On first start the container takes ownership of the mounted `data` and `logs` folders, setting them to uid/gid `10001`, which is what the unprivileged backends run as. On the host those files are then no longer owned by your own user, so editing or deleting them directly needs `sudo` or a throwaway container:
>
> ```sh
> docker run --rm -v $HOME/.rotki/data:/data debian:12-slim rm -rf /data/some-file
> ```
>
> If you pass `docker run --user <uid>` the container skips the drop and runs as that uid instead, but then the volumes must already be writable by it. That includes `/data/.starling.lock`, which a previous root-started container left owned by root: if the container now exits reporting that it could not lock the data directory, `chown` that file to the uid you are running as.

## Configuring the backend

You can tune the backend with either a config file or environment variables. If both are present, the config file takes precedence.

### Config file

Mount an extra volume for config:

```sh
docker run -d --name rotki \
    -p 8084:80 \
    -v $HOME/.rotki/data:/data \
    -v $HOME/.rotki/logs:/logs \
    -v $HOME/.rotki/config:/config \
    rotki/rotki:latest
```

Create `$HOME/.rotki/config/rotki_config.json`:

```json
{
  "loglevel": "info",
  "logfromothermodules": true,
  "sleep-secs": 22,
  "max_size_in_mb_all_logs": 550,
  "max_logfiles_num": 3,
  "sqlite_instructions": 0
}
```

You can include only the options you want to override. Restart the container to apply changes.

### Environment variables

```sh
docker run -d --name rotki \
    -p 8084:80 \
    -v $HOME/.rotki/data:/data \
    -v $HOME/.rotki/logs:/logs \
    -e LOGLEVEL=debug \
    rotki/rotki:latest
```

| Variable                           | Meaning                                                                    |
| ---------------------------------- | -------------------------------------------------------------------------- |
| `LOGLEVEL`                         | backend log level                                                          |
| `LOGFROMOTHERMODULES`              | include third-party library logs                                           |
| `MAX_SIZE_IN_MB_ALL_LOGS`          | total log size budget                                                      |
| `MAX_LOGFILES_NUM`                 | rotated log files to keep                                                  |
| `SQLITE_INSTRUCTIONS`              | SQLite instructions-per-context                                            |
| `ROTKI_HTTP_PORT`                  | the port rotki serves on _inside_ the container (default `80`)             |
| `TZ`                               | container timezone, see [below](#setting-the-timezone)                     |
| `ROTKI_SESSION_KEY`                | turns on session authentication, see [Security](#security)                 |
| `ROTKI_ACCEPT_UNAUTHENTICATED_API` | silences the unauthenticated-API warning, see [Security](#security)        |
| `ROTKI_SESSION_COOKIE_SECURE`      | marks the session cookie `Secure`, see [below](#marking-the-cookie-secure) |

Configuration is read once at boot, so changing any of these requires recreating the container.

## Security

Everything in this section is about one question: **who can reach the port you published, and what can they do once they get there.** Read it before you expose rotki to anything wider than your own machine.

### What the published port exposes

The container publishes a single port. Behind it, one supervisor serves the web interface and proxies to the backends, which listen only on loopback inside the container and are not reachable from outside it. These are the paths on that port:

| Path                  | Without `ROTKI_SESSION_KEY`        | With `ROTKI_SESSION_KEY`                                                                                        |
| --------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `/` and static assets | the web interface                  | the web interface                                                                                               |
| `/api/…`              | **open**                           | session cookie required, except the pre-login calls below                                                       |
| `/colibri/…`          | **open**                           | session cookie required                                                                                         |
| `/ws`                 | **open**                           | handshake refused without a live session                                                                        |
| `/mcp/…`              | `404`, the route is not registered | session cookie required, and only reaches a server if MCP is enabled in the app, see below                      |
| `/health`             | open                               | open, by design                                                                                                 |
| `/_control`           | `404`                              | `GET` lists the available operations; performing one needs the session cookie, re-validated against the backend |

`/health` answers `{"ok":…,"degraded":…}` and nothing else. It is deliberately unauthenticated so an external monitor can probe it, and it deliberately carries no pids, service names or error text: anything on the published port is readable by whoever can reach it.

`/mcp` takes two separate switches. The session key decides whether the route exists at all: without one it is never registered and answers `404`. Turning MCP on in rotki's own settings is what actually starts the server. With a session key but MCP left off, the route is there and answers `401` to a caller with no session, but there is nothing behind it for a signed-in one to reach either. MCP does not start on a deployment with no session key even if the setting was turned on earlier, since nothing there could route to it or authorize a caller.

Even with a session key set, these calls are reachable **before** signing in, because the login screen itself needs them:

| Call                                    | What it gives away                                                   |
| --------------------------------------- | -------------------------------------------------------------------- |
| `GET /api/1/ping`                       | that rotki is here                                                   |
| `GET /api/1/info`                       | version, log level, and the data directory path inside the container |
| `GET /api/1/users`                      | **the names of every account on the instance**                       |
| `PUT /api/1/users`                      | **creates a new account**                                            |
| `POST /api/1/users/<name>`              | sign in                                                              |
| `POST /api/1/users/<name>/authenticate` | sign in                                                              |

Everything else is denied by default. Note the two in bold: account names are enumerable, and account creation is not gated. A new account cannot read an existing account's data, since each one is encrypted with its own password, but it is still an unauthenticated write by anyone who can reach the port.

### Session authentication

Setting `ROTKI_SESSION_KEY` turns on session authentication. Generate a random key and pass it to the container:

```sh
docker run -d --name rotki \
    -p 8084:80 \
    -v $HOME/.rotki/data:/data \
    -v $HOME/.rotki/logs:/logs \
    -e ROTKI_SESSION_KEY="$(openssl rand -hex 32)" \
    rotki/rotki:latest
```

With the key set:

- Signing in issues an `HttpOnly` session cookie. Any request that does not carry it is rejected with `401`, and the websocket connection is refused as well.
- Only one session is active at a time. Signing in from another browser or device signs the previous one out.
- The login screen no longer shows the Docker warning, because there is no longer an unauthenticated instance to warn about.

Keep the key stable across restarts. If it changes, or is dropped, every existing session becomes invalid and you have to sign in again. With Docker Compose, put it in the `.env` file next to `docker-compose.yml`:

```sh
ROTKI_SESSION_KEY=<the value you generated>
```

and reference it from the `rotki` service:

```yaml
services:
  rotki:
    environment:
      - ROTKI_SESSION_KEY=${ROTKI_SESSION_KEY}
```

### What session authentication does not do

Session authentication closes the open door. It is not a substitute for putting rotki behind something that terminates TLS and authenticates for it.

- **There is no TLS.** The image speaks plain HTTP, and the session cookie is not marked `Secure` by default, so it works on loopback and a LAN. Your account password on the way in, and the session cookie on every request after, both cross the network in cleartext. Anyone who can observe or redirect traffic between your browser and the container can read them and reuse the cookie. Terminating TLS in front of the container fixes the encryption; [marking the cookie `Secure`](#marking-the-cookie-secure) then stops it ever being sent in the clear.
- **There is no brute-force protection on sign-in.** Nothing rate-limits or locks out repeated attempts, so the strength of the whole thing is the strength of your account password.
- **The pre-login calls above stay open.** Account names remain enumerable and account creation remains ungated, with or without a session key.
- **A session goes stale after a day idle, and can never outlive 7 days.** Using it rolls the idle window forward, so an active session does not expire mid-use, but no amount of use extends it past the 7-day ceiling. Signing out, or signing in elsewhere, ends it immediately either way.

### Use an authenticating reverse proxy

If rotki is reachable by anything other than the machine it runs on, put an authenticating reverse proxy in front of it and let that proxy terminate TLS. This is the recommended setup, and it stays the recommended setup with `ROTKI_SESSION_KEY` set.

A proxy fixes exactly what the list above cannot:

- it encrypts the connection, so the password and cookie are no longer in the clear;
- it can send `Strict-Transport-Security` (HSTS), which is worth turning on even after you mark the cookie `Secure`. The two close different halves of the same gap: `Secure` stops the browser _sending_ the cookie over plain HTTP, while HSTS stops it _making_ the plaintext request at all. Without HSTS the request still goes out, just without the cookie. Pair it with an unconditional HTTP to HTTPS redirect, and do not serve rotki on plain HTTP alongside;
- it rejects unauthenticated callers **before** they reach rotki, so the pre-login calls stop being exposed at all;
- it is where rate limiting, IP allowlisting and tools like fail2ban belong.

The [Traefik + basic auth example](#public-network-with-traefik-basic-auth) below is a working starting point. Use the two together: the proxy keeps strangers off the port, and the session key means a request that does get through still has to carry a signed-in session.

> [!WARNING]
> What must never be public is rotki's **own** port. Behind a proxy you control, that authenticates every request and terminates TLS, reaching rotki over the internet is fine, and that is what the Traefik example is for. The danger is publishing the container's port directly, or putting a proxy in front that forwards without authenticating: rotki was not built to be the thing standing between the internet and your data. If you would rather not run a proxy at all, a VPN into the network the container sits on gets you the same result.

### Marking the cookie `Secure`

Once TLS is terminated in front of the container, `ROTKI_SESSION_COOKIE_SECURE` marks the session cookie `Secure`, which tells the browser never to send it over a plain HTTP connection.

It is off by default and has to stay that way: the image itself speaks plain HTTP, and on loopback or a LAN the flag would stop the cookie being sent at all, so nobody could sign in. Only you know whether something in front is terminating TLS.

| Value               | Behaviour                                              |
| ------------------- | ------------------------------------------------------ |
| unset, `0`, `false` | off, the default                                       |
| `1`, `true`         | always mark the cookie `Secure`                        |
| `forwarded`         | decide per request from the `X-Forwarded-Proto` header |

Use `1` when TLS is terminated in front and you know every request reaches the browser over HTTPS. Use `forwarded` when your proxy sets `X-Forwarded-Proto` and you want the flag to follow the actual scheme. An unrecognised value logs a warning and is treated as off, rather than quietly deciding whether a credential may cross a plaintext connection.

```yaml
services:
  rotki:
    environment:
      - ROTKI_SESSION_KEY=${ROTKI_SESSION_KEY}
      - ROTKI_SESSION_COOKIE_SECURE=forwarded
```

> [!WARNING]
> If you set `1` while the browser still reaches rotki over plain HTTP, nobody can sign in: the browser refuses a `Secure` cookie that arrives over a plaintext connection, so the cookie is discarded and every request looks unauthenticated. Set it only once TLS actually terminates in front.

In `forwarded` mode rotki does not simply believe the header. The supervisor rewrites `X-Forwarded-Proto` on every proxied request, keeping an inbound value only when the peer is a trusted hop and overwriting it with `http` otherwise, so a client cannot dictate the value by sending the header itself. Two consequences are worth knowing:

- **If your TLS terminator reaches the container from a public address, name it with `--trusted-proxy`.** Otherwise its `X-Forwarded-Proto: https` is discarded like any other untrusted peer's and the cookie is silently never marked `Secure`, even though TLS is working. Nothing warns you; sign-in keeps working, just without the flag.
- **Loopback, private and link-local peers are trusted by default**, and that set can only be extended, never narrowed. A client on the same LAN as the container is therefore trusted and can set the header on its own requests. That only affects the cookie in its own response, so it can force `Secure` onto its own session but cannot weaken anyone else's. If you would rather not allow even that, use `1` instead of `forwarded`, and do not publish the port to a network you do not trust.

### Accepting the risk instead

If you know the instance is unreachable by anyone else and you do not want session authentication, you can dismiss the warning permanently:

```sh
ROTKI_ACCEPT_UNAUTHENTICATED_API=1
```

This only hides the warning. It changes nothing about who can reach the API, so prefer `ROTKI_SESSION_KEY` whenever you can.

> [!NOTE]
> This replaces `ROTKI_ACCEPT_DOCKER_RISK`, which is no longer read. That variable acknowledged an older, vaguer warning that never mentioned authentication, so it is deliberately not carried over. If you had set it, you will see the new warning once, and can then pick between `ROTKI_SESSION_KEY` and the variable above.

### Hardened run

These cannot be baked into the image, they are flags you pass at run time:

```sh
docker run -d --name rotki \
    -p 8084:80 \
    --cap-drop=ALL \
    --cap-add=CHOWN --cap-add=DAC_OVERRIDE --cap-add=SETUID --cap-add=SETGID --cap-add=NET_BIND_SERVICE \
    --security-opt=no-new-privileges \
    --read-only --tmpfs /tmp --tmpfs /run \
    -v $HOME/.rotki/data:/data \
    -v $HOME/.rotki/logs:/logs \
    -e ROTKI_SESSION_KEY="$(openssl rand -hex 32)" \
    rotki/rotki:latest
```

`--read-only` works because there is no web-server cache or run directory left in the image. Two writable mounts are still needed: `/tmp` for scratch files and `/run` for the supervisor's control socket.

Some of this the image already does for you, whether or not you pass the flags. The container starts as root only to bind its port and to take ownership of volumes from an older release, then drops itself and both backends to uid/gid `10001` and never regains privilege. It sets `no_new_privs` before starting anything, and it ships no setuid or setgid binaries at all, so there is nothing to regain privilege through.

That startup is what the five `--cap-add` flags are for, and each one is load-bearing: `CHOWN` to take ownership of the volumes, `DAC_OVERRIDE` to then write `/data/.starling.lock` into a directory it has just given away while still root, `SETUID` and `SETGID` for the drop itself, and `NET_BIND_SERVICE` to bind port `80` before it. A bare `--cap-drop=ALL` takes all five away, and each missing one is a fatal startup error rather than a degraded run.

To grant no capabilities at all, run as the unprivileged uid instead: add `--user 10001:10001` and drop every `--cap-add`. Started non-root the supervisor skips privilege separation entirely, so nothing needs a capability, but three things then become yours to arrange. The volumes must already be writable by `10001`, including `/data/.starling.lock` if a root-started container left one behind, as [above](#quick-start). `/run` must be owned by the same uid (`--tmpfs /run:uid=10001,gid=10001`), or the control socket cannot be bound and the container exits before serving. And the internal port must be above 1024, so pass `-e ROTKI_HTTP_PORT=8080` and publish that instead; the health check follows the variable on its own.

The image is built on a distroless base, so there is no shell, no package manager and no coreutils inside it. `docker exec <container> sh` will not work. To inspect a running container, exec the supervisor binary directly:

```sh
docker exec rotki /opt/rotki/starling ctl status
```

## Health and shutdown

### The built-in health check

The image ships its own `HEALTHCHECK`, so `docker ps` and any orchestrator that reads container health already know whether rotki is serving. You do not need to add one to your Compose file.

It probes two URLs on the container's own port and requires both to answer:

- `/health`, the supervisor's view of the processes it manages. This is what notices that colibri has died.
- `/api/1/ping`, which only answers if the proxy is really forwarding to the backend.

Neither covers the other. `/health` is answered by the supervisor itself, so it keeps reporting `ok` while the path to the backend is broken, and a plain ping never touches colibri at all.

The probe resolves the port exactly as the server does, so `-e ROTKI_HTTP_PORT=8080` keeps the two in agreement with no further change. The first check is deferred for 60 seconds: on a fresh volume the backend has to build its global database before it can answer, and a container that is legitimately still starting should not be reported unhealthy.

### Stopping the container

`docker stop` sends `SIGTERM`, which the supervisor handles: it asks the backends to stop, gives them ten seconds to finish writing, and only then escalates. Allow for that when you set a stop timeout. `docker stop --time 5` cuts the shutdown short and kills the backends mid-write, and the ten second default leaves no margin, so prefer `--time 20`.

## Setting the timezone

Set `TZ` when starting the container:

```sh
docker run -d --name rotki \
    -p 8084:80 \
    -v $HOME/.rotki/data:/data \
    -v $HOME/.rotki/logs:/logs \
    -e TZ=America/New_York \
    rotki/rotki:latest
```

See the [tz database list](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) for valid values.

## Updating to a newer version

When a new rotki version is released:

```sh
# 1. Stop and remove the old container (data lives in volumes, so this is safe)
docker stop rotki
docker rm rotki

# 2. Pull the latest image
docker pull rotki/rotki:latest

# 3. Start a new container — reuse the same volumes
docker run -d --name rotki \
    -p 8084:80 \
    -v $HOME/.rotki/data:/data \
    -v $HOME/.rotki/logs:/logs \
    rotki/rotki:latest
```

> [!IMPORTANT]
> Always reuse the same volumes. If you mount different ones, your existing accounts and data won't be visible to the new container.

## Docker Compose

For most users, a simple private-network Compose file is the easiest way to keep rotki running.

### Private network

**Using Docker-managed volumes:**

```yaml
version: '3.7'
services:
  rotki:
    environment:
      - TZ=America/Chicago
    image: rotki/rotki:latest
    ports:
      - '8084:80'
    networks:
      - rotki-net
    volumes:
      - rotki-data:/data
      - rotki-logs:/logs
volumes:
  rotki-data:
  rotki-logs:
networks:
  rotki-net:
```

**Using host paths:**

```yaml
version: '3.7'
services:
  rotki:
    environment:
      - TZ=America/Chicago
    image: rotki/rotki:latest
    ports:
      - '8084:80'
    networks:
      - rotki-net
    volumes:
      - $HOME/.rotki/data:/data
      - $HOME/.rotki/logs:/logs
networks:
  rotki-net:
```

### Public network with Traefik + basic auth

> [!WARNING]
> Exposing rotki to the public internet is not recommended. If you do, protect it with at least basic authentication and TLS.

This setup uses Traefik as a reverse proxy with basic auth and automatic Let's Encrypt TLS. Assuming you have a server at `rotki.example.com`:

1. Create a bcrypt-hashed password for the basic auth user:

   ```sh
   htpasswd -cB ~/.rotki/.htpasswd user
   ```

2. Create `.env` next to `docker-compose.yml`:

   ```sh
   AUTH_USER=username
   FQDN=rotki.example.com
   LETSENCRYPT_EMAIL=user@example.com
   ```

3. Create `docker-compose.yml`:

   ```yaml
   version: '3.11'
   services:
     proxy:
       image: traefik:2.9
       restart: always
       command:
         - --global.sendAnonymousUsage=false
         - --providers.docker
         - --providers.docker.exposedByDefault=false
         - '--entrypoints.web.address=:80'
         - '--entrypoints.websecure.address=:443'
         - --certificatesresolvers.le.acme.httpchallenge=true
         - --certificatesresolvers.le.acme.httpchallenge.entrypoint=web
         - '--certificatesresolvers.le.acme.email=${LETSENCRYPT_EMAIL}'
         - --certificatesresolvers.le.acme.storage=/etc/acme/acme.json
       ports:
         - '80:80'
         - '443:443'
       networks:
         - rotki-net
       volumes:
         - $HOME/.rotki/.htpasswd:/auth/.htpasswd
         - $HOME/.rotki/acme/:/etc/acme/
         - /var/run/docker.sock:/var/run/docker.sock:ro

     rotki:
       environment:
         - TZ=Europe/Berlin
       image: rotki/rotki:latest
       networks:
         - rotki-net
       volumes:
         - $HOME/.rotki/data:/data
         - $HOME/.rotki/logs:/logs
       labels:
         - traefik.enable=true
         - traefik.http.services.rotki.loadbalancer.server.port=80
         - traefik.http.middlewares.redirect.redirectscheme.scheme=https
         - 'traefik.http.middlewares.rotki-auth.basicauth.realm=${AUTH_USER}'
         - traefik.http.middlewares.rotki-auth.basicauth.usersfile=/auth/.htpasswd
         - 'traefik.http.routers.rotki-insecure.rule=Host(`${FQDN}`)'
         - traefik.http.routers.rotki-insecure.middlewares=redirect
         - 'traefik.http.routers.rotki.rule=Host(`${FQDN}`)'
         - traefik.http.routers.rotki.middlewares=rotki-auth
         - traefik.http.routers.rotki.entrypoints=websecure
         - traefik.http.routers.rotki.tls.certresolver=le

   networks:
     rotki-net:
   ```

4. Start it:

   ```sh
   docker-compose up -d
   ```

Visiting `http://rotki.example.com` will prompt for the basic auth user and password, then redirect to the rotki login page over HTTPS. This also makes rotki reachable from your mobile device.

### Watchtower for auto-updates

Add a Watchtower service to the compose file above for zero-downtime updates (`--rolling-restart`):

```yaml
watchtower:
  image: containrrr/watchtower
  command:
    - --label-enable
    - --interval
    - '60'
    - --rolling-restart
  volumes:
    - /var/run/docker.sock:/var/run/docker.sock
```

Then add this label to the `rotki` service so Watchtower manages it:

```yaml
labels:
  - com.centurylinklabs.watchtower.enable=true
```

## Moving accounts from the desktop app

If you've been running rotki as a desktop app and want to switch to Docker, you can copy your account files into the Docker data volume.

Find the desktop app's data directory using the [rotki data directory guide](/usage-guides/advanced/data-directory#rotki-data-directory), then copy any specific account over:

```sh
# Example: Linux, user "alice", data volume at ~/.rotki/data
sudo cp -R ~/.local/share/rotki/data/alice ~/.rotki/data/alice
```

The next time you start the Docker container, the `alice` account will appear on the login screen.

## Troubleshooting

If you hit issues, check the logs at `$HOME/.rotki/logs/rotki.log` (or your custom logs volume) and [open an issue on GitHub](https://github.com/rotki/rotki/issues/new/choose) with the relevant lines.
