---
id: tutorial_basic_envire_graph_frames
title: Manipulating Frames
subtitle:
---

## Adding Frames
Frames can be added either explicitly by calling ``addFrame()``

<pre><code data-snippetId="graph_frames_add_frame" data-file="https://raw.githubusercontent.com/envire/envire-tutorials/master/src/envire_graph_tutorials/frames.cpp"></code></pre>


or implicitly by using a unknown frame id in ``addTransform()``.

<pre><code data-snippetId="graph_frames_add_transform_frame" data-file="https://raw.githubusercontent.com/envire/envire-tutorials/master/src/envire_graph_tutorials/frames.cpp"></code></pre>

Frames cannot be added twice. If a frame with the given name already exists,
an exception will be thrown.

The above examples will create the frame property using the default constructor.
Another constructor can be used by calling ``emplaceFrame()``. Calling
``emplaceFrame()`` does only make sense, if the frame property has non-default
constructors.

## Removing Frames
Frames can be removed by calling ``removeFrame()``:

<pre><code data-snippetId="graph_frames_remove_frame" data-file="https://raw.githubusercontent.com/envire/envire-tutorials/master/src/envire_graph_tutorials/frames.cpp"></code></pre>

``disconnectFrame()`` removes all transforms that are connected to the given frame.
Frames can only be removed, if they are not connected to the graph. I.e. if no
edges are connected to the frame. An exception will be thrown, if the frame is
still connected. This is an artificial restriction, technically it would be
possible to remove frames while they are still connected. The intention of this
restriction is, to make the user aware of the consequences that removing a frame
might have for the graph structure as a whole.

## Creating Items
Before an item can be added to a frame, it has to be loaded using the ``ClassLoader``.

<pre><code data-snippetId="graph_items_classloader_includes" data-file="https://raw.githubusercontent.com/envire/envire-tutorials/master/src/envire_graph_tutorials/items.cpp"></code></pre>
<pre><code data-snippetId="graph_items_load_octree" data-file="https://raw.githubusercontent.com/envire/envire-tutorials/master/src/envire_graph_tutorials/items.cpp"></code></pre>

It is also possible to instantiate items directly, however this is only
recommended for testing because visualization and serialization only work if
the ``ClassLoader`` was used to load the item.

## Adding Item
Once the item is loaded, there are two ways to add it to the graph.
The common way is to add it using ``addItemToFrame()``:
<pre><code data-snippetId="graph_items_add_to_frame" data-file="https://raw.githubusercontent.com/envire/envire-tutorials/master/src/envire_graph_tutorials/items.cpp"></code></pre>
The item will remember the frame that it was added to. I.e. an item cannot be part of two frames at the same time.

It is also possible to set the frame id beforehand and add the item using
``addItem()``.
<pre><code data-snippetId="graph_items_setFrame" data-file="https://raw.githubusercontent.com/envire/envire-tutorials/master/src/envire_graph_tutorials/items.cpp"></code></pre>


The item type can be a pointer to any subclass of ``ItemBase``.

## Accessing Items
When working with items, the user needs to know the item type. The type can
either be provided at compile time using template parameters or at runtime using
``std::type_index``.

### Checking Whether a Frame Contains Items of a Specific Type
``containsItems()`` is used to check for the existence of items of a given type
in a given frame.
<pre><code data-snippetId="graph_items_contains_item" data-file="https://raw.githubusercontent.com/envire/envire-tutorials/master/src/envire_graph_tutorials/items.cpp"></code></pre>


If the type is not known at compile time, there is also an overload that
accepts ``std::type_index``:
<pre><code data-snippetId="graph_items_contains_type_index" data-file="https://raw.githubusercontent.com/envire/envire-tutorials/master/src/envire_graph_tutorials/items.cpp"></code></pre>


### Accessing Items with Iterators

The ``ItemIterator`` can be used to iterate over all items of a specific type
in a frame. The iterator internally takes care of the necessary type casting
and type checks.
<pre><code data-snippetId="graph_items_iteration" data-file="https://raw.githubusercontent.com/envire/envire-tutorials/master/src/envire_graph_tutorials/items.cpp"></code></pre>


A convenience method exist to get an ``ItemIterator`` of the i'th item:
<pre><code data-snippetId="graph_items_index_iterator" data-file="https://raw.githubusercontent.com/envire/envire-tutorials/master/src/envire_graph_tutorials/items.cpp"></code></pre>



## Accessing Items without Iterators
If type information is not available at compile time, ``getItems()`` can also
be used with ``std::type_index``:

```cpp
EnvireGraph g;
const FrameId frame = "frame";
/* ... */
const std::type_index index(typeid(Item<string>));
const Frame::ItemList& items = graph.getItems(frame, index);
```
The returned reference points directly to graph internal memory.

## Removing Items

Items can be removed by calling ``removeItemFromFrame()``. Removing items invalidates
all iterators of the same type. To be able to iteratively remove items, the
method returns a new pair of iterators.

```cpp
EnvireGraph g;
const FrameId frame = "frame";
/* ... */
using Iterator = EnvireGraph::ItemIterator<Item<string>>;
Iterator begin, end;
std::tie(begin, end) = g.getItems<Item<string>>(frame);

for(; begin != end;)
{
    std::tie(begin, end) = g.removeItemFromFrame(frame, begin);
}
```

All items can be removed at once using ``clearFrame()``.

```cpp
EnvireGraph g;
const FrameId frame = "frame";
/* ... */
g.clearFrame(frame);
```
