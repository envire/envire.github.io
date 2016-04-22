---
id: simulation_overview
title: Overview
subtitle: of Envire Simulation
---

## Introduction
* what is the Envire Simulation
* what is its intended use case?
* main features

Envire-Simulation is a Physics-Based Robotics Simulation engine that uses
Envire as backend to manage, update and store the simulation objects.
Envire-Simulation or Envire-Mars has its origins in the Robotics Simulator
[Mars](http://rock-simulation.github.io/mars//). The two main differences with respect to Mars are: an Envire Based
management of the simulation objects and a more modular software architecture.

### Mars and Envire-Mars
The original version of Mars is based on a Main controller -NodeManager- to
manage the object and its interactions with the physics simulation core -ODE in
this case- and other simulation libraries (e.g. simulated motors and sensor).
In order to enhance the eficciency and improve the architecture of the
simulator, in Envire-Mars these functionalities were moved to plugins which can
be loaded dynamically on demand. In practice, these plugins access, modify and
update the Envire Transformation Graph which is stored at the core of the
simulation engine and allocates the objects which the simulation tools require
to compute its interactions.

### Simulations and Sensor-Based Environment Models
Robotic simulation engines traditionaly represent the simulation environment
using a different approach than the one that the robot control software uses to
model the world. Using two different approaches has two clear drawbacks: one on
the software engineering side and one on the robotics control side. The
software engineering drawback is that multiple code providing very similar
functionality (spatial-temporal representation) has to be maintained and is not
homogenized. The robots control drawback is that generating simulations from
real world data becomes computationally expensive: In the classical simulators
this requires the implementation of converters to switch between sensor data
based representations and simulation representations. 


In summary, Envire Simulation builds upon the work done in Mars and achieves a
better integration of the simulation environment with other components of the
robotic control system by sharing the same representational structure. By
sharing the same representation library the improvements on this library for
other robotic application will also positively affect the simulation engine and
vice-versa.


