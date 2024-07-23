# Build from Source

## Linux

Make sure you have [Node.js](https://nodejs.org/en/) and [pnpm](https://pnpm.io/). If you don't, use your Linux distro's package manager to get them.

### Install PNPM

You need to have the correct version of pnpm installed. You can check it in the file `frontend/package.json` under the `packageManager` key.

For example, if it says:

```json
{
  "packageManager": "pnpm@9.1.0"
}
```

It means you need to have pnpm version `9.1.0` installed. To check the current version of pnpm you have, run:

```sh
pnpm --version
```

If you are on an older version of pnpm, you can install it by:

```sh
pnpm install -g pnpm@9.1.0
# or if you don't have it installed you can
npm install -g pnpm@9.1.0
```

The first time you run pnpm, you need to run:

```sh
pnpm setup
```

Install Electron and any other dependencies by:

```sh
cd frontend
pnpm install --frozen-lockfile
```

Create a new [virtual environment](http://docs.python-guide.org/en/latest/dev/virtualenvs/) with Python 3.11 to install all the Python dependencies. If you don't have `mkvirtualenv`, check how to get it depending on your distribution. [Here](https://virtualenvwrapper.readthedocs.io/en/latest/install.html#basic-installation) is a guide for Ubuntu and [here](https://wiki.archlinux.org/index.php/Python/Virtual_environment) is one for ArchLinux:

```sh
mkvirtualenv rotki -p /usr/bin/python3.11
```

Then install all the Python requirements by doing:

```sh
pip install -r requirements.txt
```

If you want to also have the developer requirements in order to develop rotki, do:

```sh
pip install -r requirements_dev.txt
```

Since the Electron application is located in a different directory, you also need to do:

```sh
pip install -e .
```

If you modified the `@rotki/common` package, you might need to rebuild it. To do this, go to the `frontend` directory and run:

```sh
pnpm run --filter @rotki/common build
```

After that, you can start the application from the `frontend` directory by typing:

```sh
pnpm run dev
```

If you don't want to do the development inside Electron or you want to test any non-Electron features in your browsers, you can alternatively start:

```sh
pnpm run dev:web
```

This will start everything except Electron. After the Vue development server has started, you should be able to access the URL from your browser. Keep in mind that this works only for localhost access and a proxy might be needed to access it from a different machine.

### Packaging

To package the application for your platform, you need to run the packaging script. To do so, make sure that `packaging` and `requests` are installed in your virtual environment:

```sh
pip3 install packaging requests
./package.py --build full
```

### Nix

You can use the [Nix](https://nixos.org/download) package manager to start rotki development. Create `flake.nix` in the root of the project and copy the following into it:

```nix
{
  description = "Rotki project with virtualenv";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-23.11";
    nixpkgs-unstable.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        python311 = pkgs.python311;
        nodejsWithPython311 = pkgs.nodejs.override { python3 = python311; };
        nodePackages = pkgs.nodePackages.override { nodejs = nodejsWithPython311; };
        pnpmWithPython311 = nodePackages.pnpm;

        myPythonEnv = pkgs.mkShell {
          name = "my-python-env";
          buildInputs = [
            pkgs.gcc
            pkgs.stdenv.cc.cc.lib
            pkgs.bash
            pkgs.lzma
            pkgs.git
            pnpmWithPython311
            pkgs.python311
            pkgs.python311Packages.virtualenv
            pkgs.python311Packages.pip
          ];

          shellHook = ''
            ${pkgs.pkgs.python311Packages.virtualenv}/bin/virtualenv --no-setuptools --no-wheel .venv
            source .venv/bin/activate
            export RUFF_PATH=${pkgs.ruff}/bin/ruff
            export PYTHONPATH=.venv/${pkgs.python311.sitePackages}/:$PYTHONPATH
            export LD_LIBRARY_PATH=${pkgs.stdenv.cc.cc.lib}/lib:$LD_LIBRARY_PATH
            pip install setuptools
            pip install -r ${./requirements.txt}
            pip install -r ${./requirements_dev.txt}
            pip install -r ${./requirements_lint.txt}
          '';
        };
      in
      {
        devShell = myPythonEnv;
      }
    );
}
```

Then execute the following command to let Nix build the entire environment where you can start rotki development:

```sh
nix develop
```

From this point onward, start backend/frontend:

```sh
cd frontend
pnpm run dev:web
```

## macOS

The tl;dr version is:

- Use a virtual environment with Python 3.11.x.
- Confirm `pip` (pip3) is installed correctly and up to date.
- Manage Node.js with `nvm`. It has been tested with v20.

You will also need [VirtualEnv](https://virtualenv.pypa.io).

Install [Homebrew](https://brew.sh/) first if not installed yet.

To use Virtualenvwrapper, use the following:

```sh
pip3 install virtualenv
pip3 install virtualenvwrapper
```

Add the following to your shell startup file (e.g. .bashrc, .bash_profile, or .zshrc):

```sh
# Virtualenvwrapper settings:
export WORKON_HOME=$HOME/.virtualenvs
export PROJECT_HOME=$HOME/rotki_dev
export VIRTUALENVWRAPPER_PYTHON=/Library/Frameworks/Python.framework/Versions/3.11/bin/python3
export VIRTUALENVWRAPPER_VIRTUALENV=/Library/Frameworks/Python.framework/Versions/3.11/bin/virtualenv
source /Library/Frameworks/Python.framework/Versions/3.11/bin/virtualenvwrapper.sh
```

Reload the shell startup file:

```sh
source ~/.bash_profile
```

Activate the Python virtual environment:

```sh
workon rotki
```

Before using `pip3`, ensure you have the latest version:

```sh
pip3 install --upgrade pip
```

Install all the requirements:

```sh
pip3 install -r requirements.txt
```

If you want to also have the developer requirements in order to develop rotki, do:

```sh
pip3 install -r requirements_dev.txt
```

Since the Electron application is located in a different directory, you also need to do:

```sh
pip3 install -e .
```

rotki uses [Electron](https://electronjs.org). To install it, you need Node.js and npm. If you don't have it, use Homebrew to install it:

```sh
brew install node
```

### Install PNPM

Check [Install PNPM](#install-pnpm), the process should be similar.

Now, install all the Node.js dependencies of the frontend app:

```sh
cd frontend
pnpm install --frozen-lockfile
```

You can now start rotki from the `frontend` directory:

```sh
pnpm run dev
```

### Packaging

To package the application for your platform, you need to run the packaging script. To do so, make sure that `packaging` and `requests` are installed in your virtual environment:

```sh
pip3 install packaging requests
./package.py --build full
```

> **Note:** If you are using an Apple Silicon Mac to package rotki, you might encounter the following error during the SQLCipher verification step: `ImportError: dlopen(/.../lib/python3.9/site-packages/pysqlcipher3/_sqlite3.cpython-39-darwin.so, 0x0002): symbol not found in flat namespace (_ERR_error_string)`. This is a known problem that does not affect the final binary. You can use `SKIP_SQLCIPHER_VERIFICATION ./package.py` to build while skipping the verification step.

## Windows

This is a guide on how to set up a rotki development environment on Windows from source.

### Dependencies

#### Node & pnpm

Install [Node.js](https://nodejs.org/en/download/).

#### Install PNPM

Check [Install PNPM](#install-pnpm), the process should be similar.

#### Python

1. Get [Python 3.11](https://www.python.org/downloads/release/python-3117/) (3.11 is required due to some rotki dependencies). Make sure to download the 64-bit version of Python if your version of Windows is 64-bit!

> **Note:** If you're unsure of what Windows version you have, you can check in Control Panel -> System and Security -> System.

2. Ensure Python is in the Path variable. If not, go to Control Panel -> System -> Advanced system settings -> Advanced (tab) -> Environment Variables... In the Environment Variables... dialog under "System Variables," open the "Path" variable and ensure both the root Python directory and the `Scripts` subdirectory are included. If not, add them by clicking "New" and then "Browse" and locating the correct directories. By default, the Windows MSI installer places Python in the `C:\Users\<username>\AppData\Local\Programs\` directory.

3. Test Python installation by opening a command prompt and typing `python`. The Python CLI should run, showing the Python version you installed. Press `CTRL+Z`, then Enter to exit.

> **Note:** In newer versions of Windows, typing "python" may open the Windows Store. Fix this by opening "App execution aliases" (search for it via Windows Search) and toggling off the aliases for python.exe and python3.exe.

4. Ensure you have [pip](https://pip.pypa.io/en/stable/installing/#do-i-need-to-install-pip) installed. Check by typing `pip -V` into a command prompt.
5. Ensure you have the latest version of pip:
   ```sh
   pip install --upgrade pip
   ```
6. Using pip, install `virtualenv` and `virtualenvwrapper-win`. [See instructions here for installing them on Windows](http://timmyreilly.azurewebsites.net/python-pip-virtualenv-installation-on-windows/).
7. Install Microsoft Visual Studio build tools. Install the "Desktop development with C++" workload from Visual Studio. Visit [Microsoft's Website](https://visualstudio.microsoft.com/vs/) to install Visual Studio. Open Visual Studio Installer, click "Modify," select `Desktop development with C++`, and click "Modify" to download and install. Restart your PC if necessary.

Check the troubleshooting guide's relevant section [Microsoft Visual Studio Build Tools Required](#microsoft_visual_studio_build_tools_required).

#### Git

Get the [latest Git](https://gitforwindows.org/).

### Downloading Source and Installing Python Dependencies

This guide assumes you want to use Git to clone the project into a development directory; if you prefer to download the source from GitHub as a zip, you can do that instead.

1. Fork the relevant rotki branch into your own GitHub account.
2. Open a terminal (Command Prompt / PowerShell prompt) in your root development directory (the parent directory of where you will place your rotki development directory).
3. Clone your forked project into the local directory where you want to build rotki (e.g., if you forked the rotki/develop branch, you might clone into `c:\dev\rotki-develop`).

In your local rotki development directory, you should have all the files as they appear in the GitHub page for the rotki branch you chose to download/clone.

4. Set up your Python virtual environment (virtualenv):
   ```sh
   mkvirtualenv rotki-develop
   ```
5. Ensure you are in the directory where you downloaded/cloned the rotki source and bind the virtualenv to the directory:
   ```sh
   setprojectdir .
   ```

If you want to disassociate from the virtualenv, use the command `deactivate`. Whenever you open a new terminal, you can use `workon rotki-develop` to establish the link to the Python virtualenv you created and set your working directory.

6. Install all the Python requirements. In the open terminal with your virtualenv activated, execute:

   ```sh
   pip install -r requirements_dev.txt
   ```

   Ensure everything has been built & installed correctly:

   ```sh
   pip install -e .
   ```

7. Download [miniupnpc for Windows](https://github.com/mrx23dot/miniupnp/releases/download/miniupnpd_2_2_24/miniupnpc_64bit_py39-2.2.24.zip). After the download, extract the zip contents and copy the `miniupnpc.dll` to your virtual environment's `Lib > site-packages` directory. Locate this directory using the command:
   ```sh
   pip show cryptography
   ```

To ensure rotki works, try starting it:

```sh
python -m rotkehlchen
```

This should greet you with the message:

```
rotki REST API server is running at: 127.0.0.1:5042
```

### Installing Electron and Running rotki

1. Navigate to your rotki development directory and enter the following commands to install Electron and its dependencies:

   ```sh
   cd frontend
   pnpm install --frozen-lockfile
   ```

2. If you get any errors, you might need to build the `@rotki/common` library:

   ```sh
   pnpm run --filter @rotki/common build
   ```

3. Start rotki in development mode by executing:
   ```sh
   pnpm run dev
   ```

If everything goes well, a new Electron window will open with the rotki app running.

3. Alternatively, you can build the application. Navigate to your rotki development directory and execute the `package.py` file:
   ```sh
   pip3 install packaging requests
   python .\package.py --build full
   ```

## Troubleshooting

### anyapi-ms-win-crt-runtime missing

If you get `anyapi-ms-win-crt-runtime-l1-1-0.dll is missing` error when running Python, follow [this guide](https://www.ghacks.net/2017/06/06/the-program-cant-start-because-api-ms-win-crt-runtime-l1-1-0-dll-is-missing/) to resolve it.

### Microsoft Visual C++ 14.0 is required

If you get:

```sh
building 'gevent.libev.corecext' extension
error: Microsoft Visual C++ 14.0 is required. Get it with "Microsoft Visual C++ Build Tools": https://visualstudio.microsoft.com/downloads/
```

Then go [here](https://visualstudio.microsoft.com/downloads/) and get the Microsoft Visual Studio build tools and install them. The specific parts of the tools that need to be installed can be seen in [this Stack Overflow answer](https://stackoverflow.com/questions/29846087/microsoft-visual-c-14-0-is-required-unable-to-find-vcvarsall-bat/49986365#49986365).

You also need to add them to the path. The tools were probably installed here: `C:\Program Files (x86)\Microsoft Visual Studio\2017\BuildTools\Common7\Tools`
Environment variable should be: `VS140COMNTOOLS`

## Docker

To build Docker image from source using `Dockerfile`:

```sh
docker build -t rotki .
```
