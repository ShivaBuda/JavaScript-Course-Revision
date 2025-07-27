//################### Section 2 ###################
// Coding Exercise 1: CHALLENGE #1
const massMark = 78;
const heightMark = 1.69;

const massJohn = 92;
const heightJohn = 1.95;

const BMIMark = massMark / (heightMark * heightMark);
const BMIJohn = massJohn / heightJohn ** 2;

console.log(BMIMark, BMIJohn);

const markHigherBMI = BMIMark > BMIJohn;

console.log(`Has Mark a higher BMI than John? Ans is : ${markHigherBMI}`);

// Coding Exercise 2: CHALLENGE #2
// Useing TEMPLATE LITERAL
let higherBMI;

if (BMIMark > BMIJohn) {
    higherBMI = `Mark's BMI (${BMIMark}) is higher than John's (${BMIJohn})!`;
} else if (BMIJohn > BMIMark) {
    higherBMI = `John's BMI (${BMIJohn}) is higher than Mark's (${BMIMark})!`;
} else {
    higherBMI = "Both has same BMI";
}
console.log(higherBMI);

// Coding Exercise 4: CHALLENGE #4
const bill = 40;
const tip = bill >= 50 && bill <= 300 ? 0.15 * bill : 0.2 * bill;

console.log(
    `The bill was ${bill}, the tip was ${tip}
    }, and the total total bill Rs. ${bill + tip}.`,
);

//################### Section 3 ###################
// Coding Exercise 5: CHALLENGE #1
const calcAverage = (score_1, score_2, score_3) =>
    (score_1 + score_2 + score_3) / 3;

const scoreKoalas = calcAverage(2, 2, 2);
const scoreDolphins = calcAverage(6, 6, 6);

const checkWinner = (aveKoalas, aveDolphins) => {
    if (aveKoalas > aveDolphins ** 2) {
        return `Team Koalas win (${aveKoalas} vs ${aveDolphins})`;
    } else if (aveDolphins > aveKoalas ** 2) {
        return `Team Dolphins win (${aveDolphins} vs ${aveKoalas})`;
    } else return "No team wins!";
};

console.log(checkWinner(scoreKoalas, scoreDolphins));

// Coding Exercise 6: CHALLENGE #2

const calcTip = (bill) =>
    bill >= 50 && bill <= 300 ? 0.15 * bill : 0.2 * bill;

console.log(calcTip(100));

const bills = [125, 55, 55];
const tips = [];
for (let i = 0; i < bills.length; i++) {
    tips.push(calcTip(bills[i]));
}
console.log(tips);

// Coding Exercise 7: CHALLENGE #3

const saila = {
    fullName: "Saila Budha",
    mass: "78",
    height: "1.69",

    calcBMI: function () {
        return (this.bmi = this.mass / this.height ** 2);
    },
};
const maila = {
    fullName: "Maila Magar",
    mass: "45",
    height: "1.57",
    calcBMI: function () {
        return (this.bmi = this.mass / this.height ** 2);
    },
};
maila.calcBMI();
saila.calcBMI();
console.log(maila.bmi);
console.log(saila.bmi);

if (saila.bmi > maila.bmi) {
    console.log(
        `${saila.fullName}'s BMI (${saila.bmi}) is higher than ${maila.fullName}'s (${maila.bmi})`,
    );
} else if (maila.bmi > saila.bmi) {
    console.log(
        `${saila.fullName}'s BMI (${saila.bmi}) is higher than ${maila.fullName}'s (${maila.bmi})`,
    );
} else {
    console.log("Both have same BMI");
}

// Coding Exercise 8: CHALLENGE #4
const billings = [325, 745, 889, 234, 123, 432, 213, 1000, 2000, 2032];
const tipping = [];
const totals = [];

for (let i = 0; i < billings.length; i++) {
    let tip = calcTip(billings[i]);
    tipping.push(tip);
    totals.push(billings[i] + tip);
}

console.log(tipping, totals);

const calculateAverage = function (arr) {
    let totalOfArray = 0;
    for (let i = 0; i < billings.length; i++) {
        totalOfArray += arr[i];
    }
    return totalOfArray/arr.length
};

console.log(calculateAverage(billings));
