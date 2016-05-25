---
id: tutorial_basic_envire_graph_3d_visualization
title: Using the Envire Visualizer
subtitle:
---
The Envire Visualizer is a stand alone Qt-Window, that can be used
to visualize any graph.

To use the visualizer you need to link against *libenvire_visualizer*.

### In the Main Thread
<pre><code data-snippetId="graph_viz_example_includes" data-file="https://raw.githubusercontent.com/envire/envire-tutorials/master/src/envire_visualizer_example/VisualizerExample.cpp"></code></pre>

<pre><code data-snippetId="graph_viz_example_code" data-file="https://raw.githubusercontent.com/envire/envire-tutorials/master/src/envire_visualizer_example/VisualizerExample.cpp"></code></pre>

If you already have a *QApplication* you obviously do not need to create another one.

### In a separate Thread
It is also possible to use the visualizer in a separate thread, e.g. if you do not want to block the main thread. This is done using the *QThreadedWidget* from *vizkit3d*, i.e. you need to link against *vizkit3d* for this to work.

<pre><code data-snippetId="graph_viz_example_includes_thread" data-file="https://raw.githubusercontent.com/envire/envire-tutorials/master/src/envire_visualizer_example/VisualizerExampleThreaded.cpp"></code></pre>

<pre><code data-snippetId="graph_viz_example_thread_code" data-file="https://raw.githubusercontent.com/envire/envire-tutorials/master/src/envire_visualizer_example/VisualizerExampleThreaded.cpp"></code></pre>
