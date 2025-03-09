{
	const sketch = (p: p5) => {

		function showWind(wind: p5.Vector) {
			// if (p.frameCount % 10 !== 0) return

			const arrowsAmount = 3
			const windAmount = Math.round(wind.x * arrowsAmount)
			p.push()
			p.strokeWeight(2)
			p.stroke(0, 20)
			p.translate(p.width / 2, 30)
			p.line(0, 0, 50 * wind.x, 0)
			p.pop()
			p.push()
			p.fill(12, 50)
			p.textAlign(p.CENTER)
			const textW = p.textWidth('wind')
			p.text('wind', p.width / 2, 20)
			if (windAmount >= 0) {
				p.textAlign(p.LEFT)
				p.text('►'.repeat(windAmount), p.width / 2 + textW, 20)
			}
			else {
				p.textAlign(p.RIGHT)
				p.text('◀︎'.repeat(windAmount * -1), p.width / 2 - textW, 20)
			}

			p.pop()
		}

		class Environment {
			wind: p5.Vector
			upflow: p5.Vector
			children: Mover[]
			t = 0
			dt = 0.005

			constructor(movers: Mover[]) {
				this.wind = p.createVector(-0.5, 0)
				this.upflow = p.createVector(0, -0.02)
				this.children = movers
			}

			update() {
				this.t += this.dt
				const windForce = -p.map(p.noise(this.t), 0, 1, -1, 1)
				this.wind = p.createVector(windForce, 0)
				this.applyForces()
			}

			applyForces() {
				for (const child of this.children) {
					if (p.mouseIsPressed)
						child.applyForce(this.wind)
					child.applyForce(this.upflow)
				}
			}
		}

		class Mover {
			position: p5.Vector
			velocity: p5.Vector
			acceleration: p5.Vector
			radius = 60

			constructor() {
				this.position = p.createVector(p.random(p.width), p.random(p.height * .2, p.height * .8))
				this.velocity = p.createVector(p.random(-2, 2), p.random(-2, 2))
				this.acceleration = p.createVector()
			}

			update() {
				this.bounceEdges()

				this.velocity.add(this.acceleration)
				this.velocity.limit(10)
				this.position.add(this.velocity)

				this.acceleration.mult(0)

				this.show()
			}

			show(color = undefined) {
				p.fill(color || 0)
				p.circle(this.position.x, this.position.y, this.radius)
			}

			bounceEdges() {
				if (this.position.x > p.width - this.radius || this.position.x < 0 + this.radius)
					this.velocity.x *= -1
				if (this.position.y > p.height - this.radius || this.position.y < 0 + this.radius)
					this.velocity.y *= -1
			}

			pacmanEdges() {
				// Return from boundaries
				if (this.position.x < 0 || this.position.x > p.width)
					this.position.x = Math.abs(p.width - this.position.x)
				if (this.position.y < 0 || this.position.y > p.height)
					this.position.y = Math.abs(p.height - this.position.y)
			}

			applyForce(force: p5.Vector) {
				this.acceleration.add(force)
			}
		}

		let env: Environment
		let mover: Mover

		p.setup = () => {
			p.createCanvas(p.windowWidth, p.windowHeight)
			p.background(250)
			p.noStroke()
			mover = new Mover()
			env = new Environment([mover])
		}

		p.draw = () => {
			p.background(250, 20)
			env.update()
			showWind(env.wind)
			mover.update()
		}

		p.windowResized = () => {
			p.resizeCanvas(p.windowWidth, p.windowHeight)
		}
	}

	new p5(sketch)
}