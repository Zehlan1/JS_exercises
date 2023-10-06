let nums = document.querySelectorAll('input')
const resultContainer = document.querySelector('#results')

nums.forEach(num => {
    num.addEventListener('input', updateResult)
})

function updateResult() {
    const num1 = Number(document.querySelector('#num1').value)
    const num2 = Number(document.querySelector('#num2').value)
    const num3 = Number(document.querySelector('#num3').value)
    const num4 = Number(document.querySelector('#num4').value)
    resultContainer.innerHTML =
        "Sum = "+(num1+num2+num3+num4)+
        " Avg = "+((num1+num2+num3+num4)/4)+
        " Min = "+Math.min(num1, num2, num3, num4)+
        " Max = "+Math.max(num1, num2, num3, num4)
}



