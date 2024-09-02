// Variables for simulation
let bounceSound //Declare the sound variable at the top
let soundOnce = 1
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
let enableBounce = true // Flag to enable or disable bounce
let enableAirResis = false // Flag to enable or disable Air Resistance
let maxheight = 0.0 //Store Maxheight in this variable
let airDensity = 1.225 // kg/m^3 (approximate air density at sea level)
let dragCoefficient = 0.47 // dimensionless (approximate drag coefficient for a sphere)
let ballWidth = 0.1
let ballHeight = 0.1
let projectileArea = 3.14 * ballHeight * ballWidth
let ballPath = [] // Store the ball's previous positions

function preload() {
  bounceSound = loadSound("Bounce.mp3")
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)

  // Inputs for velocity, angle, and height
  velocityInput = createInput("50") // Default initial velocity in m/s
  velocityInput.position(width - 180, 20)
  velocityInput.size(60)
  velocityInput.input(updateValues)

  angleInput = createInput("45") // Default launch angle in degrees
  angleInput.position(width - 180, 50)
  angleInput.size(60)
  angleInput.input(updateValues)

  heightInput = createInput("0") // Default initial height in meters
  heightInput.position(width - 180, 80)
  heightInput.size(60)
  heightInput.input(updateValues)

  // Labels for inputs
  createElement("label", "Initial Velocity (m/s)").position(width - 340, 20)
  createElement("label", "Launch Angle (°)").position(width - 340, 50)
  createElement("label", "Initial Height (m)").position(width - 340, 80)

  // Checkbox for enabling or disabling bounce
  createElement("label", "Enable Bounce").position(width - 340, 110)
  let bounceCheckbox = createCheckbox("", true)
  bounceCheckbox.position(width - 180, 110)
  bounceCheckbox.changed(() => {
    enableBounce = bounceCheckbox.checked()
  })

  //Checkbox for enabling or disabling air resistance
  createElement("label", "Quadratic Drag").position(width - 340, 140)
  let AirResisCheckbox = createCheckbox("", false)
  AirResisCheckbox.position(width - 180, 140)
  AirResisCheckbox.changed(() => {
    enableAirResis = AirResisCheckbox.checked()
  })
  // Shoot button
  shootButton = createButton("Shoot")
  shootButton.position(width - 180, 170)
  shootButton.mousePressed(shoot)

  updateValues()
  ballPath.push(createVector(0, 0)) //  add (0,0) to ball path.
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
  if (!isNaN(vx)) {
    x += vx * 0.1
  } // Update horizontal position
  vy -= gravity * 0.1 // Update vertical velocity
  y += vy * 0.1 // Update vertical position

  // Store the current position in the ballPath array
  ballPath.push(createVector(x, y))

  // Draw the ball path
  noFill()
  stroke(0)
  beginShape()
  for (let i = 0; i < ballPath.length; i++) {
    let canvasY = height - 20 - ballPath[i].y * 10
    if (canvasY > height - 20) canvasY = height - 20
    vertex(ballPath[i].x, canvasY)
  }
  endShape()
  // Check for bounce
  if (enableBounce == true) {
    if (y < 0) {
      y = 0 // Prevent the ball from going below the ground
      vy = -vy * bounceFactor // Reverse and reduce vertical velocity
      if (!(vy < 0.7 && y == 0.0)) bounceSound.play() // Play the sound effect
    }
    if (vy < 0.7 && y == 0.0) {
      vx = 0 //Stop horizontal velocity when the ball stops bouncing
      vy = 0
      y = 0
    }
  } else {
    if (y < 0) {
      //if bounce off then make all velocities 0
      y = 0
      vy = 0
      vx = 0
      if (soundOnce == 1) {
        soundOnce = 0
        bounceSound.play() // Play the sound effect
      }
    }
  }
  // Check for air resistance
  if (enableAirResis) {
    if (!(vy < 0.5 && y == 0.0)) {
      let velocityMagnitude = Math.sqrt(vx * vx + vy * vy)
      let dragForce =
        0.5 *
        airDensity *
        projectileArea *
        dragCoefficient *
        velocityMagnitude *
        velocityMagnitude

      let dragForceX = (-dragForce * vx) / velocityMagnitude
      let dragForceY = (-dragForce * vy) / velocityMagnitude

      vx += dragForceX * 0.1
      vy += dragForceY * 0.1
    }
  }
  // Convert y to canvas coordinates
  let canvasY = height - 20 - y * 10

  // Ensure that the canvasY is within the canvas bounds and is a valid number
  if (!isNaN(canvasY) && canvasY <= height - 20) {
    // Draw the projectile
    fill(0)
    ellipse(x, canvasY, ballHeight * 100, ballWidth * 100)
  }
  // Update time
  if (y > 0) time += 0.1

  // Display the distance traveled on the x-axis
  fill(0)
  textSize(14)
  text(`Distance: ${Math.max(0, x).toFixed(2)} m`, 20, height - 5) // Display distance at the bottom of the canvas

  // Display the max-height traveled on the y-axis
  if (y > maxheight) maxheight = y
  text(`Maximum Height: ${maxheight.toFixed(2)} m`, 200, height - 5)

  // Display the time elapsed
  text(`Time of Flight: ${time.toFixed(2)} s`, 400, height - 5)
}

function updateValues() {
  // Update values when input changes
  initialVelocity = float(velocityInput.value())
  if (angleInput.value() >= 90) angle = 90
  else angle = float(angleInput.value())
  initialHeight = float(heightInput.value())
}

function shoot() {
  // Reset x, y, vx,maxheight and vy when shoot button is pressed
  maxheight = 0
  x = 0
  y = initialHeight
  vx = initialVelocity * cos(radians(angle))
  vy = initialVelocity * sin(radians(angle))
  time = 0
  ballPath = []
  ballPath.push(createVector(0, 0))
  soundOnce = 1
  loop() // Start the simulation when the shoot button is pressed
}
