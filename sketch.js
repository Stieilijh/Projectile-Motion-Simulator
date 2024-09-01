// Variables for simulation
let velocityInput, angleInput, heightInput
let initialVelocity, angle, initialHeight
let time = 0
let gravity = 9.8 // Acceleration due to gravity (m/s^2)
let x = 0,
  y = 0

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)

  // Inputs for velocity, angle, and height
  velocityInput = createInput("50") // Default initial velocity in m/s
  velocityInput.position(20, 20)
  velocityInput.size(60)
  velocityInput.input(updateValues)

  angleInput = createInput("45") // Default launch angle in degrees
  angleInput.position(20, 50)
  angleInput.size(60)
  angleInput.input(updateValues)

  heightInput = createInput("20") // Default initial height in meters
  heightInput.position(20, 80)
  heightInput.size(60)
  heightInput.input(updateValues)

  // Labels for inputs
  createElement("label", "Initial Velocity (m/s)").position(100, 20)
  createElement("label", "Launch Angle (°)").position(100, 50)
  createElement("label", "Initial height (m)").position(100, 80)

  updateValues()
}

function draw() {
  background(220)

  // Display the ground
  line(0, height - 20, width, height - 20)

  // Calculate the projectile's position
  x = initialVelocity * cos(radians(angle)) * time
  y =
    initialHeight +
    (initialVelocity * sin(radians(angle)) * time - 0.5 * gravity * time * time)

  // Convert y to canvas coordinates
  let canvasY = height - 20 - y

  // Ensure that the canvasY is within the canvas bounds and is a valid number
  if (!isNaN(canvasY) && canvasY <= height - 20) {
    // Draw the projectile
    fill(0)
    ellipse(x, canvasY, 10, 10)
  }

  // Update time
  time += 0.1

  // Stop the projectile if it hits the ground
  if (canvasY >= height - 20 || isNaN(canvasY)) {
    noLoop()
  }

  // Display the distance traveled on the x-axis
  fill(0)
  textSize(14)
  text(`Distance: ${x.toFixed(2)} m`, 20, height - 5) // Display distance at the bottom of the canvas
}

function updateValues() {
  // Update values when input changes
  initialVelocity = float(velocityInput.value())
  angle = float(angleInput.value())
  initialHeight = float(heightInput.value())
  time = 0
  loop() // Restart simulation when input changes
}
