//input
const fiveThreeOne = document.querySelectorAll('input[name="fivethreeone"]');
const select1RM = document.querySelector('#oneRepMaxFormula');
const measurementSys = document.querySelectorAll('input[name="system531"]');

//output
const workoutOutput = document.querySelector('.weight');

//submit
document.querySelector('#submitWeight').addEventListener('click', e => {
    e.preventDefault();
    const lifts = [];
    const oneRM = select1RM.value;
    const measurementSystem = measurementSys[0].checked ? "lbs" : "kgs";
    let valid = 0;
    
    //valid 8 means every cell of input is valid
    if (oneRM !== 'null') {
        fiveThreeOne.forEach(input => {
            if (!input.value || input.value < 1) {
                showAlert('Please enter correct values', 'error');
            } else {
                //construct lifts array
                lifts.push(input.value);
                valid++;
            }
        });
    } else {
        showAlert('Please select a formula for calculating One Rep Max', 'error');
    };
    
    if (valid === 8 && oneRM !== 'null') {
        showAlert('Success!', 'success');
        workoutOutput.style.visibility = 'visible';
        workoutOutput.style.overflow = 'visible';
        //calculate
        workoutOutput.innerHTML = calcFiveThreeOne(lifts, oneRM, measurementSystem);
    };
});

//reset
document.querySelector('#resetWeight').addEventListener('click', e => {
    e.preventDefault();
    workoutOutput.innerHTML = "";
})

//lifts array indexes
//0 & 1 = OHP weight/reps
//2 & 3 = Deadlift weight/reps
//4 & 5 = Bench weight/reps
//6 & 7 = Squat weight/reps

function calcFiveThreeOne(lifts, formula, system) {
    //calculate 1rm using selected formula
    let ohp = 0,
        deadlift = 0,
        bench = 0,
        squat = 0;

    if (formula === 'Brzycki') {
        ohp = lifts[0] * (36/(37-lifts[1])),
        deadlift = lifts[2] * (36/(37-lifts[3])),
        bench = lifts[4] * (36/(37-lifts[5])),
        squat = lifts[6] * (36/(37-lifts[7]));
    } else if (formula === 'Epley') {
        ohp = lifts[0] * (1 + (lifts[1]/30)),
        deadlift = lifts[2] * (1 + (lifts[3]/30)),
        bench = lifts[4] * (1 + (lifts[5]/30)),
        squat = lifts[6] * (1 + (lifts[7]/30));
    };

    //create table
    return `<h3>5/3/1 - 4 Week Template - <a href="https://www.t-nation.com/workouts/5-3-1-how-to-build-pure-strength/">Read More</a></h3>
    <p>When you have reached Week 4, restart with +5 pounds on Bench and OHP, +10 pounds on Squat and Deadlift.</p><br>
    <p>The assistance program is optional, or can be substituted for other similar pulling/pushing motions.</p><br>
    <p>The last set on each day is read as "The minimum is X reps, but do as many as you can." This is where strength is built. If you can't do the minimum, your 1RM is not accurate.</p><br>
    <p>Your 3RM should equal aproximately 90% of your 1RM. If at any point in the future this is too low or high adjust your estimated 1RM.</p>
    <p>Bar assumed to be 45Lbs/20Kgs, working weight (<strong>bold</strong>) rounded down to the closest 2.5lbs/kg. Parenthesis denotes the weights you will load onto each side of the bar.</p><br>
    <table id="displayData">
        <tr>
            <th class="distinct">OHP</th>
            <th>Week One</th>
            <th>Week Two</th>
            <th>Week Three</th>
            <th>Week Four</th>
        </tr>
        <tr>
            <th><strong>Set 1</strong></th>
            <td>${finalCalc(ohp, 5, .65)}</td>
            <td>${finalCalc(ohp, 3, .70)}</td>
            <td>${finalCalc(ohp, 5, .75)}</td>
            <td>${finalCalc(ohp, 5, .40)}</td>
        </tr>
        <tr>
            <th><strong>Set 2</strong></th>
            <td>${finalCalc(ohp, 5, .75)}</td>
            <td>${finalCalc(ohp, 3, .80)}</td>
            <td>${finalCalc(ohp, 3, .85)}</td>
            <td>${finalCalc(ohp, 5, .50)}</td>
        </tr>
        <tr>
            <th><strong>Set 3</strong></th>
            <td>${finalCalc(ohp, "5+", .85)}</td>
            <td>${finalCalc(ohp, "3+", .90)}</td>
            <td>${finalCalc(ohp, "1+", .95)}</td>
            <td>${finalCalc(ohp, "5+", .60)}</td>
        </tr>
        <tr>
            <th class="distinct">Deadlift</th>
            <th>Week One</th>
            <th>Week Two</th>
            <th>Week Three</th>
            <th>Week Four</th>
        </tr>
        <tr>
            <th><strong>Set 1</strong></th>
            <td>${finalCalc(deadlift, 5, .65)}</td>
            <td>${finalCalc(deadlift, 3, .70)}</td>
            <td>${finalCalc(deadlift, 5, .75)}</td>
            <td>${finalCalc(deadlift, 5, .40)}</td>
        </tr>
        <tr>
            <th><strong>Set 2</strong></th>
            <td>${finalCalc(deadlift, 5, .75)}</td>
            <td>${finalCalc(deadlift, 3, .80)}</td>
            <td>${finalCalc(deadlift, 3, .85)}</td>
            <td>${finalCalc(deadlift, 5, .50)}</td>
        </tr>
        <tr>
            <th><strong>Set 3</strong></th>
            <td>${finalCalc(deadlift, "5+", .85)}</td>
            <td>${finalCalc(deadlift, "3+", .90)}</td>
            <td>${finalCalc(deadlift, "1+", .95)}</td>
            <td>${finalCalc(deadlift, "5+", .60)}</td>
        </tr>
        <tr>
            <th class="distinct">Bench Press</th>
            <th>Week One</th>
            <th>Week Two</th>
            <th>Week Three</th>
            <th>Week Four</th>
        </tr>
        <tr>
            <th><strong>Set 1</strong></th>
            <td>${finalCalc(bench, 5, .65)}</td>
            <td>${finalCalc(bench, 3, .70)}</td>
            <td>${finalCalc(bench, 5, .75)}</td>
            <td>${finalCalc(bench, 5, .40)}</td>
        </tr>
        <tr>
            <th><strong>Set 2</strong></th>
            <td>${finalCalc(bench, 5, .75)}</td>
            <td>${finalCalc(bench, 3, .80)}</td>
            <td>${finalCalc(bench, 3, .85)}</td>
            <td>${finalCalc(bench, 5, .50)}</td>
        </tr>
        <tr>
            <th><strong>Set 3</strong></th>
            <td>${finalCalc(bench, "5+", .85)}</td>
            <td>${finalCalc(bench, "3+", .90)}</td>
            <td>${finalCalc(bench, "1+", .95)}</td>
            <td>${finalCalc(bench, "5+", .60)}</td>
        </tr>
        <tr>
            <th class="distinct">Squat</th>
            <th>Week One</th>
            <th>Week Two</th>
            <th>Week Three</th>
            <th>Week Four</th>
        </tr>
        <tr>
            <th><strong>Set 1</strong></th>
            <td>${finalCalc(squat, 5, .65)}</td>
            <td>${finalCalc(squat, 3, .70)}</td>
            <td>${finalCalc(squat, 5, .75)}</td>
            <td>${finalCalc(squat, 5, .40)}</td>
        </tr>
        <tr>
            <th><strong>Set 2</strong></th>
            <td>${finalCalc(squat, 5, .75)}</td>
            <td>${finalCalc(squat, 3, .80)}</td>
            <td>${finalCalc(squat, 3, .85)}</td>
            <td>${finalCalc(squat, 5, .50)}</td>
        </tr>
        <tr>
            <th><strong>Set 3</strong></th>
            <td>${finalCalc(squat, "5+", .85)}</td>
            <td>${finalCalc(squat, "3+", .90)}</td>
            <td>${finalCalc(squat, "1+", .95)}</td>
            <td>${finalCalc(squat, "5+", .60)}</td>
        </tr>
    </table>
    `;

    //construct table row data
    function finalCalc(lift, reps, percent) {
        PlateArray = calcPlates(calcPercent(lift, percent), system);
        return `${reps} reps at ${100*percent}% of your 1RM: ${Math.floor(lift)}${system}<br> <strong>${calcPercent(lift, percent)} ${system}</strong> (${PlateArray})`;        
    }
}

//get the total equal to the smallest plate size * 2
function calcPercent(lift, percent) {
    return (Math.floor((lift * percent) / 5) * 5)
}

function calcPlates(lift, system) {
    const lbs = [45, 35, 25, 10, 5, 2.5];
    const kgs = [20, 15, 10, 5, 2.5];
    const platesNeeded = [];
    
    //This calculation will output in the array platesNeeded what weights will be used on each side of the bar
    //determine english or metric
    if (system === 'lbs') {
        //subtract weight of bar
        let total = lift - 45;
        //iterate through array of plates used
        lbs.forEach(plate => {
            let plateMath = Math.floor(total / (plate*2));
            //determine if the current iteration plate will be used
            if (plateMath >= 1) {
                //determine if multiple plates will be used
                if (plateMath >= 2) {
                    //add multiple instances of that plate to the array
                    for (let i = 1; i < plateMath; i++) {
                        platesNeeded.push(plate);
                        total -= (Math.floor(total / (plate*2)) * (plate*2));
                    }
                }
                platesNeeded.push(plate);

                total -= (Math.floor(total / (plate*2)) * (plate*2));
            }
        });
    } 
    else if (system === 'kgs') {
        //identical, but 20kg bar
        let total = lift - 20;
        kgs.forEach(plate => {
            let plateMath = Math.floor(total / (plate*2));
            if (plateMath >= 1) {
                if (plateMath >= 2) {
                    for (let i = 1; i < plateMath; i++) {
                        platesNeeded.push(plate);
                        total -= (Math.floor(total / (plate*2)) * (plate*2));
                    }
                }
                platesNeeded.push(plate);

                total -= (Math.floor(total / (plate*2)) * (plate*2));
            }
        });
    }

    return platesNeeded;
}