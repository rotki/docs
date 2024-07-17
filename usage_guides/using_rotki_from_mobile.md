# Using rotki from mobile

If you are using DAppNode or the Docker image instead of the Electron application, it is possible to access rotki from a mobile device.

## DAppNode

If you are running rotki on a DAppNode, then in order to access rotki on mobile the only thing needed is to set up a [VPN connection](https://docs.dappnode.io/user-guide/ui/access/vpn/) between DAppNode and your phone or tablet.

You can use either Wireguard or OpenVPN by following the guide linked above. When you are done with the configuration, you can activate the VPN connection on your device. With the VPN activated, you will be able to access rotki on `http://rotki.dappnode`.

![rotki running on DAppNode accessed from a mobile device](/images/rotki_dappnode_mobile.png)

This way you can get the full rotki functionality on mobile.

## Docker

Accessing rotki on mobile when you run Docker on your own can be a bit complicated and depends on the kind of setup you have. You have to make sure that [rotki is never directly accessible from a public network](/requirement_and_installation/packaged_binaries.html#docker).

One way to have rotki accessible on mobile over a public network is by making sure that an [authenticated proxy](#docker-rotki-public) intercepts all traffic directed to rotki. This way you can ensure that no one else can access your rotki instance.

If you followed the authenticated proxy example from above, you should be able to access rotki's interface by going to `https://rotki.example.com` on your phone or tablet.

Alternatively, if you already have a VPN setup to your private network or on the machine, you could use this VPN connection to securely connect to the rotki instance that runs on this network machine.

![rotki warning for docker](/images/rotki_docker_warning.png)

For awareness reasons, if the app is run in Docker, you will see this warning every time it is opened. You can turn it off by running the rotki Docker image with this environment variable:

```sh
ROTKI_ACCEPT_DOCKER_RISK=1
