#!usr/bin/env node
import readlineSync from 'readline-sync';
import calculate from '../src/index.js';

const state = {result: 0 };

const command = {
    _: (input) => {
        state.result = calculate(input, state.result);
        console.log(`= ${state.result}`);
    },
    clear: () => {
        state.result = 0;
    },
    result: () => console.log(`= ${state.result}`),
    exit: () => true,
};

console.log('Welcome to Calculator');
readlineSync.promptCLLoop(command);
console.log('GoodBye');
