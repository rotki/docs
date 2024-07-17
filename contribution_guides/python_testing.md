# Python Code Testing

To run the Python test suite, ensure the virtual environment is activated, the developer requirements are installed, and then execute:

```sh
python pytestgeventwrapper.py -xs rotkehlchen/tests
```

We require this wrapper as a drop-in replacement for pytest due to quirks with gevent and monkeypatching.

For more specific usage and invocation of the tests, please refer to the [pytest documentation](https://docs.pytest.org/en/stable/usage.html).

We run the test suite in GitHub CI but only a subset of the tests since not all are needed and sometimes they suffer from rate limiting. We have special settings to choose which tests are executed:

- `[skip py tests]` will not run the Python backend tests regardless of whether the backend code has been touched.
- `[run nft py tests]` will run the base set of tests and the tests related to NFTs.
- `[run all py tests]` will run the base set of tests, the tests related to NFTs, and some others that perform a large number of requests and are slower.

## Linting

Before each commit, you should run the linting checks. They run `flake8`, `mypy`, and `pylint` in order. Invoke these checks by running `make lint` from the root directory of the project.

## Mocking Networking in the Tests

One of the biggest issues we have at rotki is that backend testing is really slow, primarily due to network calls. As rotki is a portfolio tracking and analytics tool, almost all of our tests involve network calls.

We are in the process of trying to rectify this. For repetitive network calls that can be recorded, we started using vcr.py as stated in [this issue](https://github.com/rotki/rotki/issues/5373). The problem with vcr.py is that it is limited by the size of the cache in the CI. Therefore, it might still make sense to manually mock certain network calls.

There is a useful way to run tests by disallowing network calls, which helps detect if a test makes any non-mocked network calls. We use the [pytest-socket](https://pypi.org/project/pytest-socket/) module to achieve this.

You can add `--disable-socket` to any pytest call, and it will fail immediately for any network calls. You will probably also need to add `--allow-hosts=127.0.0.1` if the tests make local network calls to the rotki API. This way, you can discover all network calls and mock them.

Mocking should be done in one of the following ways:

1. Using common fixtures for data mocking as shown [here](https://github.com/rotki/rotki/pull/5269). Read the PR description to get an idea.
2. Using test-specific mocking.
3. For repeatable calls that would always return the same response from the network, use the vcr.py approach.

## Using VCR

From version 1.27.0, we have introduced VCR to mock network queries in most tests to improve the speed of the test suite. VCR works by generating a `yaml` file that records information about all the requests made. Then, for every request that occurs in the test, VCR tries to match it to one of the recorded ones. We already have some pre-recorded cassettes (the name used by VCR for those yaml files), which are available on [GitHub](https://github.com/rotki/test-caching). During a fresh run, this repository will be cloned, and the cassettes will be replayed. This occurs in the path set by the `vcr_cassette_dir` fixture, which also sets the directory where the cassettes are located. By default, this is the `test-caching` directory under [rotki's data directory](/usage_guides/data_directory.html#rotki-data-directory).

Locally, cassettes are only read and never written to prevent unexpected behavior during testing. To record a new test, we provide a make rule called `create-cassette`.

### In the Tests

First, we need to mark the test as a VCR test with the pytest directive:

```python
@pytest.mark.vcr
```

For tests that make requests with parameters depending on time, block number, or anything else that can vary between runs, it is also necessary to mock them during the test execution. For mocking time, we use freezegun:

```python
@pytest.mark.freeze_time('2023-01-24 22:45:45 GMT')
```

You can change the time here to match the one at which you are writing the test.

### Recording a Test

To execute the test and record it:

```sh
RECORD_CASSETTES=true python pytestgeventwrapper.py -m vcr TEST_PATH
```

Here, we set `RECORD_CASSETTES` to change the configuration of VCR to allow writing to files, and with `-m vcr`, we only run a test if it has the VCR mark.

This rule can be executed with:

```sh
make create-cassette TEST_PATH
```

### Handling Errors

When executing tests mocked with VCR after making changes to the code, you might encounter the following error:

```sh
vcr.errors.CannotOverwriteExistingCassetteException: Can't overwrite existing cassette
```

This error indicates that a new request not recorded in the cassette occurred and needs to be added. To resolve this, use the `RECORD_CASSETTES` approach to update the yaml file if it was intentional. If no new requests are supposed to be made, investigate and figure out what is happening.

### Syncing with the Cassettes Repository

When working on a new branch, you might need to either create a new cassette or update an existing one. Suppose you are working on branch `new_cool_feature` based on `bugfixes`. In that case, you will need to go to the cassettes repository [rotki/test-caching](https://github.com/rotki/test-caching) and create a branch with the same name, `new_cool_feature`, based on that repository's `bugfixes` branch. If you don't have permission to create a new branch in `rotki/test-caching`, fork the repository, create the branch in your fork with the same name as your branch from the main repository, and create a PR from this branch to rotki/test-caching's target branch (bugfixes/develop).

Locally, you can work with your rotki branch, and rotki will ensure to pull the proper cassette branch during testing. The logic for this is [here](https://github.com/rotki/rotki/blob/20534a679a0f1bc7951fa21496aaa5eab976ae1b/rotkehlchen/tests/conftest.py#L225). This works fine in the CI and should always pull the proper branch. However, it may happen that it falls back to a branch like `develop` instead of `bugfixes` when running locally. To solve this, utilize the `DEFAULT_VCR_BRANCH` environment variable to run a test locally like this:

```sh
DEFAULT_VCR_BRANCH=bugfixes python pytestgeventwrapper.py -xs --pdb rotkehlchen/tests/unit/test_evm_tx_decoding.py::test_genesis_remove_address
```

When you record a new cassette or update an existing one, all changes will be saved in the local test-caching repository. Make sure to commit this and push it to the upstream branch so that your PR in rotki's CI also works.

If you encounter issues when re-recording a cassette, you can simply delete and re-record it from scratch.

After your `new_cool_feature` PR is merged into rotki (e.g., bugfixes in our example), the CI will merge the test-caching branch with the same name or the PR that was created previously.

## Alternative Linting and Static Analysis Tools

There are some alternative linting tools that we don't run in the CI since they generate many false positives. It's good to run them occasionally, so they are listed here.

- **vulture**: Source and documentation [here](https://github.com/jendrikseipp/vulture). Install it via `pip install vulture`. Running it from the root directory will provide a list of possibly unused code that you can remove. Be prepared for many false positives.
- **bandit**: Source and documentation [here](https://github.com/PyCQA/bandit). Install it via `pip install bandit`. Running it will highlight potential issues in the code, but expect many false positives.
