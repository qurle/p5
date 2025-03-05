{
	const nearZero = 1e-7
	const bindedKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

	const sketch = (p: p5) => {
		class Mover {
			position: p5.Vector
			velocity: p5.Vector
			acceleration: p5.Vector
			backAcceleration: p5.Vector
			accCoef = 0.02

			rotation = 0
			rotationVelocity = 0
			rotationAcceleration = 0
			rotCoef = 0.005

			w = 20
			h = 40

			constructor() {
				this.position = p.createVector(p.width / 2, p.height / 2)
				this.velocity = p.createVector()
				this.acceleration = p.createVector(0, nearZero)
				this.acceleration.setHeading(this.rotation - 90)
				this.backAcceleration = p.createVector(0, nearZero)
				this.backAcceleration.setHeading(this.rotation + 90)
			}

			update() {
				checkKeys()

				this.clampRotationAcceleration()
				this.rotationVelocity += this.rotationAcceleration
				this.clampRotationVelocity()
				this.rotation += this.rotationVelocity
				this.acceleration.setHeading(this.rotation - 90)
				this.backAcceleration.setHeading(this.rotation + 90)

				this.clampAcceleration()
				this.velocity.add(this.acceleration)
				this.velocity.add(this.backAcceleration)
				this.clampVelocity()

				this.position.add(this.velocity)
			}

			rotate(value: number) {
				if (value === 0) {
					this.rotationAcceleration = 0
					return
				}
				this.rotationAcceleration += value * this.rotCoef
			}

			thrust(value: number) {
				if (value === 0) return
				if (value < 0) {
					this.acceleration.setMag(
						this.acceleration.mag() - value * this.accCoef,
					)
				} else if (value > 0) {
					this.backAcceleration.setMag(
						this.backAcceleration.mag() + value * this.accCoef,
					)
				}
				if (Math.abs(this.rotationVelocity) > 0)
					this.rotationVelocity *= 0.99
			}

			brake(back = false) {
				if (back) this.backAcceleration.setMag(nearZero)
				else this.acceleration.setMag(nearZero)
			}

			clampAcceleration(max = 1) {
				this.acceleration.limit(max)
				this.backAcceleration.limit(max / 2)
			}

			clampVelocity(min = 0, max = 3) {
				if (
					this.velocity.mag() < min &&
					this.acceleration.mag() <= nearZero &&
					this.backAcceleration.mag() <= nearZero
				) {
					this.velocity.normalize()
					this.velocity.setMag(0)
				}
				this.velocity.limit(max)
			}

			clampRotationAcceleration(max = 2) {
				if (Math.abs(this.rotationAcceleration) > max)
					this.rotationAcceleration =
						Math.sign(this.rotationAcceleration) * max
			}

			clampRotationVelocity(min = 0.1, max = 4) {
				if (
					Math.abs(this.rotationVelocity) < min &&
					Math.abs(this.rotationAcceleration) <= nearZero
				)
					this.rotationVelocity = 0
				if (Math.abs(this.rotationVelocity) > max)
					this.rotationVelocity =
						Math.sign(this.rotationVelocity) * max
			}

			show() {
				this.drawInfo()
				p.push()
				p.translate(this.position.x, this.position.y)
				p.rotate(this.rotation)
				this.drawFwdTrust()
				this.drawBackTrust()
				this.drawSideTrust()
				this.drawRocket()
				p.pop()
			}

			drawRocket(color = '#CF0') {
				p.push()
				p.noStroke()
				p.fill(color)
				p.rect(-this.w / 2, -this.h / 2, this.w, this.h)
				p.triangle(
					-this.w / 2,
					-this.h / 2,
					0,
					-this.h * 0.75,
					this.w / 2,
					-this.h / 2,
				)
				p.pop()
			}

			drawFwdTrust(color = 'tomato') {
				p.push()
				p.fill(color)
				p.triangle(
					-this.w * 0.4,
					this.h / 2,
					this.w * 0.4,
					this.h / 2,
					0,
					(this.h / 2) * (1 + 2 * this.acceleration.mag()),
				)
				p.pop()
			}

			drawBackTrust(color = 250) {
				p.push()
				p.noStroke()
				p.fill(color)
				p.triangle(
					-this.w * 0.4,
					-this.h * 0.6,
					-this.w * 0.6,
					-this.h * (0.6 + this.backAcceleration.mag()),
					-this.w * 0.2,
					-this.h * (0.6 + this.backAcceleration.mag()),
				)
				p.triangle(
					this.w * 0.4,
					-this.h * 0.6,
					this.w * 0.6,
					-this.h * (0.6 + this.backAcceleration.mag()),
					this.w * 0.2,
					-this.h * (0.6 + this.backAcceleration.mag()),
				)
				p.pop()
			}

			drawSideTrust(color = 250) {
				const leftAcc =
					this.rotationAcceleration > 0
						? this.rotationAcceleration
						: 0
				p.push()
				p.noStroke()
				p.fill(color)
				p.triangle(
					-this.w * 0.6,
					-this.h * 0.4,
					-this.w * (0.6 + 2 * leftAcc),
					-this.h * 0.5,
					-this.w * (0.6 + 2 * leftAcc),
					-this.h * 0.3,
				)
				const rightAcc =
					this.rotationAcceleration < 0
						? this.rotationAcceleration
						: 0
				p.triangle(
					this.w * 0.6,
					-this.h * 0.4,
					this.w * (0.6 - 2 * rightAcc),
					-this.h * 0.5,
					this.w * (0.6 - 2 * rightAcc),
					-this.h * 0.3,
				)
				p.pop()
			}

			drawInfo() {
				p.push()
				let pos = 20
				p.fill(255)
				p.text(`Hover and use ↑↓←→ to play`, 10, 20)
				p.fill(255, 50)
				pos += 20
				p.text(`FPS: ${p.frameRate().toFixed()}`, 10, pos)
				pos += 20
				p.text(`Spd: ${this.velocity.mag().toFixed(2)}`, 10, pos)
				pos += 20
				p.text(`Fwd: ${this.acceleration.mag().toFixed(2)}`, 10, pos)
				pos += 20
				p.text(
					`Back: ${this.backAcceleration.mag().toFixed(2)}`,
					10,
					pos,
				)
				pos += 20
				p.text(`Rot: ${this.rotation.toFixed(2)}`, 10, pos)
				pos += 20
				p.text(`RotSp: ${this.rotationVelocity.toFixed(2)}`, 10, pos)
				pos += 20
				p.text(
					`RotAcc: ${this.rotationAcceleration.toFixed(2)}`,
					10,
					pos,
				)
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

		function checkKeys() {
			if (p.keyIsDown(p.UP_ARROW)) {
				mover.thrust(-1)
			}
			if (p.keyIsDown(p.DOWN_ARROW)) {
				mover.thrust(0.25)
			}
			if (p.keyIsDown(p.LEFT_ARROW)) {
				mover.rotate(-1)
			}
			if (p.keyIsDown(p.RIGHT_ARROW)) {
				mover.rotate(1)
			}
			if (!p.keyIsDown(p.UP_ARROW)) {
				mover.brake()
			}
			if (!p.keyIsDown(p.DOWN_ARROW)) {
				mover.brake(true)
			}
			if (!p.keyIsDown(p.LEFT_ARROW) && !p.keyIsDown(p.RIGHT_ARROW)) {
				mover.rotate(0)
			}
		}

		p.keyPressed = () => {
			if (bindedKeys.includes(p.key)) return false
		}

		p.keyReleased = () => {
			switch (p.key) {
				case 'ArrowUp': {
					mover.brake()
					break
				}
				case 'ArrowDown': {
					mover.brake(true)
					break
				}
			}
		}

		let mover: Mover

		p.setup = () => {
			p.createCanvas(
				p.windowWidth,
				p.windowHeight,
			)
			p.background(20)
			p.noStroke()
			p.angleMode(p.DEGREES)
			mover = new Mover()
		}

		p.draw = () => {
			p.background(12)
			mover.update()
			mover.pacmanEdges()
			mover.show()
		}
		p.windowResized = () => {
			p.resizeCanvas(p.windowWidth, p.windowHeight)
		}
	}

	new p5(sketch)
}