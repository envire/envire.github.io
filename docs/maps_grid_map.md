---
id: maps_grid_map
title: Grid Map
subtitle:
---

``GridMap`` represents the gridbased map structure. The size of the Grid Map is specified by two parameters:

* **number of cells** in x and y direction
* **resolution of cells** in x and y direction, where the resolution is expressed in the world units 

**Note:** the world unit used in cell resolution should correspond to the world unit used in the transformation of local frame. (s. Local Map)

``GridMap`` allows to create any type of gridbased maps. The cell type stored
in the map can be specified by the developer/user freely. Moreover, the default storage used in GridMap is ``std::vector``, due to its computational efficiency. However, the memory storage can be also extanded. 
