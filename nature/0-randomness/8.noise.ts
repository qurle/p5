{
	const sketch = (p) => {
		p.setup = () => {
			p.createCanvas(640, 240)

			// Tell p5 we will work with pixels
			p.loadPixels()
			let xoff = 0.0

			// Updating pixels with perlin noise
			for (let x = 0; x < p.width; x++) {
				let yoff = 0.0

				for (let y = 0; y < p.height; y++) {
					// Calculating brightness value for noise
					const bright = p.map(p.noise(xoff, yoff), 0, 1, 0, 255)
					p.set(x, y, p.floor(bright))
					yoff += 0.01 // Incrementing y-offset perlins noise
				}
				xoff += 0.01 // Incrementing x-offset perlins noise
			}

			p.updatePixels()
		}
	}

	//@ts-expect-error
	new p5(sketch)
}