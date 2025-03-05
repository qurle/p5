{
	const sketch = (p: p5) => {
		{
			class Walker {
				position: p5.Vector
				velocity: p5.Vector
				acceleration: p5.Vector
				noiseStep: p5.Vector
				stepSize = 0.1
				noiseStepSize = 0.01
				radius = 25

				constructor() {
					this.position = p.createVector(p.random(0, p.width),p.random(0, p.height))
					this.velocity = p.createVector()
					this.acceleration = p.createVector()
					const rand = p.random(0, 100)
					this.noiseStep = p.createVector(rand, rand + 1000)
				}

				show(color = 0) {
					// this.drawInfo()
					this.drawSpeed(color)
					this.drawAcceleration()
					p.push()
					p.fill(color)
					p.circle(this.position.x, this.position.y, this.radius)
					p.pop()
				}

				update() {
					this.acceleration.set(
						p.map(p.noise(this.noiseStep.x), 0, 1, -this.stepSize, this.stepSize),
						p.map(p.noise(this.noiseStep.y), 0, 1, -this.stepSize, this.stepSize)
					)
					this.velocity.add(this.acceleration)
					this.velocity.limit(2)
					this.position.add(this.velocity)
					// Return from boundaries
					this.pacmanEdges()
					this.noiseStep.add(this.noiseStepSize, this.noiseStepSize)
				}


				drawInfo() {
					p.push()
					p.fill(100)
					p.rect(0, 0, 200, 15)
					p.fill(10)
					p.text(this.acceleration.x.toFixed(3), 10, 10)
					p.text(this.acceleration.y.toFixed(3), 60, 10)
					p.pop()
				}

				drawSpeed(color) {
					p.push()
					p.stroke(color)
					p.strokeWeight(5)
					p.line(
						this.position.x,
						this.position.y,
						this.position.x + 10 * this.velocity.x,
						this.position.y + 10 * this.velocity.y,
					)
					p.pop()
				}

				drawAcceleration() {
					p.push()
					p.stroke(12)
					p.line(
						this.position.x,
						this.position.y,
						this.position.x + 1000 * this.acceleration.x,
						this.position.y + 1000 * this.acceleration.y,
					)
					p.pop()
				}

				bounceEdges() {
					if (this.position.x > p.width - this.radius
						|| this.position.x < 0 + this.radius)
						this.velocity.x = this.velocity.x * -1

					if (this.position.y > p.height - this.radius
						|| this.position.y < 0 + this.radius)
						this.velocity.y = this.velocity.y * -1
				}

				pacmanEdges() {
					if (this.position.x < 0 || this.position.x > p.width)
						this.position.x = Math.abs(p.width - this.position.x)
					if (this.position.y < 0 || this.position.y > p.height)
						this.position.y = Math.abs(p.height - this.position.y)
				}
			}

			let walkers
			let slider
			let lastAmount = 2

			p.setup = () => {
				p.createCanvas(p.windowWidth, p.windowHeight)
				p.colorMode(p.HSB)
				p.background(100)
				p.noStroke()
				slider = p.createSlider(1, 50, lastAmount)
				slider.position(p.width / 2 - 50, 10)
				slider.size(100)
				walkers = Array.apply(null, Array(lastAmount)).map(() => new Walker())
			}

			p.draw = () => {
				p.background(100, .15)
				const amount = slider.value()
				if (amount !== lastAmount)
					walkers = Array.apply(null, Array(amount)).map(() => new Walker())
				lastAmount = amount
				walkers.forEach((w, i) => {
					w.update()
					w.show(p.color(360 / walkers.length * i, 100, 100, .5))
				})
			}
		}
	}

	new p5(sketch)
}