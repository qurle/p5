{
	const sketch = (p: p5) => {
		class Walker {
			x; y
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
				const mouseDirectionX = Math.sign(p.mouseX - this.x) * this.stepSize
				const mouseDirectionY = Math.sign(p.mouseY - this.y) * this.stepSize
				const toMouse = p.random() > .5
				const xstep = toMouse ? mouseDirectionX : p.random(-this.stepSize, this.stepSize)
				const ystep = toMouse ? mouseDirectionY : p.random(-this.stepSize, this.stepSize)

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

	new p5(sketch)
}