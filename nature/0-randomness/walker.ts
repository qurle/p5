{
	class Walker {
		x; y
		stepSize = 2
		radius = 20

		constructor(p) {
			this.x = p.width / 2
			this.y = p.height / 2
		}

		show(p, color = 0) {
			p.fill(color)
			p.circle(this.x, this.y, this.radius)
		}

		step(p) {
			let xstep = p.random(-this.stepSize, this.stepSize)
			let ystep = p.random(-this.stepSize, this.stepSize)

			this.x += xstep
			this.y += ystep
		}
	}

	let walker: Walker

	const sketch = (p) => {
		p.setup = () => {
			p.createCanvas(480, 320)
			p.colorMode(p.HSB)
			p.background(100)
			walker = new Walker(p)
		}

		p.draw = () => {
			p.background(100, 0.05)
			walker.step(p)
			walker.show(p)
		}
	}

	//@ts-expect-error
	new p5(sketch)
}
