const seconds = document.querySelector('.counter__time--seconds h1')
const timerText = document.querySelector('.counter__text p')
const increaseBtn = document.querySelector('.add')
const startBtn = document.querySelector('.start')
const stopBtn = document.querySelector('.stop')
const message = document.querySelector('.message')
const messageError = document.querySelector('.message__error h1')
const messageTitle = document.querySelector('.message__title h2')
const messageDesc = document.querySelector('.message__description p')
const messageCode = document.querySelector('.message__code p')
const copyBtn = document.querySelector('.btn')

let value = 10
let paused = false
let text = messageCode.innerText
seconds.innerText = value

const startCounter = () => {
	paused = false
	const intervalHandle = setInterval(() => {
		if (paused === false) {
			value--
			seconds.innerText = value

			if (value === 0) {
				clearInterval(intervalHandle)
				message.classList.remove('hide')
				stopBtn.classList.add('hide')

				fetch('discount.json')
					.then(response => response.json())
					.then(data => {
						if (data.discount.status === 'valid') {
							messageTitle.innerText = data.discount.title
							messageDesc.innerText = data.discount.message
							messageCode.innerText = data.discount.code
							copyBtn.classList.remove('hide')
						} else {
							messageError.innerText = data.discount.warning
						}
					})

					.catch(error => {
						messageError.innerText = 'Something wrong with database.'
					})
			} else if (value === 2) {
				timerText.innerText = 'second left'
			}
		} else {
			clearInterval(intervalHandle)
		}
	}, 1000)

	startBtn.classList.add('hide')
	stopBtn.classList.remove('hide')
	startBtn.removeEventListener('click', startCounter)
}

const increaseCounter = () => {
	if (value + 10 <= 60) {
		value = value + 10
	} else {
		value = 60
	}

	seconds.innerText = value
	messageError.innerText = ''
	messageTitle.innerText = ''
	messageDesc.innerText = ''
	messageCode.innerText = ''
	copyBtn.innerText = 'Copy code'
	timerText.innerText = 'seconds left'

	copyBtn.classList.add('hide')
	startBtn.classList.remove('hide')
	stopBtn.classList.add('hide')

	startBtn.addEventListener('click', startCounter)
}

const stopCounter = () => {
	startBtn.addEventListener('click', startCounter)
	paused = true
	startBtn.classList.remove('hide')
	stopBtn.classList.add('hide')
}

const copyCode = () => {
	navigator.clipboard.writeText(messageCode.innerText)
	copyBtn.innerText = 'Copied!'
}

increaseBtn.addEventListener('click', increaseCounter)
startBtn.addEventListener('click', startCounter)
stopBtn.addEventListener('click', stopCounter)
copyBtn.addEventListener('click', copyCode)
