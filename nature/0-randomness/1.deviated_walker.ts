{
	class Walker {
		x
		y
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
			let xstep = random(-this.stepSize, 1.2*this.stepSize)
			let ystep = random(-this.stepSize, 1.2*this.stepSize)

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