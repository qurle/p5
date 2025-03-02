{
	let slider

	//@ts-ignore
	function setup() {
		createCanvas(480, 320)
		background(255)

		slider = createSlider(0, 100, 20)
		slider.position(20, 20)
	}

	//@ts-ignore
	function draw() {
		const x = randomGaussian(width / 2, slider.value())
		const y = randomGaussian(height / 2, slider.value())
		noStroke()
		fill(255, 128 * abs(randomGaussian()), 128 * abs(randomGaussian()), randomGaussian(80))
		circle(x, y, randomGaussian(8))
	}

}