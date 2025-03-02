{
	class Walker {
		x; y; tx; ty;
		stepSize = 5
		radius = 25

		constructor() {
			this.x = width / 2
			this.y = height / 2
			const rand = random(0, 100)
			this.tx = rand
			this.ty = rand + 10000
		}
		show(color = undefined) {
			fill(color || 0)
			circle(this.x, this.y, this.radius)
		}
		step() {
			const stepX = map(noise(this.tx), 0, 1, -this.stepSize, this.stepSize)
			const stepY = map(noise(this.ty), 0, 1, -this.stepSize, this.stepSize)
			this.x += stepX
			this.y += stepY
			// Return from boundaries
			if (this.x < 0 || this.x > width)
				this.x = abs(width - this.x)
			if (this.y < 0 || this.y > height)
				this.y = abs(height - this.y)
			this.tx += 0.01
			this.ty += 0.01
		}
	}

	let walker
	let time = 0

	let walkers

	//@ts-ignore
	function setup() {
		createCanvas(480, 320)
		colorMode(HSB)
		background(100)
		noStroke()
		walker = new Walker()
		walkers = Array.apply(null, Array(20)).map(() => new Walker())
	}

	//@ts-ignore
	function draw() {
		background(100, .1)
		
		walkers.forEach((w, i) => {
			w.step()
			w.show(color(360 / walkers.length * i, 100, 100, .5))
		})
	
		time += 0.1
	}
}