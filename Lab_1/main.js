const inputAddBtn = document.querySelector('#inputAdd')
const inputs = document.querySelector('#inputsContainer')
const result = document.querySelector('#result')
let inputDelBtn = document.querySelectorAll('.inputDelete')
let inputAmount = 0

inputAddBtn.addEventListener('click', addInput)
inputs.addEventListener('input', updateResult)

function addInput () {
    const newInputBox = document.createElement('div')
    newInputBox.classList.add('inputBox')

    const newInputField = document.createElement('input')
    newInputField.type = 'text'
    
    const newInputDelete = document.createElement('button')
    newInputDelete.classList.add('inputDelete')
    newInputDelete.textContent = 'Remove'
    newInputDelete.addEventListener('click', (element) => {
        deleteInput(element);
    })

    newInputBox.appendChild(newInputField)
    newInputBox.appendChild(newInputDelete)
    inputs.appendChild(newInputBox)
    inputAmount++
}

function deleteInput(element) {
    const inputBox = element.target.parentElement
    inputs.removeChild(inputBox)
    inputAmount--
    updateResult()
}

function updateResult() {
    const inputFields = inputs.querySelectorAll('input')

    let sum = 0
    let min = Number.MAX_VALUE
    let max = -Number.MAX_VALUE

    inputFields.forEach(input => {
        const number = Number(input.value)
        sum += number
        min = Math.min(min, number)
        max = Math.max(max, number)
    })

    const avg = sum / inputAmount

    document.querySelector('#sum').innerHTML = `Sum: ${sum}`
    document.querySelector('#avg').innerHTML = `Average: ${avg}`
    document.querySelector('#min').innerHTML = `Min: ${min}`
    document.querySelector('#max').innerHTML = `Max: ${max}`
}



