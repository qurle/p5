{
	let sketch = (p) => {
		let slider

		p.setup = () => {
			p.createCanvas(480, 320)
			p.background(255)

			slider = p.createSlider(0, 100, 20)
			slider.position(20, 20)
		}

		p.draw = () => {
			const x = p.randomGaussian(p.width / 2, slider.value())
			const y = p.randomGaussian(p.height / 2, slider.value())
			p.noStroke()
			p.fill(255, 128 * Math.abs(p.randomGaussian()), 128 * Math.abs(p.randomGaussian()), p.randomGaussian(80))
			p.circle(x, y, p.randomGaussian(8))
		}
	}

	//@ts-expect-error
	new p5(sketch)
}

