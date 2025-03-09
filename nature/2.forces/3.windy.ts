{

	const sketch = (p: p5) => {

		const G = 6.67e-1
		const wind = p.createVector(-5, 0)

		class Environment {
			children: Mover[]
			forces: p5.Vector[] = []
			t = 0
			dt = 0.005

			constructor(movers: Mover[]) {
				this.children = movers
				const gravity = p.createVector()
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

					if (p.mouseIsPressed) {
						child.applyForce(wind)
					}

					const friction = child.velocity.copy().mult(-0.2)
					child.applyForce(friction)
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
			genCoef = 0.75
			accCoef = 1
			radius = 0
			mass = 25
			history = []

			constructor(mass = 25, color = p.color(250)) {
				this.position = p.createVector(p.random(-p.width/2, p.width/2))
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
				if (Math.abs(0.5 * p.width - this.position.x) > 0.45 * p.width){
					console.log('XXX')
					this.applyForce(p.createVector(0.25 * (p.width / 2 - this.position.x), 0))
				}
				if (Math.abs(0.5 * p.height - this.position.y) > 0.45 * p.height)
					this.applyForce(p.createVector(0, 0.25 * (p.height / 2 - this.position.y)))
			}

			bounceMover(mover: Mover) {
				if (this.position.x > mover.position.x - mover.radius
					&& this.position.x < mover.position.x + mover.radius
					&& this.position.y > mover.position.y - mover.radius
					&& this.position.y < mover.position.y + mover.radius
				) {
					this.velocity.x *= -1
					this.position.y = mover.position.y + mover.radius
				}
			}
		}

		let env: Environment
		let mover: Mover
		let mover2: Mover

		p.setup = () => {
			p.createCanvas(p.windowWidth, p.windowHeight)
			p.background(12)
			// p.translate(p.width/2, p.height/2)
			p.noFill()
			mover = new Mover(10)
			// mover2 = new Mover(40)
			env = new Environment([mover])
		}

		p.draw = () => {
			p.background(12)

			env.update()
			mover.update()
			// mover2.update()
		}

		p.windowResized = () => {
			p.resizeCanvas(p.windowWidth, p.windowHeight)
		}
	}

	new p5(sketch)
}