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

### Providing a plug-in

There are two macros which shall be used in order to define a new plug-in class for EnviRe:

- ``ENVIRE_PLUGIN_HEADER ( namespace::classname )``

  Has to be placed in the class declaration in the header of the new type. It is not necessary
  but recommended to add the name space in order to have a more unique lookup name.
  It adds a function which provides the name of the class and adds definitions related to the
  serialization
  (See the [serialization]({{site.baseurl}}/docs/core_serialization.html) section for further details).

- ``ENVIRE_REGISTER_PLUGIN ( namespace::classname )``

  Has to be placed in the source file of the class.
  It adds the class loader registration macro ``CLASS_LOADER_REGISTER_CLASS`` and also registers the
  class to the serialization
  (See the [serialization]({{site.baseurl}}/docs/core_serialization.html) section for further details).


In order to make the plug-in available to your system a XML file containing meta informations about the
plug-in class needs to be exported.



#### Example

The following example shows how a new EnviRe item, with the embedded type
``boost::shared_ptr< ::octomap::AbstractOcTree >``, is defined:

```cpp
namespace envire { namespace octomap
{
    typedef boost::shared_ptr< ::octomap::AbstractOcTree > AbstractOcTreePtr;

    class OcTree : public envire::core::Item< AbstractOcTreePtr >
    {
        ENVIRE_PLUGIN_HEADER(envire::octomap::OcTree)
    };
}}
```
The ``envire::core::Item`` class augments the embedded type by a time-stamp,
a reference frame and an unique ID.

In the source file of the new class only the ``ENVIRE_REGISTER_PLUGIN`` macro needs to added:

```cpp
#include "OcTree.hpp"

ENVIRE_REGISTER_PLUGIN( envire::octomap::OcTree )
```

Note that this is a minimal example of a new EnviRe item class definition. The user is
free to define more functions or members in this class.
It is strongly recommended to use this macros when a new item is defined, since the plug-in
mechanism and the serialization relay on it. Nonetheless it's
possible to define item classes without using the macros, in this case the class won't
be available as plug-in and it won't be possible to serialize the class.


To make the plug-in available to your system a XML file containing meta informations
about the plug-in class needs to be exported.
A minimal layout would look like this:

```xml
<library path="envire_octomap">
  <class class_name="envire::octomap::OcTree" base_class_name="envire::core::ItemBase">
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
  <class class_name="envire::octomap::OcTree" base_class_name="envire::core::ItemBase">
    <description>Octomap OcTree plugin</description>
    <associations>
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
if(loader->hasEnvireItem("envire::octomap::OcTree"))
{
    ItemBase::Ptr item;
    if (loader->createEnvireItem("envire::octomap::OcTree", item))
    {
        // A new item has been successfully created
    }
}
```

The plug-in class can be also directly casted:

```cpp
envire::core::Item< AbstractOcTreePtr >::Ptr item;
envire::core::ClassLoader::getInstance()->createEnvireItem< envire::core::Item< AbstractOcTreePtr > >("envire::octomap::OcTree", item);
```
In this case at least the embedded type has to be known at compile time.

When the actual class is known at compile time there is little benefit in using the plug-in
mechanism, but it still can be done:

```cpp
envire::octomap::OcTree::Ptr item;
envire::core::ClassLoader::getInstance()->createEnvireItem< envire::octomap::OcTree >("envire::octomap::OcTree", item);
```

Note that the name space informations not necessarily need to be provided.
``createEnvireItem("OcTree", item)`` shall also return successfully if no other equally named
plug-in class is available.


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
