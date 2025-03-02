{
	class Walker {
		x; y
		stepSize = 2
		radius = 20

		constructor() {
			this.x = width / 2
			this.y = height / 2
		}
		show(color = undefined) {
			fill(color || 0)
			circle(this.x, this.y, this.radius)
		}
		step() {
			let xstep = randomGaussian(0, this.stepSize)
			let ystep = randomGaussian(0, this.stepSize)

			this.x += xstep
			this.y += ystep
		}
	}

	let walker

	//@ts-ignore
	function setup() {
		createCanvas(480, 320)
		colorMode(HSB)
		background(100)
		walker = new Walker()
	}
	
	//@ts-ignore
	function draw() {
		background(100, .05)
		walker.step()
		walker.show()
	}
}