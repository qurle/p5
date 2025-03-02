{
	const sketch = (p: p5) => {
		p.setup = () => {
			p.createCanvas(480, 320)
			p.pixelDensity(1)
			p.noiseDetail(5, 0.75)
			
		}
		const scale = 0.2
		let zoff = 0

		p.draw = () => {
			p.loadPixels()

			let xoff = 0.0

			for (let x = 0; x < p.width; x++) {
				let yoff = 0.0

				for (let y = 0; y < p.height; y++) {
					let bright = p.map(p.noise(xoff, yoff, zoff), 0, 1, 0, 255)
					p.set(x, y, p.color(bright, bright, bright, 255))

					yoff += 0.01 / scale
				}
				xoff += 0.01 / scale
			}
			p.updatePixels()
			zoff += 0.01
		}
	}

	new p5(sketch)
}