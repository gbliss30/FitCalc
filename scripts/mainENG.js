//inputs
const weightEng = document.querySelector('#weightEng');
const heightEng = document.querySelector('#heightEng');
const ageEng = document.querySelector('#ageEng');
const genderEng = document.querySelectorAll('input[name="genderEng"]');
const submitEng = document.querySelector('#submitEng');
//outputs
const bmiOutput = document.querySelector('#BMI');
const bmrOutput = document.querySelector('#BMR');

submitEng.addEventListener('click', e => {
    e.preventDefault();
    const selectedGender = genderEng[0].checked ? "male" : "female";

    bmiOutput.innerHTML = calcBMIEng(weightEng.value, heightEng.value);
    bmrOutput.innerHTML = calcBMREng(weightEng.value, heightEng.value, ageEng.value, selectedGender);
});

function calcBMIEng(weight, height) {
    const bmi = (weight / (height * height) *703).toFixed(1);
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

    return `BMI: ${bmi}, ${classBMI}`;
}

function calcBMREng(weight, height, age, gender) {
    if (gender === 'male') {
        return `BMR: ${((4.536 * weight) + (15.88 * height) - (5 * age) + 5).toFixed(1)}`;
    } else if (gender === 'female') {
        return `BMR: ${((4.536 * weight) + (15.88 * height) - (5 * age) - 161).toFixed(1)}`;
    }
}