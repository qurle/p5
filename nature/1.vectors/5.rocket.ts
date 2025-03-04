{
	const nearZero = 1e-7

	const sketch = (p: p5) => {
		class Mover {
			position: p5.Vector
			velocity: p5.Vector
			acceleration: p5.Vector
			backAcceleration: p5.Vector
			accCoef = 0.05
			rotCoef = 2
			heading = 0
			w = 20
			h = 40

			constructor() {
				this.position = p.createVector(p.width / 2, p.height / 2)
				this.velocity = p.createVector()
				this.acceleration = p.createVector(0, nearZero)
				this.acceleration.setHeading(this.heading - 90)
				this.backAcceleration = p.createVector(0, nearZero)
				this.backAcceleration.setHeading(this.heading + 90)
			}

			update() {
				checkKeys()
				this.acceleration.limit(2)
				this.backAcceleration.limit(1)
				this.velocity.add(this.acceleration)
				this.velocity.add(this.backAcceleration)
				this.clampVelocity()
				this.position.add(this.velocity)
			}

			rotate(angle: number) {
				angle *= this.rotCoef
				this.heading += angle
				this.acceleration.setHeading(this.acceleration.heading() + angle)
				this.backAcceleration.setHeading(this.backAcceleration.heading() + angle)
			}

			thrust(value: number) {
				if (value < 0)
					this.acceleration.setMag(this.acceleration.mag() - value * this.accCoef)
				else if (value > 0)
					this.backAcceleration.setMag(this.backAcceleration.mag() + value * this.accCoef)
			}

			brake(back = false) {
				if (back)
					this.backAcceleration.setMag(nearZero)
				else
					this.acceleration.setMag(nearZero)
			}

			clampVelocity(min = 0, max = 5) {
				if (this.velocity.mag() < min && this.acceleration.mag() <= nearZero) {
					this.velocity.normalize()
					this.velocity.setMag(0)
				}
				this.velocity.limit(max)
			}

			show() {
				this.drawInfo()
				p.push()
				p.translate(this.position.x, this.position.y)
				p.rotate(this.heading)
				this.drawFwdTrust()
				this.drawBackTrust()
				this.drawRocket()
				p.pop()

			}

			drawRocket(color = '#CF0') {
				p.push()
				p.noStroke()
				p.fill(color)
				p.rect(-this.w / 2, -this.h / 2, this.w, this.h)
				p.triangle(-this.w / 2, -this.h / 2, 0, -this.h * 0.75, this.w / 2, -this.h / 2)
				p.pop()
			}

			drawFwdTrust(color = 'tomato') {
				p.push()
				p.fill(color)
				p.rect(-this.w * .2, this.h / 2, this.w * .4, 50 * this.acceleration.mag())
				p.pop()
			}

			drawBackTrust(color = 250) {
				p.push()
				p.noStroke()
				p.fill(color)
				p.triangle(-this.w * 0.4, -this.h * 0.6, -this.w * 0.6, -this.h * (0.6 + this.backAcceleration.mag()), -this.w * 0.2, -this.h * (0.6 + this.backAcceleration.mag()))
				p.triangle(this.w * 0.4, -this.h * 0.6, this.w * 0.6, -this.h * (0.6 + this.backAcceleration.mag()), this.w * 0.2, -this.h * (0.6 + this.backAcceleration.mag()))
				p.pop()
			}


			drawInfo() {
				p.push()
				p.fill(0)
				p.rect(0, 0, 100, 75)
				p.fill(255)
				p.text(`Fwd: ${this.acceleration.mag().toFixed(2)}`, 10, 20)
				p.text(`Back: ${this.backAcceleration.mag().toFixed(2)}`, 10, 40)
				p.text(`Spd: ${this.velocity.mag().toFixed(2)}`, 10, 60)
				p.pop()
			}

			pacmanEdges() {
				// Return from boundaries
				if (this.position.x < 0 || this.position.x > p.width)
					this.position.x = Math.abs(p.width - this.position.x)
				if (this.position.y < 0 || this.position.y > p.height)
					this.position.y = Math.abs(p.height - this.position.y)
			}
		}

		let mover: Mover

		p.setup = () => {
			p.createCanvas(p.windowWidth, p.windowHeight)
			p.background(20)
			p.angleMode(p.DEGREES)
			mover = new Mover()
		}

		p.draw = () => {
			p.background(20, 100)
			mover.update()
			mover.pacmanEdges()
			mover.show()
		}

		p.windowResized = () => {
			p.resizeCanvas(p.windowWidth, p.windowHeight)
		}

		function checkKeys() {
			if (p.keyIsDown(p.UP_ARROW)) {
				mover.thrust(-1)
			}
			if (p.keyIsDown(p.DOWN_ARROW)) {
				mover.thrust(0.5)
			}
			if (p.keyIsDown(p.LEFT_ARROW)) {
				mover.rotate(-1)
			}
			if (p.keyIsDown(p.RIGHT_ARROW)) {
				mover.rotate(1)
			}
		}

		p.keyReleased = () => {
			switch (p.key) {
				case 'ArrowUp': {
					mover.brake()
					break
				}
				case 'ArrowDown': {
					mover.brake(true)
				}
			}
		}
	}

	new p5(sketch)
}