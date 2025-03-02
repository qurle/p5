{
	const sketch = (p: p5) => {
		const poses: { x: number, y: number }[] = []
		const history = 40

		p.setup = () => {
			p.createCanvas(p.windowWidth, p.windowHeight)
			p.noStroke()
		}

		p.draw = () => {
			p.background(0, 20)
			p.fill(255, 64)

			// Add current mouse position to locs array
			poses.push({ x: p.mouseX, y: p.mouseY })

			// Remove the oldest mouse location after 50 frames
			if (poses.length > history) poses.shift()

			// Iterate through last 50 mouse positions
			for (let pos of poses) {
				p.circle(pos.x, pos.y, 5)
			}

			p.circle(p.mouseX, p.mouseY, 5)
		}
	}

	new p5(sketch)
}