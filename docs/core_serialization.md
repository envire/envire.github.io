---
id: core_serialization
title: Serialization
subtitle:
---

## Abstract

EnviRe supports serialization and de-serialization based on the [boost serialization](http://www.boost.org/libs/serialization/doc/) library.

## Overview

EnviRe relays on boost serialization to be able to save and load it's internal state.
It also supports serialization of polymorphic types through the base types.

Items can be serialized using the following methods:

```cpp
    envire::core::ItemBase::Ptr plugin;
    // instantiate item base pointer
    if (envire::core::Serialization::save(stream, plugin))
    {
        // plugin was successfully serialized
    }
```

```cpp
    envire::core::ItemBase::Ptr plugin;
    if (envire::core::Serialization::load(stream, plugin))
    {
        // plugin was successfully de-serialized
    }
```

Also the complete graph with all it's items can be serialized.

```cpp
    envire::core::EnvireGraph graph;
    // fill envire graph
    boost::archive::polymorphic_binary_oarchive oa(stream);
    oa << graph;
```

```cpp
    envire::core::EnvireGraph graph;
    boost::archive::polymorphic_binary_iarchive ia(stream);
    ia >> graph;
```

### Providing a serializable EnviRe item

In order to create a new EnviRe item and support it's serialization the item and it's embedded type must be serializable.
There are two macros which shall be used in order to define a new item class for EnviRe:

- ``ENVIRE_PLUGIN_HEADER ( namespace::classname )``

  Has to be placed in the class declaration in the header of the new type. It is not necessary
  but recommended to add the name space in order to have a more unique lookup name.
  It adds the boost serialization function to the class definition.

- ``ENVIRE_REGISTER_PLUGIN ( namespace::classname )``

  Has to be placed in the source file of the class.
  It registers the class to the serialization by exporting the class to boost using ``BOOST_CLASS_EXPORT`` and creates a helper class which is statically instantiated as soon as the library is loaded. This allows to serialize base classes correctly even if the concrete class is not included (unknown to the implementation at runtime). However the shared library needs to be linked or loaded of course.

This two macros add serialization support for an item class. However the embedded type must be serializable by boost serialization as well. This can be done by defining a intrusive or non-intrusive function. More information
can be found in the [boost serialization](http://www.boost.org/libs/serialization/doc/) documentation.




