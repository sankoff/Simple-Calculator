import calculate, {operators} from '../src/index.js';

const resultView = document.getElementById('result');
const controlsView = document.getElementById('controls');

const state = { result: '0'};

const commands = {
    'C': () => '0',
    '=': () => calculate(state.result).toString(),
};

const isOperator = (token) => operators.includes(token);
const getOperator = () => [...state.result].filter(isOperator).pop();
const isEmptyState = () => state.result === '0';
const isCommand = (token) => Object.keys(commands).includes(token);
const isFullExpression = () => {
    const currentOperator = getOperator();
    return currentOperator && state.result.split(currentOperator).length > 2;
};
const hasOperator = (token) => isOperator(token) && getOperator();

const updateResult = (token) => {
    if (isEmptyState()) {
        return token;
    }
    if (isFullExpression()) {
        return state.result;
    }
    if (isCommand(token)) {
        const doCommands = commands[token];
        return doCommands();
    }
    if (hasOperator(token)) {
        return state.result.replace(getOperator(), token);
    }
    return `${state.result}${token}`;
};

const clickHandler = (event) => {
    const token = event.target.textContent;
    state.result = updateResult(token);
    resultView.textContent = state.result;
};

controlsView.addEventListener('click', clickHandler);