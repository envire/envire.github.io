---
id: graph_example_add_frame
title: Adding Frames and Items
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


## Adding Items
There are two ways of adding items to existing frames.

```cpp
const FrameId frame = "frame_id_42";
const std::string text("I am so smart, S M A T");
EnvireGraph g;
g.addFrame(frame);
```
The common way is to create an item and just add it using ``addItemToFrame()``:

```cpp
Item<std::string>::Ptr item(new Item<std::string>(text));
g.addItemToFrame(frame, item);
```
The item will remember the frame that it was added to. I.e. an item cannot be part of two frames at the same time.

It is also possible to set the frame id beforehand and add the item using
``addItem()``.

```cpp
ItemBase::Ptr item(new Item<string>(text));
item->setFrame(aFrame);
g.addItem(item);
```
The item type can be a pointer to any subclass of ``ItemBase``.
