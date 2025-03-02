{
	const sketch = (p: p5) => {
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
				let xstep = acceptreject(this.stepSize)
				let ystep = acceptreject(this.stepSize)

				this.x += xstep
				this.y += ystep
			}
		}

		function acceptreject(step: number): number {
			while (true) {
				let r1 = p.random(-step, step)
				let probability = r1 * r1
				let r2 = p.random(-step, step)
				if (r2 < probability) {
					return r1
				}
			}
		}

		let walker: Walker

		p.setup = () => {
			p.createCanvas(480, 320)
			p.colorMode(p.HSB)
			p.background(100)
			walker = new Walker()
		}

		p.draw = () => {
			p.background(100, 0.05)
			walker.step()
			walker.show()
		}
	}

	new p5(sketch)
}