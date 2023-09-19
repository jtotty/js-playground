const { optimalShuffle } = require('./fisherYatesShuffle.js');

const SIZE = 10_000;

function normalShuffle() {
    const start = performance.now();

    const arr = [];
    while (arr.length < SIZE) {
        const r = Math.floor(Math.random() * SIZE) + 1;
        if (arr.indexOf(r) === -1) {
            arr.push(r);
        }
    }

    const end = performance.now() - start;
    // console.log(`Normal shuffle took ${end} ms`);

    return end;
}

function shouldBeFaster() {
    const start = performance.now();

    const arr = Array.from({ length: SIZE }, (_, i) => i + 1);
    optimalShuffle(arr);

    const end = performance.now() - start;
    // console.log(`Fisher Yates shuffle took ${end} ms`);

    return end
}

normalShuffle();
shouldBeFaster();

const normalShuffleTimes = [];
const shouldBeFasterTimes = [];

const TRIES = 100;
for (let i = 0; i < TRIES; i++) {
    normalShuffleTimes.push(normalShuffle());
    shouldBeFasterTimes.push(shouldBeFaster());
}

const normalAvg = normalShuffleTimes.reduce((acc, curr) => acc + curr, 0) / TRIES;
const fasterAvg = shouldBeFasterTimes.reduce((acc, curr) => acc + curr, 0) / TRIES;

console.log(`Normal shuffle average: ${normalAvg} ms`);
console.log(`Fisher Yates shuffle average: ${fasterAvg} ms`);
