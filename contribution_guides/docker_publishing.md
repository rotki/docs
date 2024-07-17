# Docker Publishing (Manual)

If you need to publish on [hub.docker.com](https://hub.docker.com), follow these steps:

> **Note:** Make sure you are logged in with an account that has access to publish to Docker.

This process installs the qemu binaries required to build the `arm64` binary and uses buildx to build the images. Replace `REVISION` with the git SHA of the tag and `ROTKI_VERSION` with the tag name.

```sh
docker pull tonistiigi/binfmt:latest
docker run --rm --privileged tonistiigi/binfmt:latest --install arm64
docker buildx create --name imgbldr --use
docker buildx inspect --bootstrap --builder imgbldr
docker buildx build --build-arg REVISION='git sha' --build-arg ROTKI_VERSION=vx.x.x --file ./Dockerfile --platform linux/amd64 --platform linux/arm64 --tag rotki/rotki:vx.x.x --tag rotki/rotki:latest --push .
```
