{

	const sketch = (p: p5) => {
		class Mover {
			pos: p5.Vector
			v: p5.Vector
			r = 25

			constructor() {
				this.pos = p.createVector(p.random(p.width), p.random(p.height))
				this.v = p.createVector(p.random(-2, 2), p.random(-2, 2))
			}
			update() {
				this.pos.add(this.v)
			}
			show(color = undefined) {
				p.fill(color || 0)
				p.circle(this.pos.x, this.pos.y, 25)
			}
			
			bounceEdges(){
				if (this.pos.x > p.width - this.r || this.pos.x < 0 + this.r)
					this.v.x *= -1
				if (this.pos.y > p.height - this.r || this.pos.y < 0 + this.r)
					this.v.y *= -1
			}

			pacmanEdges(){
				// Return from boundaries
				if (this.pos.x < 0 || this.pos.x > p.width)
					this.pos.x = Math.abs(p.width - this.pos.x)
				if (this.pos.y < 0 || this.pos.y > p.height)
					this.pos.y = Math.abs(p.height - this.pos.y)
				
			}
		}

		let mover:Mover

		p.setup = () => {
			p.createCanvas(p.windowWidth, p.windowHeight)
			p.background(250)
			mover = new Mover()
			console.log(p.width)

		}

		p.draw = () => {
			p.background(250, 20)
			mover.update()
			mover.bounceEdges()
			mover.show()
			console.log(mover.pos.x)
		}

		p.windowResized = () => {
			p.resizeCanvas(p.windowWidth, p.windowHeight)
		}
	}

	new p5(sketch)
}