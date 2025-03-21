{

	const sketch = (p: p5) => {

		// const wind = p.createVector(-5, 0)
		const bounceCoef = 0.9

		class Environment {
			children: Mover[]
			forces: p5.Vector[] = []
			frictionCoef = 1
			vectorMaxLength = 40
			vectorGap = 20

			constructor(movers: Mover[]) {
				this.children = movers
				const gravity = p.createVector()
				this.forces.push(gravity)
			}

			update() {
				this.applyForces()
			}

			showVectors(force: p5.Vector = p.createVector()) {
				p.push()
				p.stroke(255)
				force.limit(this.vectorMaxLength)
				for (let y = this.vectorGap / 2; y < p.height; y += this.vectorMaxLength + this.vectorGap) {
					for (let x = this.vectorGap / 2; x < p.width; x += this.vectorMaxLength + this.vectorGap) {
						p.line(x, y, x + force.x, y + force.y)
						// arrowHead(x, y, x + force.x, y + force.y)
					}
				}
				p.pop()
			}

			applyForces() {
				for (const child of this.children) {
					// Common forces
					for (const force of this.forces)
						child.applyForce(force)

					// Wind
					if (p.mouseIsPressed) {
						const mouse = p.createVector(p.mouseX, p.mouseY)
						const wind = child.position.copy().sub(mouse).mult(.1)
						wind.setMag(100 / wind.mag())
						child.applyForce(wind)

						p.fill(255, 50)
						p.circle(p.mouseX, p.mouseY, 20)
					}

					const friction = child.velocity.copy().normalize().mult(-this.frictionCoef)
					child.applyForce(friction)
				}
			}
		}

		class Mover {
			position = p.createVector(p.random(0, p.width), p.random(0, p.height))
			velocity = p.createVector()
			acceleration = p.createVector()
			force = p.createVector()
			color: p5.Color
			radius = 0
			mass = 25
			history = []

			constructor(mass = 25, color = p.color('#CCFF00')) {
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
				this.force.mult(0)

				if (p.frameCount % 2 === 0) this.history.push(this.position.copy())
				if (this.history.length > 500) {
					this.history.splice(0, 1)
				}

				this.show(this.color)

			}

			applyForce(force: p5.Vector) {
				this.acceleration.add(force.copy().div(this.mass))
				this.force.add(force)
			}

			show(color) {
				p.fill(color)
				p.circle(this.position.x, this.position.y, this.radius)
			}

			bounceEdges() {
				if (this.position.x > p.width - this.radius) {
					this.position.x = p.width - this.radius
					this.velocity.x *= -bounceCoef
				} else if (this.position.x < this.radius) {
					this.position.x = this.radius
					this.velocity.x *= -bounceCoef
				}
				if (this.position.y > p.height - this.radius) {
					this.position.y = p.height - this.radius
					this.velocity.y *= -bounceCoef
				} else if (this.position.y < this.radius) {
					this.position.y = this.radius
					this.velocity.y *= -bounceCoef
				}
			}
		}

		let env: Environment
		let mover: Mover

		p.setup = () => {
			p.createCanvas(p.windowWidth, p.windowHeight)
			p.background(12)
			p.noStroke()
			mover = new Mover(10)
			env = new Environment([mover])
		}

		p.draw = () => {
			p.background(12, 80)

			env.update()
			env.showVectors(mover.acceleration.copy().mult(mover.mass))
			mover.update()


			if (p.mouseIsPressed) {
				p.push()
				p.fill(255, 50)
				p.circle(p.mouseX, p.mouseY, 20)
				p.pop()
			}
		}

		p.windowResized = () => {
			p.resizeCanvas(p.windowWidth, p.windowHeight)
		}
	}

	new p5(sketch)
}