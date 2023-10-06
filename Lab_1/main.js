const num1 = document.querySelector('#num1')
const num2 = document.querySelector('#num2')
const num3 = document.querySelector('#num3')
const num4 = document.querySelector('#num4')
const btnSubmit = document.querySelector('#submit')
const resultContainer = document.querySelector('#results')

btnSubmit.addEventListener('click', () => {
    resultContainer.innerHTML = 
         "Sum = "+(Number(num1.value)+Number(num2.value)+Number(num3.value)+Number(num4.value))+
         " Avg = "+((Number(num1.value)+Number(num2.value)+Number(num3.value)+Number(num4.value))/4)+
         " Min = "+Math.min(Number(num1.value), Number(num2.value), Number(num3.value), Number(num4.value))+
         " Max = "+Math.max(Number(num1.value), Number(num2.value), Number(num3.value), Number(num4.value))
    console.log(num1.value)
})


