const maths = {
'+': (a, b) => a + b,
'-': (a, b) => a - b,
'*': (a, b) => a * b,
'/': (a, b) => a / b,
};

export const operators = Object.keys(maths);

const isOperator = (operator) => operators.includes(operator);
const isNumber = (num) => typeof num === 'number' && !Number.isNaN(num);
const isNumbers = (nums) => nums.every(isNumber);
const isValid = (left, right, operator) => isNumbers([left, right]) && isOperator(operator);
const isNotValid = (...args) => !isValid(...args);

const calculate = (left, right, operator) => {
    if (isNotValid(left,right,operator)) {
        return NaN;
    };
    const math = maths[operator];
    return math(left, right);
};

const parse = (expression) => {
    const clearExression = expression.replace(' ','');
    const hasOperator = (operator) => clearExression.includes(operator);
    const [currentOperator] = operators.filter(hasOperator);
    const operands = clearExression.split(currentOperator);

    if (operands.length === 1) {
        const [right] = operands;
        return [NaN, parseFloat(right), currentOperator];
    }

    const [left, right] = operands;
    return [parseFloat(left), parseFloat(right), currentOperator];
};

export default (expression, acc = 0) => {
    const [left, right, operator] = parse(expression);
    const leftOrAcc = Number.isNaN(left) ? acc : left;
    return calculate(left, right, operator);
};