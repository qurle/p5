{

	const sketch = (p: p5) => {

		let tracesOnly = false

		const G = 6.67

		class Environment {
			children: Mover[]
			forces: p5.Vector[] = []
			t = 0
			dt = 0.005

			constructor(movers: Mover[]) {
				this.children = movers
				const gravity = p.createVector(0)
				this.forces.push(gravity)
			}

			update() {
				this.t += this.dt
				this.applyForces()
			}

			applyForces() {
				for (const child of this.children) {
					if (this.children.length > 1) {
						// Apply neighbors gravity
						for (const neighbor of this.children.filter(e => e !== child)) {
							const grav = this.calcGravity(child, neighbor)
							grav.limit(15)
							child.applyForce(grav)
						}
					}
					// Common forces
					for (const force of this.forces)
						child.applyForce(force)
				}
			}

			calcGravity(from: Mover, to: Mover) {
				const direction = p5.Vector.sub(to.position, from.position)
				const amount = G * from.mass * to.mass / direction.magSq()
				const force = direction.copy().normalize().mult(amount)

				return force
			}
		}

		class Mover {
			position: p5.Vector
			velocity: p5.Vector
			acceleration: p5.Vector
			color: p5.Color
			radius = 0
			mass = 25
			history = []

			constructor(mass = 25, color = p.color(250)) {
				this.position = p.createVector(p.random(p.width * 0.3, p.width * 0.7), p.random((p.height * 0.3, p.height * 0.7)))
				this.velocity = p.createVector(p.random(-2, 2), p.random(-2, 2))
				this.acceleration = p.createVector()
				this.color = color
				this.mass = mass
				this.radius = 15 * Math.sqrt(this.mass / Math.PI)
			}
			update() {
				this.bounceEdges()

				this.velocity.add(this.acceleration)
				this.velocity.limit(20)
				this.position.add(this.velocity)

				this.acceleration.mult(0)

				if (p.frameCount % 2 === 0) this.history.push(this.position.copy())
				if (this.history.length > 500) {
					this.history.splice(0, 1)
				}

				this.show(this.color)

			}

			applyForce(force: p5.Vector) {
				this.acceleration.add(force.copy().div(this.mass))
			}

			show(color) {
				p.noFill()
				p.stroke(255, 5)
				p.beginShape()
				for (const point of this.history) {
					p.noFill()
					p.vertex(point.x, point.y)
					p.endShape()
				}

				if (tracesOnly) return
				p.noStroke()
				p.fill(color || 255)
				p.circle(this.position.x, this.position.y, this.radius)
			}

			bounceEdges() {
				if (this.position.x > p.width - this.radius) {
					this.position.x = p.width - this.radius
					this.velocity.x *= -1
				} else if (this.position.x < this.radius) {
					this.position.x = this.radius
					this.velocity.x *= -1
				}
				if (this.position.y > p.height - this.radius) {
					this.position.y = p.height - this.radius
					this.velocity.y *= -1
				} else if (this.position.y < this.radius) {
					this.position.y = this.radius
					this.velocity.y *= -1
				}
			}

			bounceMover(mover: Mover) {
				if (this.position.x > mover.position.x - mover.radius
					&& this.position.x < mover.position.x + mover.radius
					&& this.position.y > mover.position.y - mover.radius
					&& this.position.y < mover.position.y + mover.radius
				) {
					this.velocity.x *= -1
				}
			}

			pacmanEdges() {
				// Return from boundaries
				if (this.position.x < 0 || this.position.x > p.width)
					this.position.x = Math.abs(p.width - this.position.x)
				if (this.position.y < 0 || this.position.y > p.height)
					this.position.y = Math.abs(p.height - this.position.y)
			}
		}

		let env: Environment
		let mover: Mover
		let mover2: Mover
		let mover3: Mover

		p.setup = () => {
			p.createCanvas(p.windowWidth, p.windowHeight)
			p.background(12)
			mover = new Mover(40, p.color('#CF0'))
			mover2 = new Mover(30, p.color('slateblue'))
			mover3 = new Mover(20, p.color('tomato'))
			env = new Environment([mover, mover2, mover3])
		}

		p.draw = () => {
			p.background(12, 90)
			env.update()
			mover.update()
			mover2.update()
			mover3.update()
		}

		p.mousePressed = () => {
			tracesOnly = !tracesOnly
		}

		p.windowResized = () => {
			p.resizeCanvas(p.windowWidth, p.windowHeight)
		}
	}

	new p5(sketch)
}