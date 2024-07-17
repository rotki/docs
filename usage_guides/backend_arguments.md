# Set the backend's arguments

Rotki runs a Python daemon on the backend. Most times you won't need to customize its arguments, but if you need to do so, especially for debugging purposes, this is how you can.

Create or edit (if it exists) a file with the name `rotki_config.json` in the same directory as the rotki executable. Add to the JSON object any arguments that are also arguments of rotki. Then when rotki starts, these will be passed as arguments to the backend. An example `rotki_config.json` follows:

```json
{
    "loglevel": "debug",
    "logfromothermodules": false,
    "log-dir": "/path/to/dir",
    "data-dir": "/path/to/dir",
    "sleep-secs": 20,
    "max_size_in_mb_all_logs": 500,
    "max_logfiles_num": 2
}
