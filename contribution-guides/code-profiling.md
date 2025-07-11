# Code Profiling

## Python

### Flamegraph Profiling for Tests

To use the flamegraph profiler, follow these steps:

1. Install the latest dependencies required for profiling:

   ```sh
   uv sync --group profiling
   ```

2. Install the [flamegraph](https://github.com/brendangregg/FlameGraph) package in your system. Some OSes, such as Archlinux, have [ready-made packages](https://aur.archlinux.org/packages/flamegraph/).

To profile a test run, add `--profiler=flamegraph-trace` to the pytest arguments. Once the test concludes, this will add a data file under `/tmp` with the data generated by the run. For example: `/tmp/20211127_1641_stack.data`.

Then, you can run the flamegraph tool on that data to generate an SVG:

```sh
flamegraph.pl --title "rotki-test graph" /tmp/20211127_1641_stack.data > profile.svg
```

Finally, open the SVG with any compatible viewer and explore the flamegraph. It will look like this:

![A flamegraph profiling example](/images/flamegraph_example.svg)

### Viztracer

Viztracer is a good tool for profiling the actual code as it runs. It's included in the profiling dependency group.

Then, run rotki's dev mode and add profiling arguments for Viztracer:

```sh
pnpm run dev --profiling-args "-m viztracer --min_duration 0.2ms"
```

This will produce a `result.json` file in the main directory. The `--min_duration` argument is needed to avoid capturing data every nanosecond, which could result in a very large JSON file. You may need to adjust the arguments based on your needs.

To open and study the file, you can use `vizviewer`. For example:

```sh
vizviewer --flamegraph result.json
```

to get a flamegraph, or simply:

```sh
vizviewer result.json
```

to get the normal view.

For more information, check the Viztracer documentation.

### py-spy

py-spy is a tool that generates a flamegraph of a running Python process and can attach to it. You can get it from [here](https://github.com/benfred/py-spy).

You can run the developer version or a normal binary and find its PID with a command like:

```sh
ps aux | grep rotki
```

Then, you can attach to it with a command like:

```sh
sudo py-spy record -o py-spy.profile.svg --pid 60243
```

assuming the PID is `60243`.

You can also run rotki's dev mode directly by specifying the profile command and its arguments like this:

```sh
pnpm run dev --profiling-cmd py-spy --profiling-args "record -o py-spy-profile.svg --"
```

Once done, there will be an SVG output at `py-spy.profile.svg`, which you can view with any SVG viewer, including a browser, and study the flamegraph.
