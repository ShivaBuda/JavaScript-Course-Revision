"use strict";
// Dummy DATA
const account1 = {
    owner: "Shiv Bhai",
    movement: [100, -500, 4000, 100, -45, -34, 60, -100, 800],
    interestRate: 1.5,
    pin: 1111,
    movementsDates: [
        "2019-11-18T21:31:17.178Z",
        "2019-12-23T07:42:02.383Z",
        "2020-01-28T09:15:04.904Z",
        "2020-04-01T10:17:24.185Z",
        "2020-05-08T14:11:59.604Z",
        "2020-07-26T17:01:17.194Z",
        "2020-07-28T23:36:17.929Z",
        "2024-07-15T10:51:36.790Z",
        "2024-07-15T10:51:36.790Z",
    ],
    currency: "NRS",
    locale: "ne-NP",
};
const account2 = {
    owner: "Kale Dai",
    movement: [100, -50, 4000, 100, -45, -34, 60, -100],
    interestRate: 0.9,
    pin: 2222,
    movementsDates: [
        "2019-11-18T21:31:17.178Z",
        "2019-12-23T07:42:02.383Z",
        "2020-01-28T09:15:04.904Z",
        "2020-04-01T10:17:24.185Z",
        "2020-05-08T14:11:59.604Z",
        "2020-07-26T17:01:17.194Z",
        "2020-07-28T23:36:17.929Z",
        "2024-07-15T10:51:36.790Z",
    ],
    currency: "USD",
    locale: "en-US",
};
const account3 = {
    owner: "Fuchche Keta",
    movement: [100, -50, 4000, 100, -45, -34, 60, -100],
    interestRate: 1.2,
    pin: 3333,
    movementsDates: [
        "2019-11-18T21:31:17.178Z",
        "2019-12-23T07:42:02.383Z",
        "2020-01-28T09:15:04.904Z",
        "2020-04-01T10:17:24.185Z",
        "2020-05-08T14:11:59.604Z",
        "2020-07-26T17:01:17.194Z",
        "2020-07-28T23:36:17.929Z",
        "2024-07-15T10:51:36.790Z",
    ],
    currency: "SGD",
    locale: "en-US",
};
const account4 = {
    owner: "Tamane Kanchha",
    movement: [100, -50, 4000, 100, -45, -34, 60, -100],
    interestRate: 1.0,
    pin: 4444,
    movementsDates: [
        "2019-11-18T21:31:17.178Z",
        "2019-12-23T07:42:02.383Z",
        "2020-01-28T09:15:04.904Z",
        "2020-04-01T10:17:24.185Z",
        "2020-05-08T14:11:59.604Z",
        "2020-07-26T17:01:17.194Z",
        "2020-07-28T23:36:17.929Z",
        "2024-07-15T10:51:36.790Z",
    ],
    currency: "SGD",
    locale: "en-US",
};

const accounts = [account1, account2, account3, account4];

// SELECT DOM ELEMENTS
// Login DOM elements
const welcomeEl = document.querySelector(".welcome");
const btnLoginEl = document.querySelector(".btn-login");
const userNameEl = document.querySelector(".userName");
const pinEl = document.querySelector(".pin");
const mainContainerEl = document.querySelector(".main-container");

// Movement DOM elements
const movementEl = document.querySelector(".movements__lists");
const balanceEl = document.querySelector(".balance__amount");
const btnSortEl = document.querySelector(".btn-sort");
const dateEl = document.querySelector(".balance__date-time");

// Summary DOM elements
const summaryInEl = document.querySelector(".summary__in-value");
const summaryOutEl = document.querySelector(".summary__out-value");
const summaryInterestEl = document.querySelector(".summary__interest-value");

// Transfer DOM elements
const inputTransferNameEl = document.querySelector(".input__transfer-to");
const inputTransferAmountEl = document.querySelector(".input__transfer-amount");
const btnTransferEl = document.querySelector(".btn-transfer");

// Request loan DOM elements
const inputLoanEl = document.querySelector(".input__loan");
const btnLoanEl = document.querySelector(".btn-loan");

// Close Account DOM elements
const inputCloseUserEl = document.querySelector(".input__close-user");
const inputClosePinEl = document.querySelector(".input__close-pin");
const btnCloseEl = document.querySelector(".btn-close");

// Logout Timer DOM element
const logoutEl = document.querySelector(".logout-timer__value");

// FUNCTIONS
// Creates user name
function createUserName(accs) {
    accs.forEach((acc) => {
        acc.userName = acc.owner
            .toLowerCase()
            .split(" ")
            .map((user) => user[0])
            .join("");
    });
}
createUserName(accounts);

// Days calculator
function calcDays(date1, date2) {
    return Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
}

// Formate date
/*function formateDate(date) {
    const day = `${date.getDate()}`.padStart(2, 0);
    const month = `${date.getMonth() + 1}`.padStart(2, 0);
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}*/

function intlDateFormater(options, locale, date) {
    return new Intl.DateTimeFormat(locale, options).format(date);
}

// Formate currency
function intlCurrencyFormater(locale, currency, value) {
    const options = {
        style: "currency",
        currency: currency,
    };
    return new Intl.NumberFormat(locale, options).format(value);
}

// Current balance calculater and display
function calcDisplayBalance(acc) {
    // Show date
    const date = new Date();
    /*
    const hour = `${date.getHours()}`.padStart(2, 0);
    const minute = `${date.getMinutes()}`.padStart(2, 0);
    const currentDate = `${formateDate(date)}, ${hour}:${minute}`;*/
    const options = {
        hour: "numeric",
        minute: "numeric",
        day: "numeric",
        month: "short",
        year: "numeric",
        hourCycle: "h12",
    };
    const locale = acc.locale;
    // const currentDate = new Intl.DateTimeFormat(locale, options).format(date);

    const currentDate = intlDateFormater(options, locale, date);

    dateEl.textContent = currentDate;

    // Show current account balance
    acc.balance = acc.movement.reduce((accu, mov) => accu + mov, 0);

    balanceEl.textContent = intlCurrencyFormater(
        acc.locale,
        acc.currency,
        acc.balance,
    );
}

// Logout Timer function
const countDownTimer = () => {
    const tick = function () {
        let minute = String(Math.trunc(time / 60)).padStart(2, 0);
        let second = String(time % 60).padStart(2, 0);

        logoutEl.textContent = `${minute}:${second}`;

        if (time === 0) {
            welcomeEl.textContent = "Log in to get started";
            mainContainerEl.classList.add("hidden");
            clearTimeout(logoutTimer);
            console.log(time);
        }
        time--;
    };

    let time = 600;
    tick();
    const logoutTimer = setInterval(tick, 1000);
    return logoutTimer;
};

// Display transactions on UI
function displayTransaction(acc, sort = false) {
    movementEl.innerHTML = "";

    const movsDates = acc.movement.map((mov, i) => ({
        movement: mov,
        movDate: acc.movementsDates.at(i),
    }));

    if (sort) movsDates.sort((a, b) => a.movement - b.movement);
    // const sortMovs = sort
    //     ? acc.movement.slice().sort((a, b) => a - b)
    //     : acc.movement;
    function dateType(dayPassed, movDate) {
        let displayDate;
        if (dayPassed === 0) return (displayDate = "Today");
        if (dayPassed === 1) return (displayDate = "Yesterday");
        if (dayPassed <= 7) return (displayDate = `${dayPassed} days ago`);
        else {
            const date = new Date(movDate);
            const options = {
                day: "numeric",
                month: "short",
                year: "numeric",
            };
            // return (displayDate = formateDate(movDate));
            const locale = acc.locale;
            return (displayDate = intlDateFormater(options, locale, date));
        }
    }

    movsDates.forEach((obj, i) => {
        const {movement, movDate} = obj;
        const date = new Date();
        const movDates = new Date(movDate);

        const dayPassed = calcDays(movDates, date);
        let displayDate = dateType(dayPassed, movDates);

        const movementValue = intlCurrencyFormater(
            acc.locale,
            acc.currency,
            movement,
        );

        let type = movement < 0 ? "withdrawl" : "deposit";
        let html = ` <li class="movements__itm">
                            <span class="movements__type movements__${type}">${
            i + 1
        } ${type}</span>
                            <span class="movements__date">${displayDate}</span>
                            <span class="movements__value">${movementValue}</span>
                        </li>`;
        movementEl.insertAdjacentHTML("afterbegin", html);
    });
}

// Summary calculater and display
function calcSummaryIn(acc) {
    // Deposit
    const moveIn = acc.movement
        .filter((mov) => mov > 0)
        .reduce((accu, mov) => accu + mov);
    summaryInEl.textContent = intlCurrencyFormater(
        acc.locale,
        acc.currency,
        moveIn,
    );
    // Withdrawl
    const moveOut = acc.movement
        .filter((mov) => mov < 0)
        .reduce((accu, mov) => accu + mov);
    summaryOutEl.textContent = intlCurrencyFormater(
        acc.locale,
        acc.currency,
        moveOut,
    );

    // Interest
    const totalInterest = acc.movement
        .filter((mov) => mov > 0)
        .map((mov) => (mov * acc.interestRate) / 100)
        .reduce((accu, interest) => accu + interest, 0);

    summaryInterestEl.textContent = intlCurrencyFormater(
        acc.locale,
        acc.currency,
        totalInterest,
    );
}
function updateUI(acc) {
    // Show current balance
    calcDisplayBalance(acc);
    // Show Transations
    displayTransaction(acc);
    // Show summary
    calcSummaryIn(acc);
}

// EVENT HANDLER FUNCTIONS
//Login Event
let currentAccount, timer;
function login() {
    // Get user account
    currentAccount = accounts.find((acc) => acc.userName === userNameEl.value);
    const userFirstName = currentAccount.owner.split(" ")[0];

    if (
        currentAccount?.userName === userNameEl.value &&
        currentAccount.pin === +pinEl.value
    ) {
        // UPDATE UI

        welcomeEl.textContent = `Welcome! ${userFirstName}`;
        // console.log(currentAccount);
        mainContainerEl.classList.remove("hidden");
        // Clear input
        userNameEl.value = pinEl.value = "";
        pinEl.blur();

        if (timer) clearInterval(timer);
        timer = countDownTimer();

        updateUI(currentAccount);
    }
}

// TRANSFER OPERATION
function fundTransfer() {
    const fund = +inputTransferAmountEl.value;
    const receivingAcc = accounts.find(
        (acc) => acc.userName === inputTransferNameEl.value,
    );
    if (
        fund > 0 &&
        receivingAcc &&
        currentAccount.balance >= fund &&
        receivingAcc?.userName !== currentAccount.userName
    ) {
        receivingAcc.movement.push(fund);
        currentAccount.movement.push(-fund);

        // Transfer date
        receivingAcc.movementsDates.push(new Date().toISOString());
        currentAccount.movementsDates.push(new Date().toISOString());

        inputTransferNameEl.value = inputTransferAmountEl.value = "";

        // Update UI
        updateUI(currentAccount);

        // Clear timer
        clearInterval(timer);
        timer = countDownTimer();
        // console.log(receivingAcc, fund);
    }
}
// Request Loan
function requestLoan() {
    const loan = +inputLoanEl.value;
    inputLoanEl.value = "";
    if (
        loan >= 100 &&
        currentAccount.movement.some((mov) => mov >= loan * 0.1)
    ) {
        currentAccount.movement.push(loan);
        currentAccount.movementsDates.push(new Date().toISOString());

        // Update UI
        updateUI(currentAccount);

        clearInterval(timer);
        timer = countDownTimer();
    }
}

// Close account
function closeAccount() {
    if (
        currentAccount.userName === inputCloseUserEl.value &&
        currentAccount.pin === +inputClosePinEl.value
    ) {
        const index = accounts.findIndex(
            (acc) => acc.userName === inputCloseUserEl,
        );
        accounts.splice(index, 1);
        inputClosePinEl.value = inputCloseUserEl.value = "";
        mainContainerEl.classList.add("hidden");
        console.log(typeof +inputClosePinEl.value);
    }
}

// EVENT HANDLES
btnLoginEl.addEventListener("click", (e) => {
    e.preventDefault();
    login();
});

btnTransferEl.addEventListener("click", (e) => {
    e.preventDefault();
    fundTransfer();
});

btnLoanEl.addEventListener("click", (e) => {
    e.preventDefault();
    requestLoan();
});

btnCloseEl.addEventListener("click", (e) => {
    e.preventDefault();
    closeAccount();
});

let sorted = false;
btnSortEl.addEventListener("click", (e) => {
    e.preventDefault();
    displayTransaction(currentAccount, !sorted);
    sorted = !sorted;
});

// NOTES TO DEVELOP
// if user is signed in must log out before log in to another accout
// add log out function
// remove user and pin input after login
// Show msg if input/s is/are incorrect

// const allMovements = accounts
//     .map((acc) => acc.movement)
//     .flat()
//     .filter((mov) => mov > 0)
//     .reduce((acc, mov) => acc + mov);
// console.log(allMovements);
