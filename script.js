// to do: once a result is displayed, entering any new numbers should clear the display

const display = document.getElementById('display');
const allButtons = document.querySelectorAll('.number, .operator'); //select all nodes with number and operator class
// let resultDisplayed = false;

function init() {
    const validKeys = '0123456789./*+-'
    //console.log("allButtons: ", allButtons);
    // display.textContent = "Keyboard supported"
    allButtons.forEach(btn => {
        btn.addEventListener('click', (event) => {
            if (validKeys.includes(event.target.textContent)) {
                display.textContent += btn.textContent;
            }
            if (event.target.textContent == '=' || event.target.textContent == '+' || event.target.textContent == '-' || event.target.textContent == '*' || event.target.textContent == '/') {
                calculate(event.target.textContent);
            };
        });
    });
    //adding keyboard support
    addEventListener('keydown', (event) => {
        // console.log("Key pressed: ", event, event.key);
        if (validKeys.includes(event.key)) {
            display.textContent += event.key;
        };
        if (event.key == 'Enter' || event.key == '+' || event.key == '-' || event.key == '*' || event.key == '/') {
            calculate(event.key);
        };
        if (event.key == 'Backspace') {
            display.textContent = display.textContent.slice(0, -1); //remaining string will contain starting character (0) all the way to the penultimate character (-1)
        };
    });
};
init();

function calculate(operator = 'Enter') { //Enter is the default argument
    const operators = { "/": divide, "*": multiply, "-": subtract, "+": add };
    let strSplit = "";
    let strClean = "";
    for (const key in operators) {
        if (display.textContent.includes(key)) {
            if (display.textContent.charAt(0) == "-") {
                // console.log("neg at index 0 found");
                strClean = display.textContent.slice(1, -1);
                strSplit = strClean.split(key);
                strSplit[0] = '-' + strSplit[0];
            }
            else {
                strClean = display.textContent.slice(0, -1);
                strSplit = strClean.split(key);
            }
            if (operator != 'Enter') {
                //error handling for only calculating result when two numbers and an operator are present
                let strHasNaN = false;
                for (i = 0; i < 2; i++) {
                    //if anything other than numbers are detected then don't calculate anything
                    if (isNaN(parseInt(strSplit[i]))) {
                        console.log("NAN");
                        strHasNaN = true;
                        break;
                    }
                }
                if (!strHasNaN) {
                    // console.log(operators[key]);
                    operators[key](Number(strSplit[0]), Number(strSplit[1]), operator); //calling the appropriate DMAS function
                }
            }
            else {
                if (display.textContent.charAt(0) == "-") {
                    strClean = display.textContent.slice(1);
                    strSplit = strClean.split(key);
                    strSplit[0] = '-' + strSplit[0];
                }
                else {
                    strSplit = display.textContent.split(key);
                }
                // console.log(strSplit);
                //error handling for only calculating result when two numbers and an operator are present
                let strHasNaN = false;
                for (i = 0; i < 2; i++) {
                    //if anything other than numbers are detected then don't calculate anything
                    if (isNaN(parseInt(strSplit[i]))) {
                        console.log("NAN");
                        strHasNaN = true;
                        break;
                    }
                }
                if (!strHasNaN) {
                    // console.log(operators[key]);
                    operators[key](Number(strSplit[0]), Number(strSplit[1]), ''); //calling the appropriate DMAS function
                }
            }
        }
    }
};

function clearDisplay() {
    display.textContent = '';
    window.location.reload(); //if the keyboard is used after pressing the clear button, then the webapp seems to automatically be fixated on the clear button such that it doesnt enable populating the display with the result
};

function del() {
    display.textContent = display.textContent.slice(0, -1); //remaining string will contain starting character (0) all the way to the penultimate character (-1)
}

function add(a, b, c) {
    display.textContent = a + b + `${c}`;
};

function subtract(a, b, c) {
    display.textContent = a - b + `${c}`;
};

function multiply(a, b, c) {
    display.textContent = (a * b) + `${c}`;
};

function divide(a, b, c) {
    display.textContent = (a / b) + `${c}`;
};
