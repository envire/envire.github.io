---
id: tutorial_basic_envire_treeview
title: Tree Views
---

``TreeViews`` provide a tree view of the graph structure. I.e. when viewed
through a ``TreeView`` the graph turns into a tree with a specific root node.

TreeViews use vertex_descriptors instead of FrameIds to reference frames because
vertex_descriptors can be hashed in constant time (they are just pointers).

## Creating Tree Views
TreeViews can be created by calling ``getTree()`` and providing a root node.

```cpp
EnvireGraph g;
const FrameId a = "frame_a";
/* ... */
TreeView view = g.getTree(graph.vertex(a));
```
Note that the view will most likely be copied on return. If the tree is large
you might want to avoid that copy and pass an empty view as out-parameter instead:

```cpp
EnvireGraph g;
const FrameId a = "frame_a";
/* ... */
TreeView view;
g.getTree(a, &view);
```
