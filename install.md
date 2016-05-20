---
layout: default
title: Installation
permalink: /install/
order: 00
nav: main
---

## Compiling

EnviRe is a standalone library which you build from the source code. The code is
available in GitHub and it organizes in modules. EnviRe core dependencies are
cmake, boost and eigen.


## Integration with Rock

The EnviRe library  is independent of the robotic framework in use. However, it
is interesting to share the environment information among components (e.g.
nodes or tasks) which take part of a robotic system.  EnviRe can
be installed together with the Robot Construction Kit
[Rock](http://rock-robotics.org) and it provides the necessary bindings to
exchange information across the Rock middleware.

Get the bootstrap script for the buildconf EnviRe repository

```
$ wget https://raw.githubusercontent.com/envire/buildconf/master/bootstrap.sh
```
Run the `sh` bootstrap script and follow the installation process

```
$ sh bootstrap.sh
```
This process will build all the available EnviRe modules (envire meta-package in
the manifest). The installation process will bring you the EnviRe modules with
integration with Rock in the orogen sub-folders. Refer to the Rock website to
maintain your Rock installation.

## Integration with ROS

Wizard wanted! Please, let us know in case you integrate EnviRe with ROS.

## Repositories naming convention



