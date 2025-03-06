const form = document.getElementById('form')
const inputName = document.getElementById('inputName')
const inputEmail = document.getElementById('inputEmail')
const buttonSend = document.getElementById('buttonSend')
const text = document.getElementById('text')
const menuList = document.getElementById('menu')
const counter = document.getElementById('counter')
const inputNamePlaceholder = inputName.getAttribute('placeholder')
const inputEmailPlaceholder = inputEmail.getAttribute('placeholder')
const maxLength = parseInt(text.maxLength)
counter.innerHTML = maxLength

function clearPlaceholder(input) {
  return () => input.placeholder = ''
}

function setPlaceholder(input, placeholder) {
  return () => input.placeholder = placeholder
}

function setCounter() {
  counter.innerHTML = maxLength - text.value.length
}

function checkInput(event) {
  if (inputName.value.length === 0 || inputEmail.value.length === 0)
    event.preventDefault()
}

inputName.addEventListener('focus', clearPlaceholder(inputName))
inputName.addEventListener('blur', setPlaceholder(inputName, inputNamePlaceholder))
inputEmail.addEventListener('focus', clearPlaceholder(inputEmail))
inputEmail.addEventListener('blur', setPlaceholder(inputEmail, inputEmailPlaceholder))
text.addEventListener('input', setCounter)
form.addEventListener('submit', checkInput)


const menu = [
  { title: 'HOME', text: '.header' },
  { title: 'ABOUT US', text: '.about' },
  { title: 'PORTFOLIO', text: '.portfolio' },
  { title: 'CONTACT', text: '.contact' },
]

function getText(event) {
  if (event.target.closest('.menu__link')) return event.target.textContent
}

function findElement(menu, text) {
  return menu.find((item) => item.title === text)
}

function scroll(element) {
  document.querySelector(`${element.text}`).scrollIntoView({
    block: 'center',
    inline: 'nearest',
    behavior: 'smooth',
  })
}

menuList.addEventListener('click', (event) => {
  event.preventDefault()
  scroll(findElement(menu, getText(event)))
})