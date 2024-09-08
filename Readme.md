# Projectile Motion Simulation with p5.js

This project simulates projectile motion, incorporating physics concepts such as gravity, bounce, and air resistance, using the p5.js library. The simulation allows users to adjust the initial velocity, launch angle, and height of the projectile, and visualize its trajectory on a 2D canvas.

## Features

- **Adjustable Parameters:** Users can modify the initial velocity (m/s), launch angle (°), and initial height (m) of the projectile.
- **Bounce Simulation:** The projectile bounces upon hitting the ground, with a configurable bounce factor.
- **Air Resistance:** Option to enable or disable air resistance, modeled as quadratic drag.
- **Dynamic Visuals:** The path of the projectile is traced in real-time, showing the trajectory, maximum height, distance traveled, and time of flight.
- **Sound Effects:** A bounce sound effect is played whenever the projectile hits the ground.

## Getting Started

To try the simulation, [click here](https://stieilijh.github.io/Projectile-Motion-Simulator/).

## Usage

1. Visit the [link](https://stieilijh.github.io/Projectile-Motion-Simulator/) to access the simulation.
2. Adjust the initial velocity, launch angle, and height using the input fields.
3. Toggle the "Enable Bounce" and "Quadratic Drag" checkboxes to enable or disable the respective effects.
4. Click the "Shoot" button to start the simulation.
5. Observe the projectile motion on the canvas. The current distance traveled, maximum height reached, and time of flight are displayed at the bottom.

## Physics Behind the Simulation

### Projectile Motion Equations

The motion of the projectile is calculated using the following physics principles:

- **Horizontal Motion:**
  \[
  x = x_0 + v_x \cdot t
  \]

- **Vertical Motion with Gravity:**
  \[
  y = y_0 + v_y \cdot t - \frac{1}{2} g t^2
  \]

- **Velocity Updates:**
  \[
  v_y = v_y - g \cdot \Delta t
  \]

### Bounce Effect

When the projectile hits the ground (`y = 0`), its vertical velocity `vy` is reversed and reduced by a factor (`bounceFactor`). The sound effect is played whenever a bounce occurs, provided that the vertical velocity is above a threshold value.

### Air Resistance

If air resistance is enabled, a drag force proportional to the square of the velocity is applied:

\[
\text{Drag Force} = 0.5 \times \text{airDensity} \times \text{dragCoefficient} \times \text{projectileArea} \times \text{velocityMagnitude}^2
\]

This force is decomposed into x and y components and subtracted from the respective velocities.

## Troubleshooting

- Use the browser's developer console to check for any errors in the JavaScript code.

---
