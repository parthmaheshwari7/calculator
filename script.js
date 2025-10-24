const display = document.getElementById('display');
const allButtons = document.querySelectorAll('.number, .operator');
function init() {
    // console.log("allButtons: ", allButtons);
    allButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            display.textContent += btn.textContent;
        });
    })
};
init();

function clearDisplay() {
    display.textContent = "";
};

function calculate() {
    // console.log("display: ", display.textContent.match(/(\d+)\s*([+\-*/])\s*(\d+)/));
    const operators = { "/": divide, "x": multiply, "-": subtract, "+": add };
    for (const key in operators) {
        if (display.textContent.includes(key)) {
            let strSplit = display.textContent.split(key);
            console.log(strSplit);
            console.log(operators[key]);
            let operator = operators[key];
            operator(Number(strSplit[0]), Number(strSplit[1]));
            break;
        }
    }

};

function add(a, b) {
    display.textContent = a + b;
};

function subtract(a, b) {
    display.textContent = a - b;
};

function multiply(a, b) {
    display.textContent = (a * b).toFixed(2);
};

function divide(a, b) {
    display.textContent = (a / b).toFixed(2);
};

