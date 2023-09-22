interface NumberWithLogs {
    result: number;
    logs: string[];
}

function wrapInLogs(x: number): NumberWithLogs {
    return {
        result: x,
        logs: [],
    }
}

function runWithLogs(input: NumberWithLogs, transform: (_: number) => NumberWithLogs): NumberWithLogs {
    const newNumberWithLogs = transform(input.result);

    return {
        result: newNumberWithLogs.result,
        logs: input.logs.concat(newNumberWithLogs.logs),
    };
}

function square(x: number): NumberWithLogs {
    return {
        result: x * x,
        logs: [`Squared ${x} to get ${x * x}.`],
    };
}

function addOne(x: number): NumberWithLogs {
    return {
        result: x + 1,
        logs: [`Added 1 to ${x} to get ${x + 1}.`],
    };
}

const a = wrapInLogs(5);
const b = runWithLogs(a, addOne);
const c = runWithLogs(b, square);

/////////////////

interface Option<T> {
    value: T;
    hasValue: boolean;
}

function some<T>(x: T): Option<T> {
    return {
        value: x,
        hasValue: true,
    };
}

function run<T>(input: Option<T>, transform: (_: T) => Option<T>): Option<T> {
    if (!input.hasValue) {
        return input;
    }

    return transform(input.value);
}
