{
	const sketch = (p: p5) => {
		class Walker {
			position
			stepSize = 2
			radius = 20

			constructor() {
				this.position = p.createVector(p.width / 2, p.height / 2)
			}
			show(color = undefined) {
				p.fill(color || 0)
				p.circle(this.position.x, this.position.y, this.radius)
			}
			step() {
				const mouseDirection = p.createVector(
					Math.sign(p.mouseX - this.position.x) * this.stepSize, 
					Math.sign(p.mouseY - this.position.y) * this.stepSize
				)
				const toMouse = p.random() > .5
				const step = toMouse ? mouseDirection : p.createVector(p.random(-this.stepSize, this.stepSize) , p.random(-this.stepSize, this.stepSize))
				this.position.add(step)
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