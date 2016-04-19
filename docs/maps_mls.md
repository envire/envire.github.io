---
id: maps_mls
title: Multi-Level Surface Map
subtitle:
---

EnviRe's Multi-Level Surface Maps are based on [[Schwendner, 2013, §2.1.2]](http://elib.suub.uni-bremen.de/edocs/00103537-1.pdf) which itself is based on work by [[Triebel et al., 2016]](http://dx.doi.org/10.1109/IROS.2006.282632). The idea is to represent 3D structure by a grid where each grid cell contains a list of surface patches. This can be thought of as a generalization of an elevation map that allows representing multiple levels.

`MLSMap` are a specialization of Multi-Level Grid Maps `MLGrid` which are `GridMap`s of `LevelList`s.
In an `MLSMap` each `LevelList` contains `SurfacePatch`es of a specific type. 
At the moment we provide classical MLS maps where each patch is represented by a z-coordinate with uncertainty and an optional height, which we call `MLSMapKalman`. Furthermore, we provide an MLS map where each surface patch accumulates the momenta of all measured points in that cell which can be used to calculate a sloped plane fitting best to the given measurement. We call the latter `MLSMapSloped`.

`MLGrid`s are also used to represent 3d traversability maps.
