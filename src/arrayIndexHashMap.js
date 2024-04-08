import optimalShuffle from './fisherYatesShuffle.js';

const SIZE = 100_000;

function generateHash() {
    return Math.random().toString(36).substring(2, 10);
}

function blockArrayFactory() {
    return Array.from({ length: SIZE }, (_, i) => {
        return { id: i + 1, hash: generateHash() };
    });
}

const blocks1 = blockArrayFactory();
optimalShuffle(blocks1);

const standardWay = {
    updateBlock(block) {
        const index = blocks1.findIndex((b) => b.id === block.id);
        if (index !== -1) {
            blocks1[index] = block;
        }
    },
    removeBlock(id) {
        const index = blocks1.findIndex((b) => b.id === id);
        if (index !== -1) {
            blocks1[index] = blocks1.at(-1);
            blocks1.pop();
        }
    },
};

const blocks2 = blockArrayFactory();
optimalShuffle(blocks2);

const blocksHashMap = new Map();
blocks2.forEach((block, index) => {
    blocksHashMap.set(block.id, index);
});

const hashMapWay = {
    updateBlock(block) {
        const index = blocksHashMap.get(block.id);
        if (index !== undefined) {
            blocks2[index] = block;
        }
    },
    removeBlock(id) {
        const index = blocksHashMap.get(id);

        if (index !== undefined) {
            const lastBlock = blocks2.at(-1);
            blocks2[index] = lastBlock;
            blocks2.pop();

            blocksHashMap.set(lastBlock.id, index);
            blocksHashMap.delete(id);
        }
    },
};

const randomIDs = Array.from({ length: SIZE }, (_, i) => i + 1);
optimalShuffle(randomIDs);

const indexCheck = Math.floor(SIZE / 2);

function standardUpdateTest() {
    console.log('[Standard Update Test]');
    console.log('Before update:', blocks1[indexCheck]);
    const start = performance.now();

    randomIDs.forEach((id) => {
        const block = { id, hash: generateHash() };
        standardWay.updateBlock(block);
    });

    const end = performance.now() - start;
    console.log('After update: ', blocks1[indexCheck]);
    console.log(`Execution Time: ${end} ms\n`);

    return end;
}

function standardRemoveTest() {
    console.log('[Standard Remove Test]');
    console.log('Before remove:', blocks1.length);
    const start = performance.now();

    randomIDs.forEach((id) => {
        standardWay.removeBlock(id);
    });

    const end = performance.now() - start;
    console.log('After remove: ', blocks1.length);
    console.log(`Execution Time: ${end} ms\n`);

    return end;
}

function hashMapUpdateTest() {
    console.log('[Hash Map Update Test]');
    console.log('Before update:', blocks2[indexCheck]);
    const start = performance.now();

    randomIDs.forEach((id) => {
        const block = { id, hash: generateHash() };
        hashMapWay.updateBlock(block);
    });

    const end = performance.now() - start;
    console.log('After update: ', blocks2[indexCheck]);
    console.log(`Execution Time: ${end} ms\n`);

    return end;
}

function hashMapRemoveTest() {
    console.log('[Hash Map Remove Test]');
    console.log('Before remove:', blocks2.length);
    const start = performance.now();

    randomIDs.forEach((id) => {
        hashMapWay.removeBlock(id);
    });

    const end = performance.now() - start;
    console.log('After remove: ', blocks2.length);
    console.log(`Execution Time: ${end} ms\n`);

    return end;
}

console.log(`<<Sample size: ${SIZE.toLocaleString('en-GB')} blocks>>\n`);
const standardUpdateTime = standardUpdateTest();
const hashMapUpdateTime = hashMapUpdateTest();
const ud = standardUpdateTime / hashMapUpdateTime;

const standardRemoveTime = standardRemoveTest();
const hashMapRemoveTime = hashMapRemoveTest();
const rd = standardRemoveTime / hashMapRemoveTime;

console.table({
    update: {
        'standard time': +standardUpdateTime.toFixed(0),
        'hashmap time': +hashMapUpdateTime.toFixed(0),
        multiple: +ud.toFixed(0),
    },
    remove: {
        'standard time': +standardRemoveTime.toFixed(0),
        'hashmap time': +hashMapRemoveTime.toFixed(0),
        multiple: +rd.toFixed(0),
    },
});
