/**
 * @fileoverview How bad are promises for performance?
 * Lets find out. :D
 */

/**
 * Test 1 - Recursive Fibonacci.
 *
 * Using a recursive function as a test case here means we will get a compounding overhead from
 * the promises. This result will show us a relatively worse case example.
 *
 * While this is an unrealistic case, it shows that promises can significantly impact performance.
 */
function fibRecursiveNormal(n) {
    if (n <= 1) {
        return n;
    }

    return fibRecursiveNormal(n - 1) + fibRecursiveNormal(n - 2);
}

async function fibRecursivePromises(n) {
    if (n <= 1) {
        return n;
    }

    return (await fibRecursivePromises(n - 1)) + (await fibRecursivePromises(n - 2));
}

/**
 * Test 2 - Non-Recursive Fibonacci.
 *
 * This will show the sort of overhead of a low-cost method call to get a more real-world example.
 * Each function call will only have the overhead of a single promise.
 */
function fibNormal(num) {
    let a = 1;
    let b = 0;
    let temp;

    while (num >= 0) {
        temp = a;
        a = a + b;
        b = temp;
        num--;
    }

    return b;
}

async function fibPromise(num) {
    let a = 1;
    let b = 0;
    let temp;

    while (num >= 0) {
        temp = a;
        a = a + b;
        b = temp;
        num--;
    }

    return b;
}

/**
 * Test 3 - Promise vs Async/Await.
 *
 * What if we use promises directly?
 */
function fibPromDirect(num) {
    return new Promise((resolve) => {
        let a = 1;
        let b = 0;
        let temp;

        while (num >= 0) {
            temp = a;
            a = a + b;
            b = temp;
            num--;
        }

        resolve(b);
    });
}

/**
 * Performance tester.
 * @param {function} func The function to run.
 */
async function run(func, isPromise = false) {
    const SIZE = 30; // Seems to be the limit before they take too long (exponential).
    const start = performance.now();

    if (isPromise) {
        for (let i = 0; i < SIZE; i++) {
            await func.apply(null, [i]);
        }
    } else {
        for (let i = 0; i < SIZE; i++) {
            func.apply(null, [i]);
        }
    }

    const end = performance.now() - start;
    console.log(`${func.name}: ${end.toFixed(2)} ms`);

    return end;
}

async function main() {
    const fibRecNormTime = await run(fibRecursiveNormal);
    const fibRecPromTime = await run(fibRecursivePromises, true);
    console.log(
        `\x1b[32mRecursive: Promises are ${(fibRecPromTime / fibRecNormTime).toFixed(2)} times slower than normal.\x1b[0m\n`,
    );

    const fibNormTime = await run(fibNormal);
    const fibPromTime = await run(fibPromise, true);
    console.log(
        `\x1b[32mNon-Recursive: Promises are ${(fibPromTime / fibNormTime).toFixed(2)} times slower than normal.\x1b[0m\n`,
    );

    const fibPromTime2 = await run(fibPromise, true);
    const fibPromDirectTime = await run(fibPromDirect, true);
    console.log(
        `\x1b[32mNon-Recursive: Promises are ${(fibPromDirectTime / fibPromTime2).toFixed(2)} times slower than normal.\x1b[0m`,
    );
}

main();
