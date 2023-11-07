const seconds = document.querySelector('.counter__time h1')
const text = document.querySelector('.counter__text p')
const increaseBtn = document.querySelector('.counter__buttons--add')
const startBtn = document.querySelector('.counter__buttons--start')
const stopBtn = document.querySelector('.counter__buttons--stop')
const message = document.querySelector('.message p')

let value = 10
let paused = false

seconds.innerText = value

const startCounter = () => {
	setInterval(function () {
		if (paused === false) {
			if (value === 2) {
				text.innerText = 'second'
			}

			if (value > 0) {
				value = value - 1
				seconds.innerText = value
			} else {
				return
			}

			if (value === 0) {
				message.innerText = 'the end'
			}
		}
	}, 1000)

	startBtn.classList.remove('show')
	startBtn.classList.add('hide')

	stopBtn.classList.remove('hide')
	stopBtn.classList.add('show')
}

const stopCounter = () => {
	paused = !paused
}

const increaseCounter = () => {
	if (value < 60) {
		value = value + 10
	} else if (value === 60) {
		return
	}

	seconds.innerText = value
}

increaseBtn.addEventListener('click', increaseCounter)
startBtn.addEventListener('click', startCounter)
stopBtn.addEventListener('click', stopCounter)
