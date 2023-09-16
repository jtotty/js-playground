const { EventEmitter } = require('events');
const { optimalShuffle } = require('./fisherYatesShuffle');

/**
 * You can sort an array using `setTimeout` due to the async nature of JS.
 * This is really dumb and would not recommend at all, but intersting nevertheless.
 */
const SIZE = 100;

// setTimeout has a minimum delay of 4ms, so we need to offset the timer
// for values less than 4. I'll use 10 to be safe and it's a nice round number.
const TIMER_OFFSET = 10;

function run() {
    const arr = Array.from({ length: SIZE }, (_, i) => i);
    const totalTime = arr.reduce((acc, item) => acc + item + TIMER_OFFSET, 0);
    optimalShuffle(arr);
    console.log(arr);

    let elapsedTime = 0;
    const sortedArr = [];

    const eventEmitter = new EventEmitter();
    eventEmitter.on('sorted:finished', () => {
        console.log(sortedArr);
    });

    arr.forEach((item) => {
        setTimeout(() => {
            sortedArr.push(item);
            elapsedTime += item + TIMER_OFFSET;

            if (elapsedTime >= totalTime) {
                console.log('Finished sorting!');
                eventEmitter.emit('sorted:finished');
            }
        }, item + TIMER_OFFSET);
    });

    console.log('\nSorting...\n');
}

run();
