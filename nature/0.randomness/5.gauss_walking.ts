{
	let sketch = (p: p5) => {
		class Walker {
			x; y
			stepSize = 2
			radius = 20

			constructor(p) {
				this.x = p.width / 2
				this.y = p.height / 2
			}
			show(p, color = undefined) {
				p.fill(color || 0)
				p.circle(this.x, this.y, this.radius)
			}
			step(p) {
				let xstep = p.randomGaussian(0, this.stepSize)
				let ystep = p.randomGaussian(0, this.stepSize)

				this.x += xstep
				this.y += ystep
			}
		}

		let walker

		p.setup = () => {
			p.createCanvas(480, 320)
			p.colorMode(p.HSB)
			p.background(100)
			walker = new Walker(p)
		}

		p.draw = () => {
			p.background(100, .05)
			walker.step(p)
			walker.show(p)
		}
	}

	new p5(sketch)
}