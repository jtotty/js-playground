/**
 * Fisher–Yates Shuffle
 * https://bost.ocks.org/mike/shuffle/
 */

/**
 * One slow option—gotta start somewhere: pick a random element from the array (in [0, n - 1])
 * and then check if you’ve shuffled that element already. This works, but it becomes increasingly slow
 * as the remaining elements dwindle; you’ll keep randomly picking elements that have already been shuffled.
 */
function shuffle1(array) {
    const copy = [];
    let n = array.length;
    let i;

    while (n) {
        i = Math.floor(Math.random() * array.length);

        if (i in array) {
            copy.push(array[i]);
            delete array[i];
            n--;
        }
    }

    return copy;
}

/**
 * You can avoid duplicate selection by picking only remaining elements:
 * pick a random number in the range [0, m - 1], where m starts at n and decreases by one with each iteration.
 * In other words, m represents the number of remaining cards to shuffle. Compact the remaining deck as you move cards
 * so that you can easily pick out the next card for shuffling.
 */
function shuffle2(array) {
    const copy = [];
    let n = array.length;
    let i;

    while (n) {
        i = Math.floor(Math.random() * n--);
        copy.push(array.splice(i, 1)[0]);
    }

    return copy;
}

/**
 * The best way to implement the Fisher–Yates shuffle.
 */
function optimalShuffle(array) {
    let m = array.length;
    let t;
    let i;

    while (m) {
        // Pick a remaining element
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
}

function blockArrayFactory() {
    return Array.from({ length: 1_000_000 }, (_, i) => {
        return { id: i, hash: Math.random().toString(36).substring(2, 10) };
    });
}

function run() {
    const blocks1 = blockArrayFactory();
    const blocks2 = blockArrayFactory();
    const blocks3 = blockArrayFactory();

    for (let i = 1; i < 4; i++) {
        const start = performance.now();

        switch (i) {
            case 1:
                shuffle1(blocks1);
                break;
            case 2:
                shuffle2(blocks2);
                break;
            case 3:
                optimalShuffle(blocks3);
                break;
        }

        const end = performance.now() - start;
        console.log(`shuffle${i}: ${end} ms`);
    }
}

// run();

module.exports = { optimalShuffle };
