{
	const sketch = (p: p5) => {
		let position
		let velocity
		const depth = 400
		const radius = 30

		p.setup = () => {
			p.createCanvas(480, 320, p.WEBGL)
			p.angleMode(p.DEGREES)

			position = p.createVector(0, 0, 0)
			velocity = p.createVector(2, 2, 2)

			p.stroke(0, 20)
			p.strokeWeight(1)


			const cam = p.createCamera()
			cam.setPosition(800, -400, 1000)
			cam.lookAt(0, 0, 0)
			p.setCamera(cam)
		}

		p.draw = () => {
			position.add(velocity)
			p.orbitControl()

			p.background(255)

			p.noFill()
			p.stroke(0, 80)
			p.box(p.width - 20, p.height - 20, depth)

			p.fill(200)
			p.stroke(0, 10)

			if (position.x > p.width / 2 - radius || position.x < -p.width / 2 + radius) {
				velocity.x = velocity.x * -1
			}
			if (position.y > p.height / 2 - radius || position.y < -p.height / 2 + radius) {
				velocity.y = velocity.y * -1
			}

			if (position.z > depth / 2 - radius || position.z < -depth / 2 + radius) {
				velocity.z = velocity.z * -1
			}

			p.translate(position.x, position.y)
			p.sphere(radius)
		}
	}

	new p5(sketch)
}