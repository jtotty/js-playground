/**
 * No recurssion required. This should be the fastest.
 */
function fibNoRecursion(n) {
    let a = 1;
    let b = 0;
    let temp;

    while (n > 0) {
        temp = a;
        a = a + b;
        b = temp;
        n--;
    }

    return b;
}

/**
 * Standard recursive fibbonaci example every student is taught.
 * Every blogger copying each other with this example and getting it wrong... JFC.
 */
const cache = new Map();
function fibRecursive(n) {
    if (cache.has(n)) {
        return cache.get(n);
    }

    if (n <= 1) {
        cache.set(n, n);
        return n;
    }

    const result = fibRecursive(n - 1) + fibRecursive(n - 2);
    cache.set(n, result);

    return result;
}

// const Memoizer = (() => {
//    const cache = {};

//     function run(func)  {
//         // Closures do not inherit an outer function’s arguments object
//         return ((...args) => {
//             // Can handle any number of arguments
//             const key = JSON.stringify(args);

//             if (cache[key]) {
//                 return cache[key];
//             }

//             const val = func.apply(this, args);
//             cache[key] = val;

//             return val;
//         });
//     }

//     return { cache, run }
// })();

class Memoizer {
    constructor() {
        // Map is more performant than an object for this use case.
        // https://www.zhenghao.io/posts/object-vs-map
        this.cache = new Map();
    }

    run(func) {
        // Closures do not inherit an outer function’s arguments object
        // Can now access the arguments array of the function that is passesd as a parameter
        // Basically taking advantage of JS limitations
        return (...args) => {
            // Can handle any number of arguments
            const key = JSON.stringify(args);

            if (this.cache.has(key)) {
                return this.cache.get(key);
            }

            const result = func.apply(this, args);
            this.cache.set(key, result);

            return result;
        };
    }
}

const memoizer = new Memoizer();
const fibMemo = memoizer.run((n) => {
    if (n <= 1) {
        return n;
    }

    return fibMemo(n - 1) + fibMemo(n - 2);
});

function run(func) {
    const N = 40;

    const start = performance.now();
    const result = func.apply(null, [N]);
    const end = performance.now() - start;

    const name = func.name || 'fibRecursiveMemo';
    console.log(`${name}: ${end.toFixed(5)} ms`);

    return result;
}

const nonRecursive = run(fibNoRecursion);
const recursive = run(fibRecursive);
const recursiveMemo = run(fibMemo);

console.log('\nCheck all results are the same:');
console.log({
    nonRecursive,
    recursive,
    recursiveMemo,
    'all-equal': (() => {
        const set = new Set([nonRecursive, recursive, recursiveMemo]);
        return set.size === 1;
    })(),
});

// console.log('\nCheck memoization cache is actually being populated:');
// console.log(cache);
// console.log(memoizer.cache);
