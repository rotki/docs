# rotki Contribution Guide

rotki is an open-source project, so help is really appreciated.

## Bug Reporting

Before reporting an issue, make sure to check the issue tracker for similar ones. If this is a new issue, then use the [proper template](https://github.com/rotki/rotki/issues/new?template=bug_report.md) providing a detailed description about:

- **Problem**: What happened and what you were expecting to happen instead.
- **Logs**: Run rotki in debug mode, replicate the issue, and attach the logs (see the section [Run rotki in debug mode](#run-rotki-in-debug-mode)).
- **Environment**: The operating system and the rotki version.

## Run rotki in debug mode

For running rotki in debug mode, you can do it either via a config file or the app UI. The choice will depend on how you run rotki.

- **Config file**: See the section [Set the backend's arguments](/usage_guides/backend_arguments.html#set-the-backend-s-arguments). This is possible in the **electron app** and the **docker version**. For docker, you can even use environment variables as explained [here](/requirement_and_installation/packaged_binaries.html#configuring-the-backend-in-docker).
- **App UI**: Before logging in, click the cog wheel at the bottom right corner and select "Debug" (image below). Press the save button and proceed to log in as usual. This is only possible in the **electron app**.

![Run rotki in debug mode via app UI](/images/rotki_debug_mode_set.png)

You can open the app logs location by going to the "Help" menu at the top and then choosing "Logs Directory".

The default log locations are:

- **Linux**: `~/.config/rotki/logs`
- **OSX**: `~/Library/Application Support/rotki/logs`
- **Windows**: `%APPDATA%\rotki\logs`

Logs created by running in debug mode will contain private data such as addresses. To try and reduce the amount of private data in the logs, you can optionally run a `regex` find and replace script on your log file.

[Here](https://gist.github.com/iSpeakNerd/7261feaf97d25a55d173cedeb4568544) is an example script. It is included in the docs for inspiration and will catch some instances of private data but not all. **Do not** make any assumptions about the logs and only share them with rotki developers. If you write a script that is over-censoring and important data are redacted, we may ask you to give us the uncensored logs.
