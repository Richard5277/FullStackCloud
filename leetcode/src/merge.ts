// Merge Sort
function merge(a1: number[], a2: number[]): number[] {
    // Merge Sorted Arrays — Two‑pointer technique
    const result: number[] = [];
    let i = 0, j = 0;

    while (i < a1.length && j < a2.length) {
        if (a1[i] < a2[j]) {
            result.push(a1[i]);
            i++;
        } else {
            result.push(a2[j]);
            j++;
        }
    }

    // Push any remaining elements from either array
    return result.concat(a1.slice(i)).concat(a2.slice(j));
}

const result = merge([1, 3, 5], [2, 4, 6]); // Example usage
console.log('result -> ',result);

// sort & merge
function mergeSafe(a1: number[], a2: number[]): number[] {
    // 先排序确保正确性
    const sorted1 = [...a1].sort((a, b) => a - b);
    const sorted2 = [...a2].sort((a, b) => a - b);
    // 然后使用相同的合并逻辑
    return merge(sorted1, sorted2);
}
const r2 = mergeSafe([5, 3, 1], [6, 4, 2]); // Example usage
console.log('r2 -> ', r2);
