setTimeout(() => console.log(1));

(async () => {
    console.log(2);
    await Promise.resolve();
    console.log(3);
})();

Promise.resolve().then(() => {
    Promise.resolve().then(() => console.log(4));
});

/*
    [Call Stack]             | {Event Loop} => [Microtask Queue] [Macrotask Queue]
    setTimeout                                                   console.log(1)
    async () =>
    console.log(2)
    await Promise.resolve()                    console.log(3)
    Promise.resolve()
    then()                                     () => Promise.resolve()
    <<nothing left - prioritises microtask queue>>

    console.log(3)
    Promise.resolve()
    then()                                     () => console.log(4)
    <<nothing left - prioritises microtask queue>>

    console.log(4)
    <<noting left - microtask queue empty - run macrotask queue>>

    console.log(1)
*/

/*
    2
    3
    4
    1
*/
