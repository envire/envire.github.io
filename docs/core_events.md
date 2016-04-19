---
id: core_events
title: Events
subtitle:
---

## Graph Events

The event-system is used by the ``Graph`` to inform the user about changes to the
graph structure.
![graphuml](https://raw.githubusercontent.com/envire/envire.github.io/master/images/docs/graph/envire_core_events.png)


### GraphEventPublisher
The ``GraphEventPublisher`` manages the subscribers and provides methods to
notify subscribers about events. Every class that wants to publish events
needs to extend ``GraphEventPublisher``

### GraphEventSubscriber
In order to receive events a class needs to extend ``GraphEventSubscriber``
and override the ``notifyGraphEvent()`` method.
Three convenience classes already exist, that do this and simplify
the usage of the event-system. Thus there is usually no need to derive from
``GraphEventSubscriber`` directly:

* The ``GraphEventDispatcher`` handles all events and provides virtual methods
  for each event. Thus a subscriber can simply extend the dispatcher and
  override the methods that it cares about.

* The ``GraphEventQueue`` buffers all events in a queue. If ``flush()`` is called,
  all events are processed at once. The user needs to override the ``process()``
  method to process the events. The queue detects contradicting events and
  removes them from the queue. E.g. if a frame is added and removed before
  ``flush()`` is called, neither the added- nor the removed-event is processed.

* The ``GraphItemEventDispatcher<T>`` is a special dispatcher that is used to
  receive typed item events. To receive only item events for a certain item
  type, the user should derive from ``GraphItemEventDispatcher<T>`` where
  ``T`` is the item type that he cares about.

## Tree Events
The ``TreeView`` does not use the above event system. Instead it provides
simple events using boost signals.
