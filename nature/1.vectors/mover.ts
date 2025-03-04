{

	const sketch = (p: p5) => {
		class Mover {
			position: p5.Vector
			velocity: p5.Vector
			acceleration: p5.Vector
			radius = 25

			constructor() {
				this.position = p.createVector(p.random(p.width), p.random(p.height))
				this.velocity = p.createVector(p.random(-2, 2), p.random(-2, 2))
				this.acceleration = p.createVector(0, 2)
			}
			update() {
				this.velocity.add(this.acceleration)
				this.velocity.limit(10)
				this.position.add(this.velocity)
			}
			show(color = undefined) {
				p.fill(color || 0)
				p.circle(this.position.x, this.position.y, 25)
			}
			
			bounceEdges(){
				if (this.position.x > p.width - this.radius || this.position.x < 0 + this.radius)
					this.velocity.x *= -1
				if (this.position.y > p.height - this.radius || this.position.y < 0 + this.radius)
					this.velocity.y *= -1
			}

			pacmanEdges(){
				// Return from boundaries
				if (this.position.x < 0 || this.position.x > p.width)
					this.position.x = Math.abs(p.width - this.position.x)
				if (this.position.y < 0 || this.position.y > p.height)
					this.position.y = Math.abs(p.height - this.position.y)
				
			}
		}

		let mover:Mover

		p.setup = () => {
			p.createCanvas(p.windowWidth, p.windowHeight)
			p.background(250)
			mover = new Mover()
		}

		p.draw = () => {
			p.background(250, 20)
			mover.update()
			mover.pacmanEdges()
			console.log(mover.velocity.y)
			mover.show()

		}

		p.windowResized = () => {
			p.resizeCanvas(p.windowWidth, p.windowHeight)
		}
	}

	new p5(sketch)
}