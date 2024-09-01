// Variables for simulation
let velocityInput, angleInput, heightInput
let initialVelocity, angle, initialHeight
let time = 0
let gravity = 9.8 // Acceleration due to gravity (m/s^2)
let x = 0,
  y = 0
let shootButton
let vx = 0 // Horizontal velocity
let vy = 0 // Vertical velocity
let bounceFactor = 0.7 // Factor to reduce velocity after bounce

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)

  // Inputs for velocity, angle, and height
  velocityInput = createInput("50") // Default initial velocity in m/s
  velocityInput.position(width - 200, 20)
  velocityInput.size(60)
  velocityInput.input(updateValues)

  angleInput = createInput("45") // Default launch angle in degrees
  angleInput.position(width - 200, 50)
  angleInput.size(60)
  angleInput.input(updateValues)

  heightInput = createInput("20") // Default initial height in meters
  heightInput.position(width - 200, 80)
  heightInput.size(60)
  heightInput.input(updateValues)

  // Labels for inputs
  createElement("label", "Initial Velocity (m/s)").position(width - 340, 20)
  createElement("label", "Launch Angle (°)").position(width - 340, 50)
  createElement("label", "Initial Height (m)").position(width - 340, 80)

  // Shoot button
  shootButton = createButton("Shoot")
  shootButton.position(width - 200, 110)
  shootButton.mousePressed(shoot)

  updateValues()
  noLoop() // Don't start the simulation until the shoot button is pressed
}

function draw() {
  background(220)

  // Display the ground
  line(0, height - 20, width, height - 20)

  // Draw vertical scale
  stroke(0)
  line(0, 0, 0, height - 20)
  for (let i = 0; i < height - 20; i += 50) {
    line(0, i, 10, i)
    fill(0)
    textSize(15)
    text(`${(height - 20 - i) / 10} m`, 30, i + 5)
  }

  // Calculate the projectile's position
  x += vx * 0.1 // Update horizontal position
  vy -= gravity * 0.1 // Update vertical velocity
  y += vy * 0.1 // Update vertical position

  // Check for bounce
  if (y < 0) {
    y = 0 // Prevent the ball from going below the ground
    vy = -vy * bounceFactor // Reverse and reduce vertical velocity
    vx *= bounceFactor // Reduce horizontal velocity
  }

  // Convert y to canvas coordinates
  let canvasY = height - 20 - y * 10

  // Ensure that the canvasY is within the canvas bounds and is a valid number
  if (!isNaN(canvasY) && canvasY <= height - 20) {
    // Draw the projectile
    fill(0)
    ellipse(x, canvasY, 10, 10)
  }

  // Update time
  time += 0.1

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
}

function shoot() {
  // Reset x, y, vx, and vy when shoot button is pressed
  x = 0
  y = initialHeight
  vx = initialVelocity * cos(radians(angle))
  vy = initialVelocity * sin(radians(angle))
  time = 0
  loop() // Start the simulation when the shoot button is pressed
}
