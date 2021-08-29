//inputs
const measurement = document.querySelectorAll('input[name="system"]')
const weight = document.querySelector('#weight');
const height = document.querySelector('#height');
const age = document.querySelector('#age');
const gender = document.querySelectorAll('input[name="gender"]');
const activity = document.querySelector('#activity');

//outputs
const bmiOutput = document.querySelector('#BMI');
const bmrOutput = document.querySelector('#BMR');
const tdeeOutput = document.querySelector('#TDEE');
const alert = document.querySelector('#alert');

//submit
const submit = document.querySelector('#submit').addEventListener('click', e => {
    e.preventDefault();
    const selectedGender = gender[0].checked ? "male" : "female";
    const system = measurement[0].checked ? "english" : "metric";

    let BMI,
        BMR,
        TDEE;

    //Check falsy & run calculations
    if (weight.value && height.value && age.value && activity.value !== "null") {
        BMI = calcBMI(weight.value, height.value, system);
        BMR = calcBMR(weight.value, height.value, age.value, selectedGender, system).toFixed(1);
        TDEE = calcTDEE(BMR, activity.value, system).toFixed(1);
    } else {
        showAlert('Please enter correct values', 'error')
    }
    

    //Output
    bmiOutput.innerHTML = `BMI: ${BMI[0].toFixed(1)}, ${BMI[1]}`
    bmrOutput.innerHTML = `BMR: ${BMR}`;
    tdeeOutput.innerHTML = `TDEE: ${TDEE}`;
});

//clear output
const reset = document.querySelector('#reset').addEventListener('click', e => {
    e.preventDefault();
    let output = alert.parentElement.children;
    Object.values(output).forEach(node => {
        node.innerHTML = '';
    });
})

function calcBMI(weight, height, system) {
    let bmi;
    if (system === "english") {
        bmi = (weight / (height * height) * 703);
    } else {
        bmi = (weight / (height * height) * 10000);
    }
    
    let classBMI;

    if (bmi >= 40) {
        classBMI = 'Obese Class 3';
    } else if (bmi >= 35.0 && bmi <= 39.9) {
        classBMI = 'Obese Class 2';
    } else if (bmi >= 30.0 && bmi <= 34.9) {
        classBMI = 'Obese Class 1';
    } else if (bmi >= 25.0 && bmi <= 29.9) {
        classBMI = 'Overweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        classBMI = 'Normal Range';
    } else if (bmi < 18.5) {
        classBMI = 'Underweight';
    }

    return [bmi, classBMI];
}

function calcBMR(weight, height, age, gender, system) {
    //reasign variables if metric
    let total = 0;

    if (gender === "male") {
        total = 5;
    } else {
        total = -161;
    }
    
    //return english-metric conversion
    if (system === "metric") {
        return total + (10 * weight) + (6.25 * height) - (5 * age);
    } else {
        return total + (10 * (weight * 0.45359237)) + (6.25 * (height * 2.54)) - (5 * age)
    }
    
}

function calcTDEE(BMR, activity) {
    return (BMR * activity);
}

function showAlert(message, type) {
    alert.style.visibility = 'visible';
    alert.className += ` ${type}`;
    alert.innerHTML = message;

    setTimeout(() => {
        alert.innerHTML = '';
        alert.classList.remove(`${type}`)
        alert.style.visibility = 'invisible';
    }, 3000);
}