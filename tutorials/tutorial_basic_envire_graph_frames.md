---
id: tutorial_basic_envire_graph_frames
title: Manipulating Frames
subtitle:
---

## Adding Frames
Frames can be added either explicitly by calling ``addFrame()``

```cpp
EnvireGraph g;
const FrameId frame = "frame_a";
g.addFrame(frame);
```

or implicitly by using a unknown frame id in ``addTransform()``.

```cpp
EnvireGraph g;
const FrameId frameA = "frame_a";
const FrameId frameB = "frame_b";
Transform tf;
g.addTransform(frameA, frameB, tf);
```

Frames cannot be added twice. If a frame with the given name already exists,
an exception will be thrown.

## Removing Frames
Frames can be removed by calling ``removeFrame()``:

```cpp
EnvireGraph g;
const FrameId frame = "frame_a";
g.addFrame(frame);
g.disconnectFrame(frame);
g.removeFrame(frame);
```
Frames can only be removed, if they are not connected to the graph. I.e. if no
edges are connected to the frame. An exception will be thrown, if the frame is
still connected. This is an artificial restriction, technically it would be
possible to remove frames while they are still connected. The intention of this
restriction is, to make the user aware of the consequences that removing a frame
might have for the graph structure as a whole.


## Adding Items
There are two ways of adding items to existing frames.

```cpp
const FrameId frame = "I am so smart, S M A T";
EnvireGraph g;
g.addFrame(frame);

class_loader::ClassLoader loader
```
The common way is to load an item and just add it using ``addItemToFrame()``:

```cpp
ItemBase::Ptr item = loader.createInstance<ItemBase>("SomeItem");
g.addItemToFrame(frame, item);
```
The item will remember the frame that it was added to. I.e. an item cannot be part of two frames at the same time.

It is also possible to set the frame id beforehand and add the item using
``addItem()``.

```cpp
item->setFrame(aFrame);
g.addItem(item);
```
The item type can be a pointer to any subclass of ``ItemBase``.

## Accessing Items
When working with items, the user needs to know the item type. The type can
either be provided at compile time using template parameters or at runtime using
``std::type_index``.

### Checking Whether a Frame Contains Items of a Specific Type
``containsItems()`` is used to check for the existence of items of a given type
in a given frame.

```cpp
EnvireGraph g;
const FrameId frame = "frame";
/* ... */
const bool contains = g.containsItems<Item<string>>(frame);
```
If the type is not known at compile time, there is also an overload that
accepts ``std::type_index``:
```cpp
const std::type_index index(typeid(Item<string>));
const bool contains = g.containsItems(frame, index);
```

### Accessing Items with Iterators

The ``ItemIterator`` can be used to iterate over all items of a specific type
in a frame. The iterator internally takes care of the necessary type casting
and type checks.

```cpp
EnvireGraph g;
const FrameId frame = "frame";
/* ... */
using Iterator = EnvireGraph::ItemIterator<Item<string>>;
Iterator begin, end;
std::tie(begin, end) = g.getItems<Item<string>>(frame);
for(; begin != end; ++begin)
{
  /* ... */
}
```

A convenience method exist to get an ``ItemIterator`` of the i'th item:

```cpp
EnvireGraph g;
const FrameId frame = "frame";
/* ... */
using Iterator = EnvireGraph::ItemIterator<Item<string>>;
Iterator it = g.getItem(frame, 42);
```

## Accessing Items without Iterators
If type information are not available at compile time, ``getItems()`` can also
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
