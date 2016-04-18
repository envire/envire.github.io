---
id: maps_overview
title: Overview
subtitle:
---

One of the common data for environment representation is maps. 
The EnviRe offers three possibilities to utilize the maps in the EnviRe core:

* use already existing map library from EnviRe
* integrate existing map type from the external library
* implement own desire data type

## EnviRe Map library

EnviRe comes with its own maps library, which contains several map types and offers a good basis for further extension and development of addition types. The general structure of the map library was based on the IEEE Std 1873-2015 for Robot Map Data Representation for Navigation.
The library includes three main map types:

* **Grid Map** is a rigid structure where the world data are discretized into cells. Each cell may contain some data or be free space.
* **Geometric Map**
* **Topological Map**


<img src="https://raw.githubusercontent.com/envire/envire.github.io/master/images/docs/maps/envire_maps_standard.png" width="500"/>

### Local Map

``LocalMap`` is a basis class of all maps in EnviRe. It contains general informaion of the map, such as
id, map type and local map frame. The local frame is used e.g. to find the correspondence between indexes of the grid map and coordinates of the world system. A local frame is represented by right-hand coordinate system, which origin is in bottom right corner initially. The ``offset`` attribute of Local Map allows to transform (tranlate and rotate) the local frame freely. All transformations applied later to the map will take into account the defined local frame of the map.

(TODO: add image with local coordinate system)

## External types

(TODO: write some text: Pointcloud, Octomap)

## Implement own types

(TODO: write some text) 