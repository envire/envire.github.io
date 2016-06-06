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
<pre><code data-snippetId="graph_trees_get_1" data-file="https://raw.githubusercontent.com/envire/envire-tutorials/master/src/envire_graph_tutorials/trees.cpp"></code></pre>

Note that the view will most likely be copied on return. If the tree is large
you might want to avoid that copy and pass an empty view as out-parameter instead:
<pre><code data-snippetId="graph_trees_get_2" data-file="https://raw.githubusercontent.com/envire/envire-tutorials/master/src/envire_graph_tutorials/trees.cpp"></code></pre>

By default, a tree view shows a snapshot of the graph. I.e. if the graph changes,
the changes will not be visible in the view. The view or parts of it might
become invalid when vertices or edges are removed from the graph.
To avoid this, you can request a self-updating tree view:
<pre><code data-snippetId="graph_trees_get_3" data-file="https://raw.githubusercontent.com/envire/envire-tutorials/master/src/envire_graph_tutorials/trees.cpp"></code></pre>
