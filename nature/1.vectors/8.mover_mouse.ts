{

	const sketch = (p: p5) => {
		class Mover {
			position: p5.Vector
			velocity: p5.Vector
			acceleration: p5.Vector
			genCoef = 0.75
			accCoef = 1
			radius = 25

			constructor(accCoef = 1, radius = 25) {
				this.position = p.createVector(p.random(p.width), p.random(p.height))
				this.velocity = p.createVector(p.random(-2, 2), p.random(-2, 2))
				this.acceleration = p.createVector()
				this.accCoef = accCoef * this.genCoef
				this.radius = radius
			}
			update(color = '#CF0') {
				let mouse = p.createVector(p.mouseX, p.mouseY)
				let direction = p5.Vector.sub(mouse, this.position)

				direction.normalize()
				direction.mult(this.accCoef / direction.mag())
				this.acceleration = direction

				this.velocity.add(this.acceleration)
				this.velocity.limit(10)
				this.position.add(this.velocity)

				this.bounceEdges()
				this.show(color)

			}
			show(color) {
				p.fill(color)
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
		}


		let mover: Mover
		let mover2: Mover
		let mover3: Mover

		p.setup = () => {
			p.createCanvas(p.windowWidth, p.windowHeight)
			p.background(12)
			mover = new Mover(1, 40)
			mover2 = new Mover(0.5, 30)
			mover3 = new Mover(0.2, 20)
		}

		p.draw = () => {
			p.background(12, 60)
			p.noStroke()

			p.fill(250)
			p.circle(p.mouseX, p.mouseY, 55)
			

			mover.update()
			mover2.update('slateblue')
			mover3.update('tomato')
		}

		p.windowResized = () => {
			p.resizeCanvas(p.windowWidth, p.windowHeight)
		}
	}

	new p5(sketch)
}