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
			const mouseDirectionX = Math.sign(mouseX - this.x) * this.stepSize
			const mouseDirectionY = Math.sign(mouseY - this.y) * this.stepSize
			const toMouse = random() > .5
			const xstep = toMouse ? mouseDirectionX : random(-this.stepSize, this.stepSize)
			const ystep = toMouse ? mouseDirectionY : random(-this.stepSize, this.stepSize)

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