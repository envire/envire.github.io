---
id: maps_grid_map
title: Grid Map
subtitle:
---

``GridMap`` represents the gridbased map structure, where each cell can be accessed by its index. 
The ``Index`` is defined as pair of unsigned integers, which represent the discret cell position in x and y direction
without relation to the grid local frame. The Indexes are oriented to the grid bordes and stars at the bottom low corner.

(TODO: add image of grid and local frame)

The size of the Grid Map is specified by two parameters:

* **number of cells** in x and y direction
* **resolution of cells** in x and y direction, where the resolution is expressed in the world units 

**Note:** The world unit used in cell resolution should correspond to the world unit used in the transformation of local frame. (s. Local Map)

Grid Map realizes the access to a grid cell by index or by position, where the position is some point in the world.
The projection of the world position into Grid Map to estimate the corresponding cell is done by taking into account the local grid frame, which is specified by ``offset`` in ``LocalMap``.

``GridMap`` allows to create any type of gridbased maps. The cell type stored
in the map can be specified by the developer/user freely. Moreover, the default storage used in GridMap is ``std::vector``, due to its computational efficiency. However, the memory storage can be also extanded. 
