const seconds = document.querySelector('.counter__time h1')

let value = 3

seconds.innerText = value

setInterval(function () {
	if (value > 0) {
		value = value - 1
		seconds.innerText = value
	} else {
		return
	}

	console.log('test')
}, 1000)
