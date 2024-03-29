const displayHistory = document.querySelector(".display-history");
const displayInput = document.querySelector(".display-input");
const tempResult = document.querySelector(".temp-result");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const equal = document.querySelector(".equal");
const clearAll = document.querySelector(".all-clear");
const clearLast = document.querySelector(".last-entity-clear");

let dis1Num = '';
let dis2Num = '';
let result = null;
let lastOperation = '';
let haveDot = false;

numbers.forEach(number => {
    number.addEventListener("click", (e) => {
        if (e.target.innerText === '.' && !haveDot) {
            haveDot = true;
        } else if (e.target.innerText === '.' && haveDot) {
            return;
        }
        dis2Num += e.target.innerText;
        displayInput.innerText = dis2Num;
    })
});

operations.forEach(operation => {
    operation.addEventListener("click", (e) => {
        if (!dis2Num) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if (dis1Num && dis2Num && lastOperation) {
            mathOperation();
        } else {
            result = parseFloat(dis2Num);
        }
        clearVar(operationName);
        lastOperation = operationName;
    })
});

function clearVar(name = '') {
    dis1Num += dis2Num + " " + name + " ";
    displayHistory.innerText = dis1Num;
    displayInput.innerText = '';
    dis2Num = '';
    tempResult.innerText = result;
}

function mathOperation() {
    if (lastOperation === 'X') {
        result = parseFloat(result) * parseFloat(dis2Num);
    } else if (lastOperation === '-') {
        result = parseFloat(result) - parseFloat(dis2Num);
    } else if (lastOperation === '+') {
        result = parseFloat(result) + parseFloat(dis2Num);
    } else if (lastOperation === '/') {
        result = parseFloat(result) / parseFloat(dis2Num);
    } else if (lastOperation === '%') {
        result = parseFloat(result) % parseFloat(dis2Num);
    }
}

equal.addEventListener("click", () => {
    if (!dis1Num || !dis2Num) return;
    haveDot = false;
    mathOperation();
    clearVar();
    displayInput.innerText = result;
    tempResult.innerText = '';
    dis2Num = result;
    dis1Num = '';
})

clearAll.addEventListener("click", () => {
    displayInput.innerText = '0';
    displayHistory.innerText = '0';
    tempResult.innerText = '0';
    dis1Num = '';
    dis2Num = '';
    result = '';
    haveDot = false;
    lastOperation = '';
})

clearLast.addEventListener("click", () => {
    if (tempResult.innerText === '' || tempResult.innerText === null) {
        clearAll.click();
        return;
    }

    let lastChar = dis2Num[dis2Num.length - 1];
    if (lastChar === ".") haveDot = false;


    if (dis2Num.length <= 1) {
        displayInput.innerText = '0';
        dis2Num = '';
        haveDot = false;
        return;
    }
    1
    dis2Num = dis2Num.substring(0, dis2Num.length - 1);
    displayInput.innerText = dis2Num;

})

window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") clearAll.click();
    if (e.key === "Backspace") clearLast.click();
    if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") clickOperation(e.key);
    if (e.key === "*") clickOperation("X");
    if (e.key === ".") clickNumber(e.key);
    if (e.key >= 0 && e.key <= 9) clickNumber(e.key);
    if (e.key === "Enter" || e.key === "=") equal.click();
})

function clickNumber(key) {
    numbers.forEach(number => {
        if (number.innerText === key) {
            number.click();
        }
    })
}
function clickOperation(key) {
    operations.forEach(operation => {
        if (operation.innerText === key) {
            operation.click();
        }
    })
}


