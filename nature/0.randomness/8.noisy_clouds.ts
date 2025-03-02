{
	const sketch = (p: p5) => {
		p.setup = () => {
			p.createCanvas(480, 320)
			p.pixelDensity(1)
			p.loadPixels()
			p.noiseDetail(9, 0.75)
			p.colorMode(p.HSB)

			const scale = 1

			let xoff = 0.0

			for (let x = 0; x < p.width; x++) {
				let yoff = 0.0

				for (let y = 0; y < p.height; y++) {
					let brightness = p.map(p.noise(xoff, yoff), 0, 1, 0, 100)
					const hue = p.map(p.noise(xoff, yoff), 0, 1, 120, 240)
					const color = p.color(hue, 100, brightness)
					p.set(x, y, color)

					yoff += 0.01 / scale
				}
				xoff += 0.01 / scale
			}
			p.updatePixels()
		}
	}

	new p5(sketch)
}