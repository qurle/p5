{

	const sketch = (p: p5) => {

		const wind = p.createVector(-5, 0)

		class Environment {
			children: Mover[]
			forces: p5.Vector[] = []

			constructor(movers: Mover[]) {
				this.children = movers
				const gravity = p.createVector()
				this.forces.push(gravity)
			}

			update() {
				this.applyForces()
			}

			applyForces() {
				for (const child of this.children) {
					// Common forces
					for (const force of this.forces)
						child.applyForce(force)

					if (p.mouseIsPressed) {
						child.applyForce(wind)
					}

					const friction = child.velocity.copy().normalize().mult(-1)
					child.applyForce(friction)
				}
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
				this.position = p.createVector(p.random(0, p.width), p.random(0, p.height))
				this.velocity = p.createVector()
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
				p.stroke(color)
				p.circle(this.position.x, this.position.y, this.radius)
			}

			bounceEdges() {
				if (Math.abs(0.5 * p.width - this.position.x) > 0.45 * p.width) {
					this.applyForce(p.createVector(0.25 * (p.width / 2 - this.position.x), 0))
				}
				if (Math.abs(0.5 * p.height - this.position.y) > 0.45 * p.height)
					this.applyForce(p.createVector(0, 0.25 * (p.height / 2 - this.position.y)))
			}
		}

		let env: Environment
		let mover: Mover

		p.setup = () => {
			p.createCanvas(p.windowWidth, p.windowHeight)
			p.background(12)
			p.noFill()
			mover = new Mover(10)
			env = new Environment([mover])
		}

		p.draw = () => {
			p.background(12)

			env.update()
			mover.update()
		}

		p.windowResized = () => {
			p.resizeCanvas(p.windowWidth, p.windowHeight)
		}
	}

	new p5(sketch)
}