function getNote(L, B) {
    let msg = L[0]; // starting letter L[0]
    let recipient = B[0]; // first recipient B[0]-th person

    while (recipient !== 0) {
        msg += L[recipient];
        recipient = B[recipient];
    }

    return msg;
}

const code1 = 'cdeo';
const players1 = [3, 2, 0, 1];
const solution1 = getNote(code1, players1);
console.log(solution1);

const code2 = 'cdeenetpi';
const players2 = [5, 2, 0, 1, 6, 4, 8, 3, 7];
const solution2 = getNote(code2, players2);
console.log(solution2);

const code3 = 'bytdag';
const players3 = [4, 3, 0, 1, 2, 5];
const solution3 = getNote(code3, players3);
console.log(solution3);

const code4 = 'sptma';
const players4 = [2, 0, 4, 1, 3];
const solution4 = getNote(code4, players4);
console.log(solution4);

const code5 = 'stpma';
const players5 = [1, 4, 0, 2, 3];
const solution5 = getNote(code5, players5);
console.log(solution5);
