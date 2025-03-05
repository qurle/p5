{
	const nearZero = 1e-7
	const bindedKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

	const sketch = (p: p5) => {
		class Mover {
			position: p5.Vector
			velocity: p5.Vector
			acceleration: p5.Vector
			accCoef = 0.02

			w = 20
			h = 40

			constructor() {
				this.position = p.createVector(p.width / 2, p.height / 2)
				this.velocity = p.createVector()
				this.acceleration = p.createVector(0, nearZero)
			}

			update() {
				checkKeys()

				this.clampAcceleration()
				this.velocity.add(this.acceleration)
				this.clampVelocity()

				this.position.add(this.velocity)
			}

			thrust(value: number) {
				if (value === 0) return
				this.acceleration.add(0, value * this.accCoef)
			}

			brake() {
				this.acceleration.setMag(nearZero)
			}

			clampAcceleration(max = 1) {
				this.acceleration.limit(max)
			}

			clampVelocity(min = 0, max = 3) {
				if (
					this.velocity.y > min 
					&& this.acceleration.y >= nearZero
				) {
					this.velocity.normalize()
					this.velocity.setMag(0)
				}
				this.velocity.limit(max)
			}

			
			show() {
				this.drawInfo()
				p.push()
				p.translate(this.position.x, this.position.y)
				this.drawFwdTrust()
				this.drawBackTrust()
				this.drawRocket()
				p.pop()
			}

			drawRocket(color = '#7F0') {
				p.push()
				p.noStroke()
				p.fill(color)
				p.rect(-this.w / 2, -this.h / 2, this.w, this.h)
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
				// p.push()
				// p.noStroke()
				// p.fill(color)
				// p.triangle(
				// 	-this.w * 0.4,
				// 	-this.h * 0.6,
				// 	-this.w * 0.6,
				// 	-this.h * (0.6 + this.backAcceleration.mag()),
				// 	-this.w * 0.2,
				// 	-this.h * (0.6 + this.backAcceleration.mag()),
				// )
				// p.triangle(
				// 	this.w * 0.4,
				// 	-this.h * 0.6,
				// 	this.w * 0.6,
				// 	-this.h * (0.6 + this.backAcceleration.mag()),
				// 	this.w * 0.2,
				// 	-this.h * (0.6 + this.backAcceleration.mag()),
				// )
				// p.pop()
			}

			drawInfo() {
				p.push()
				let pos = 20
				p.fill(255)
				p.text(`Use ↑↓ to play`, 10, 20)
				p.fill(255, 50)
				pos += 20
				p.text(`FPS: ${p.frameRate().toFixed()}`, 10, pos)
				pos += 20
				p.text(`Spd: ${this.velocity.y.toFixed(2)}`, 10, pos)
				pos += 20
				p.text(`Fwd: ${this.acceleration.y.toFixed(2)}`, 10, pos)
				pos += 20
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
				mover.thrust(1)
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
					mover.brake()
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