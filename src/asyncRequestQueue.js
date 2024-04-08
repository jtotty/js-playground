export default async function requestQueue(requests) {
    const queue = [...requests];
    const results = [];

    while (queue.length) {
        const current = queue.shift();

        try {
            const result = await current;
            results.push(result);
        } catch (error) {
            throw new Error(error);
        }
    }

    return results;
}
