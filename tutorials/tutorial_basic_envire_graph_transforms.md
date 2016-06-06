---
id: tutorial_basic_envire_graph_transforms
title: Managing Transformations
---
Transformations define the relation between frames.

## Adding Transformations
<pre><code data-snippetId="graph_transforms_add" data-file="https://raw.githubusercontent.com/envire/envire-tutorials/master/src/envire_graph_tutorials/transforms.cpp"></code></pre>
If a transformation is added, the inverse will be added automatically.
If one or both of the frames are not part of the graph, they will be added.

## Removing Transformations
<pre><code data-snippetId="graph_transforms_remove" data-file="https://raw.githubusercontent.com/envire/envire-tutorials/master/src/envire_graph_tutorials/transforms.cpp"></code></pre>
The inverse will be removed as well.

## Modifying Transformations
Transformations can be replaced using ``updateTransform``.
The inverse will be updated automatically.
<pre><code data-snippetId="graph_transforms_update" data-file="https://raw.githubusercontent.com/envire/envire-tutorials/master/src/envire_graph_tutorials/transforms.cpp"></code></pre>


## Calculating Transformations
``getTransform()`` can be used to calculate the transformation between two
frames if a path connecting the two exists in the graph. Breadth first search is
used to find the path connecting the two frames. I.e. ``getTransform()``
<pre><code data-snippetId="graph_transforms_get" data-file="https://raw.githubusercontent.com/envire/envire-tutorials/master/src/envire_graph_tutorials/transforms.cpp"></code></pre>

Calculating the transformation between two frames might be expensive depending
on the complexity of the graph structure. A ``TreeView`` can be used to speed
up the calculation:
<pre><code data-snippetId="graph_transforms_tree_get" data-file="https://raw.githubusercontent.com/envire/envire-tutorials/master/src/envire_graph_tutorials/transforms.cpp"></code></pre>

Since creating the ``TreeView`` walks the whole graph once, using this methods
only makes sense when multiple transformations need to be calculated.

If you need to calculate the same transformation multiple times, you can
use ``getPath()`` to retrieve  a list of all frames that need to be traversed
to calculate the transformation. The path can be used to speed up the calculation
of the transform even further.

**TODO NOT IMPLEMENTED**

```cpp
EnvireGraph g;
const FrameId a = "frame_a";
const FrameId b = "frame_b";
/* ... */
const vector<FrameId> path = graph.getPath(A, D);
const Transform tf = graph.getTransform(a, b, path);
```

## Disconnecting a Frame from the Graph
``disconnectFrame()`` can be used to remove all transformations coming from
or leading to a certain frame.
