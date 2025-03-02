{
	const sketch = (p: p5) => {
		{
			class Walker {
				x; y; tx; ty
				stepSize = 5
				radius = 25

				constructor() {
					this.x = p.width / 2
					this.y = p.height / 2
					const rand = p.random(0, 100)
					this.tx = rand
					this.ty = rand + 10000
				}
				show(color = undefined) {
					p.fill(color || 0)
					p.circle(this.x, this.y, this.radius)
				}
				step() {
					const stepX = p.map(p.noise(this.tx), 0, 1, -this.stepSize, this.stepSize)
					const stepY = p.map(p.noise(this.ty), 0, 1, -this.stepSize, this.stepSize)
					this.x += stepX
					this.y += stepY
					// Return from boundaries
					if (this.x < 0 || this.x > p.width)
						this.x = Math.abs(p.width - this.x)
					if (this.y < 0 || this.y > p.height)
						this.y = Math.abs(p.height - this.y)
					this.tx += 0.01
					this.ty += 0.01
				}
			}

			let walker
			let time = 0

			let walkers

			p.setup = () => {
				p.createCanvas(p.windowWidth, p.windowHeight)
				p.colorMode(p.HSB)
				p.background(100)
				p.noStroke()
				walker = new Walker()
				walkers = Array.apply(null, Array(20)).map(() => new Walker())
			}

			p.draw = () => {
				p.background(100, .15)

				walkers.forEach((w, i) => {
					w.step()
					w.show(p.color(360 / walkers.length * i, 100, 100, .5))
				})

				time += 0.1
			}
		}
	}

	new p5(sketch)
}