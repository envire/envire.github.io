---
id: core_plugins
title: EnviRe Plugins
subtitle:
---

## Abstract

EnviRe is designed on a modular plug-in mechanism in order to facilitate maintainability and
integrability of 3rd party libraries as PCL and OctoMap.

## Overview

EnviRe provides tooling to easily define and load plug-in classes. As plugin-in back-end EnviRe
relies on the [class_loader](http://wiki.ros.org/class_loader) library. To gather and provide meta
informations about all available plug-ins the plugin_manager library is used.

For more details read the design section of this page.

### Providing a user-data plug-in

In order to handle user data types in EnviRe they have to be embedded into a ``envire::core::Item<T>`` class.
The ``Item`` class augments the embedded type by a time-stamp, a reference frame and an unique ID.

To register a new plug-in of the type ``envire::core::Item<namespace::UserType>`` for it's use with EnviRe, the macro
``ENVIRE_REGISTER_ITEM ( namespace::UserType )`` has to be placed in a source file (*.cpp).
It adds the class loader registration macro ``CLASS_LOADER_REGISTER_CLASS`` and also registers the
class to the serialization (See the [serialization]({{site.baseurl}}/docs/core_serialization.html) section for further details).

Note that the class ``UserType`` must be serializeable by [boost serialization](http://www.boost.org/libs/serialization/doc/) at that point.

In order to make the plug-in available to your system a XML file containing meta informations about the
plug-in class needs to be exported.

#### Example

The following example shows how a new EnviRe item, with the embedded type
``boost::shared_ptr<::octomap::AbstractOcTree>``, is defined in a *.cpp file:

```cpp
#include <octomap/AbstractOcTree.h>
#include <boost/shared_ptr.hpp>
#include <envire_core/plugin/Plugin.hpp>

ENVIRE_REGISTER_ITEM( boost::shared_ptr<octomap::AbstractOcTree> )
```

It is strongly recommended to use this macros when a new item is defined, since the plug-in
mechanism and the serialization relay on it. Nonetheless it's
possible to define item classes without using this macro, in this case the class won't
be available as plug-in and it won't be possible to serialize the class.

Since the embedded type must be serializeable by [boost serialization](http://www.boost.org/libs/serialization/doc/),
it might be necessary to implement the necessary methods in a header file.


To make the plug-in available to your system a XML file containing meta informations
about the plug-in class needs to be exported.
A minimal layout would look like this:

```xml
<library path="envire_octomap">
  <class class_name="envire::core::Item<boost::shared_ptr<octomap::AbstractOcTree>>" base_class_name="envire::core::ItemBase">
  </class>
</library>
```
This minimal layout can be extended by a class description, associations to other types
and a singleton flag.
If this optional fields are not defined, the description will be empty, there won't be
any associations and the plug-in won't be
a singleton instance.

```xml
<library path="envire_octomap">
  <class class_name="envire::core::Item<boost::shared_ptr<octomap::AbstractOcTree>>" base_class_name="envire::core::ItemBase">
    <description>Octomap OcTree plugin</description>
    <associations>
      <class class_name="boost::shared_ptr<octomap::AbstractOcTree>"></class>
      <class class_name="octomap::AbstractOcTree"></class>
      <class class_name="octomap::OcTree"></class>
    </associations>
    <singleton>false</singleton>
  </class>
</library>
```

To install the XML file there is a cmake macro ``install_plugin_info`` available, which is
exported by the plugin_manager library.

```cmake
rock_library(envire_octomap
    SOURCES OcTree.cpp
    HEADERS OcTree.hpp
    DEPS_CMAKE Boost octomap
    DEPS_PKGCONFIG class_loader envire_core)

install_plugin_info(envire_octomap)
```

The macro ``install_plugin_info`` installs a file named ``envire_octomap.xml`` to the folder
lib/plugin_manager relative to the currently defined CMAKE install path.


### Using a plug-in

To create an instance of a plug-in the ``envire::core::ClassLoader`` singleton class can be used.

Since EnviRe plug-ins are pure class_loader plug-ins it's also possible to load them by using
only the class_loader library or the ``PluginLoader`` class of the plugin_manager library.
For more details read the design section of this page.

#### Example

In the following example the OcTree plug-in class is loaded as abstract ItemBase class:

```cpp
envire::core::ClassLoader* loader = envire::core::ClassLoader::getInstance();
if(loader->hasEnvireItem("envire::core::Item<boost::shared_ptr<octomap::AbstractOcTree>>"))
{
    ItemBase::Ptr item;
    if (loader->createEnvireItem("envire::core::Item<boost::shared_ptr<octomap::AbstractOcTree>>", item))
    {
        // A new item has been successfully created
    }
}
```

The plug-in class can be also directly casted:

```cpp
envire::core::Item<boost::shared_ptr<octomap::AbstractOcTree>>::Ptr item;
envire::core::ClassLoader::getInstance()->createEnvireItem< envire::core::Item<boost::shared_ptr<octomap::AbstractOcTree>> >("envire::core::Item<boost::shared_ptr<octomap::AbstractOcTree>>", item);
```
In this case at least the embedded type has to be known at compile time.

It is also possible to get an Item for a given embedded type by calling the method ``createEnvireItemFor("boost::shared_ptr<octomap::AbstractOcTree>", item)``.


## Design

![plugin_manager_design]({{site.baseurl}}/images/docs/plugins/plugin_manager_design.png)

The EnviRe ``envire_core::ClassLoader`` relies on the plugin_manager library which relies on the
class_loader library.
The class_loader library handles the export of classes, loading of shared libraries
and the creation of new instances. More informations about the class_loader can be
found [here](http://wiki.ros.org/class_loader).
The plugin_manager library handles XML files to provide a-priori meta informations
about the available plug-ins. In contrast to the ROS [plugin_lib](http://wiki.ros.org/pluginlib),
the plugin_manager supports singleton instances, associations and is framework
independent.

Advantages of the plugin_manager library:

- Gather meta informations of available plugins without loading them
- Model associations between classes
- Support of singleton instances
- Framework independent


The ``plugin_manager::PluginManager`` class parses all XML files and preprocesses the informations.
It can be queried about available plug-in classes, relations, associations or properties of classes.
An example of a XML file can be found in the previous section.

The ``plugin_manager::PluginLoader`` is a singleton class which on demand creates a new
``class_loader::ClassLoader`` instance for each new library that is required. It also holds and
returns the same instance of a plug-in class if it is marked as singleton.

The ``envire_core::ClassLoader`` extends the ``PluginLoader`` by knowledge about the EnviRe
base classes.
