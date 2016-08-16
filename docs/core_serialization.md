---
id: core_serialization
title: Serialization
subtitle:
---

## Abstract

EnviRe supports serialization and de-serialization based on the [boost serialization](http://www.boost.org/libs/serialization/doc/) library.

## Overview

EnviRe relays on boost serialization to be able to save and load it's internal state.
By making use of the plugin architecture, it is possible to serialize and de-serialize
``Item``'s when knowing only their base class ``ItemBase``.
However in this case the following methods need to be used:

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
    boost::archive::binary_oarchive oa(stream);
    oa << graph;
```

```cpp
    envire::core::EnvireGraph graph;
    boost::archive::binary_iarchive ia(stream);
    ia >> graph;
```

### Providing a serializable EnviRe item

In order to create a new EnviRe item and support it's serialization the item and it's embedded type must be serializable.

To register a new Item of type ``envire::core::Item<namespace::UserType>`` for it's use with EnviRe, the macro
``ENVIRE_REGISTER_ITEM ( namespace::UserType )`` has to be placed in a source file (*.cpp).
It registers the class to the serialization by exporting the class to boost using ``BOOST_CLASS_EXPORT`` and creates a helper class which is statically instantiated as soon as the library is loaded. This allows to serialize base classes correctly even if the concrete class is not included (unknown to the implementation at runtime). However the shared library needs to be linked or dynamically loaded of course.
The serialization will try to load the necessary plugin libraries on it's own, i.e. they have to be available on your system.
The macro will also export the class as class_loader plugin (See the [plugins]({{site.baseurl}}/docs/core_plugins.html) section for further details).

The embedded type must be serializable by boost serialization as well. This can be done by defining a intrusive or non-intrusive function. More information can be found in the [boost serialization](http://www.boost.org/libs/serialization/doc/) documentation.

#### Example

DummyType.hpp:

```cpp
// Include the actual type definition (can also be in the same header)
#include <example/DummyType.hpp>

// write non-intrusive boost serialization for DummyType (if the type is already serializable by boost the header file might not be necessary)
namespace boost { namespace serialization {

    template<class Archive>
    void serialize(Archive & ar, ::example::DummyType & dummy_type, const unsigned int version)
    {
        ar & dummy_type.member1;
        ar & dummy_type.member2;
    }

}}
```

DummyType.cpp:

```cpp
#include "DummyType.hpp"
#include <envire_core/plugin/Plugin.hpp>

// Register the new Item
ENVIRE_REGISTER_ITEM( example::DummyType )
```

How to create and install the plugin meta-informations on your system is described in the [plugins]({{site.baseurl}}/docs/core_plugins.html) section.

## Framework connection

In the [ROCK](http://www.rock-robotics.org) framework types are exported using the [typelib](http://rock-robotics.org/master/api/typelib/) library.
Typelib is able to automatically parse types, but has some limitations: e.g. pointer, virtual functions, private members, std library container (besides of std::vector and std::string). For those more complex classes it is possible to define so called opaque types and write methods to convert the data structure from the origin type to the opaque type and vise versa. The opaque type must be typelib compatible and does hold the same data that the origin type does.

Since EnviRe items (``envire::core::Item<T>``) are not typelib compatible due to it's use of virtual functions, only the inner data container is exported to typelib.
The inner data holding container of every ``Item`` is a ``envire::core::SpatioTemporal<T>`` class. Since it is also templated with the user data type the concrete type has to
be exported to typelib. This can be achieved using the following commands in an .orogen file:

```ruby
# exports the type envire::core::SpatioTemporal<example::DummyType> to typelib
typekit do
    envire_someclass = spatio_temporal '/example/DummyType'
    export_types envire_someclass
end
```

Note that at this point the embedded type ``example::DummyType`` must already be known to typelib.
It can either be typelib compatible (the header of the type can be parsed), the user can write it's own opaque type or the boost serialization based opaque auto-generation can be used.

If the embedded type isn't directly typelib compatible the easiest way of exporting it is to make use of the fact that it is serializable by boost.
To auto-generate opaque (transport) types for classes supporting boost serialization the following commands in an .orogen file can be used:

```ruby
# define opaque
typekit do
    opaque_autogen '/example/DummyType',
                    :includes => 'example/DummyType.hpp',
                    :type => :boost_serialization
end
# type export
typekit do
    export_types '/example/DummyType'
end
```

This makes the type ``example::DummyType`` known to typelib.