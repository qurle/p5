{
	const sketch = (p) => {

		class Walker {
			x
			y
			stepSize = 2
			radius = 20

			constructor() {
				this.x = p.width / 2
				this.y = p.height / 2
			}
			show(color = undefined) {
				p.fill(color || 0)
				p.circle(this.x, this.y, this.radius)
			}
			step() {
				let xstep = p.random(-this.stepSize, 1.2 * this.stepSize)
				let ystep = p.random(-this.stepSize, 1.2 * this.stepSize)

				this.x += xstep
				this.y += ystep
			}
		}

		let walker

		p.setup = () => {
			p.createCanvas(480, 320)
			p.colorMode(p.HSB)
			p.background(100)
			walker = new Walker()
		}

		p.draw = () => {
			p.background(100, .05)
			walker.step()
			walker.show()
		}
	}

	//@ts-expect-error
	new p5(sketch)
}

