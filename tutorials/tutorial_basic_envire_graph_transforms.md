---
id: tutorial_basic_envire_graph_transforms
title: Managing Transformations
---
Transformations define the relation between frames.

## Adding Transformations
```cpp
EnvireGraph g;
const FrameId a = "frame_a";
const FrameId b = "frame_b";
Transform ab;
/** initialize Transform */
g.addTransform(a, b, ab);
```
If a transformation is added, the inverse will be added automatically.
If one or both of the frames are not part of the graph, they will be added.

## Removing Transformations
```cpp
EnvireGraph g;
const FrameId a = "frame_a";
const FrameId b = "frame_b";

g.removeTransform(a, b);
```
The inverse will be removed as well.

## Modifying Transformations
Transformations can be replaced using ``updateTransform``.
The inverse will be updated automatically.

```cpp
EnvireGraph g;
const FrameId a = "frame_a";
const FrameId b = "frame_b";
Transform tf;
/*Initialize transform */
g.updateTransform(a, b, tf);
```

## Calculating Transformations
``getTransform()`` can be used to calculate the transformation between two
frames if a path connecting the two exists in the graph. Breadth first search is
used to find the path connecting the two frames. I.e. ``getTransform()``

```cpp
EnvireGraph g;
const FrameId a = "frame_a";
const FrameId b = "frame_b";
/* ... */
const Transform tf = graph.getTransform(a, b);
```

Calculating the transformation between two frames might be expensive depending
on the complexity of the graph structure. A ``TreeView`` can be used to speed
up the calculation:

```cpp
EnvireGraph g;
const FrameId a = "frame_a";
const FrameId b = "frame_b";
/* ... */
TreeView view = graph.g(graph.getVertex(a));
const Transform tf = graph.getTransform(a, b, view);
```
Since creating the ``TreeView`` walks the whole graph once, using this methods
only makes sense when multiple transformations need to be calculated.

If you need to calculate the same transformation multiple times, you can
use ``getPath()`` to retrieve a a list of all frames that need to be traversed
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
