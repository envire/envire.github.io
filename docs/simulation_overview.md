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
Envire as backend to manage the simulation objects. This means that the
simulated objects are represented around the physics simulation core (ODE in
this case) with an Environment Representation Graph (Envire-Graph).

Most of the robotics simulation engines represent the simulation environment
using a different approach than the one that the robot control software uses to
model the environment. This separateness has two clear drawbacks one on the
software side and one on the robotics control side. The software engineering
drawback is that multiple code providing very similar functionality
(spatial-temporal representation) has to be maintained. The second drawback
is that generating simulations from real world data turns unefficient: In the
classical simulators this requires the implementation of converters to switch
between sensor data based representations and simulation representations. 

In summary, Envire Simulation achieves a seamless integration of the simulation
environment with the other components of the robotic control system by sharing
the same representational structure. Furthermore, by sharing the same
representation library the improvements on this library for other robotic
application will also positively affect the simulation engine and vice-versa.

