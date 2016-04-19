---
id: tutorial_basic_envire_graph_create_new_items
title: Creating new Items
---
New item types should always be defined using the envire plugin mechanism because
the plugin macros add metadata that is needed for correct serialization and
visualization.

**Minimal Example**

*Header File:*

```cpp
namespace envire { namespace myNamespace
{
  struct MyInternalType{};

  struct MyItem : public envire::core::Item<MyInternalType>
  {
    ENVIRE_PLUGIN_HEADER(MyItem)
    virtual const std::type_info* getTypeInfo() const override
    {
      return &typeid(envire::myNamespace::MyItem);
    }
  };
}}


namespace boost { namespace serialization
{
  template<class Archive>
  void serialize(Archive & ar, ::envire::myNamespace::MyInternalType & data, const unsigned int version)
  {
    //serialize
  }
}}
```

*Cpp File:*

```cpp
ENVIRE_REGISTER_PLUGIN(envire::myNamespace::MyItem, MyInternalType)
```
