---
id: graph_example_transforms
title: Working with Transformations
subtitle:
---

## Adding Transformations
A transformation between two frames is added by calling ``addTransform()``.
This will also add the inverse transform. I.e. if you add *a->b* the graph
will automatically calculate *b->a* and add it as well.

```cpp
EnvireGraph g;
FrameId a("a");
FrameId b("b");
Transform tf;

g.addTransform(a, b, tf);
```

## Modifying Transformations
Transformations cannot be added twice. If you want to modify a transformation
call ``updateTransform()``:

```cpp
Transform tf2;
g.updateTransform(a, b, tf2);
```
This will also update the value of the inverse transformation.


## Retrieving Transformations
Transformations can be retrieved using ``getTransform()``:

```cpp
Transform tf3 = g.getTransform(a, b);
```
If there is no edge between *a* and *b*, ``getTransform()`` will search
for the shortest path from *a* to *b* and calculate the transformation
by concatenating all transformations on the path. Depending on the size of
the graph, this can be rather costly.

If you need to calculate lots of transformations, it might be faster to
create a ``TreeView`` beforehand. The view can be provided to ``getTransform()`` as optional parameter and is used to speed up the
search.

```cpp
TreeView view = g.getTree(a);
Transform tf4 = graph.getTransform(a, b, view);
```

## Removing Transformations
Transformations can be removed using ``removeTransform()``:

```cpp
g.removeTransform(a, b);
```
This will remove both *a->b* and *b->a* from the graph. This only removes
the transformation. The frames will remain in the graph even if they become unreachable. This will also remove the transform and all its children from all dynamic ``TreeViews``. Static ``TreeViews`` might become invalid.
