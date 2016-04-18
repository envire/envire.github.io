---
id: maps_elevation_map
title: Elevation Map
subtitle:
---

The Elevation Map (also named Height Map) is 2.5D grid-based map where the value of each cell is an estimated height.

<img src="https://raw.githubusercontent.com/envire/envire.github.io/master/images/docs/maps/elevation_map.png" width="600"/>

In the Elevation Map the values are stored as ``doubles``. Additional to default grid functionality, e.g. access a grid cell, the Elevation Map offers follower functions:

* calculate normal of the cell ``getNormal()``
* calculate mean elevation of the cell ``getMeanElevation()``

In both cases the calculation is down over 3x3 neighbourhood of the cell.

(TODO: operation for the projection)


