---
description: Run rotki in a Docker container, with configuration, Docker Compose templates, updating, and migrating data from the desktop app.
---

# Docker & Self-Hosting

rotki provides official Docker images starting from v1.11.0. Images are published on [DockerHub](https://hub.docker.com/r/rotki/rotki) as `rotki/rotki`.

> [!WARNING]
> rotki was not designed to run over a public network. Keep the container inside a trusted environment (for example, on your home LAN or behind a VPN) and do not expose it directly to the internet to avoid unauthorized access to your data.

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

> [!WARNING]
> On Linux, the mounted `data` and `logs` folders must be owned by `root` — that's the user the container runs as. If you change the owner, the container will hit permission errors and rotki will return 500 responses.

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

Supported variables: `LOGLEVEL`, `LOGFROMOTHERMODULES`, `MAX_SIZE_IN_MB_ALL_LOGS`, `MAX_LOGFILES_NUM`, `SQLITE_INSTRUCTIONS`. Changing these requires recreating the container.

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
