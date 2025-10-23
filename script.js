const display = document.getElementById('display');
const allButtons = document.querySelectorAll('.number, .operator');
function init() {
    console.log("allButtons: ", allButtons);
    allButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            display.textContent += btn.textContent;
        });
    })
};
init();

function clearDisplay(){
    display.textContent = "";
}

