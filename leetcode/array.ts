//Remove Duplicates — Array manipulation
//Set 是 ES6 引入的数据结构
// Set 的特性：只能存储唯一值，自动去重
const a1: number[] = [1,2,3,4,5,5,6];
const s1: Set<number> = new Set(a1);
console.log('s1 -> ', s1);

//Array.from() - 转回数组
const uniqueArray: number[] = Array.from(new Set(a1));
console.log('uniqueArray -> ', uniqueArray);



// Set 自动去重
const set3 = new Set([1, 1, 2, 2, 3]);
console.log(set3); // Set(3) {1, 2, 3}

// Set 保持插入顺序
const set4 = new Set([3, 1, 2, 3, 1,4,5,5,6]);
console.log(set4); // Set(4) {3, 1, 2,4,5,6}

// 方法1：使用 filter + indexOf
const uniqueArray1 = a1.filter((item, index) => a1.indexOf(item) === index);
console.log(uniqueArray1); // [1, 2, 3, 4, 5, 6]

//方法2：使用 reduce
const uniqueArray2 = a1.reduce((acc, curr) => {
    if (!acc.includes(curr)) {
        acc.push(curr);
    }
    return acc;
}, [] as number[]);
//a1.reduce(() => {}, [] as number[]); // 这里的 [] as number[] 是为了指定 reduce 的初始值类型为 number[]
console.log(uniqueArray2); // [1, 2, 3, 4, 5, 6]

//方法3：使用循环
const uniqueArray3: number[] = [];
for (const item of a1) {
    if (!uniqueArray3.includes(item)) {
        uniqueArray3.push(item);
    }
}
console.log(uniqueArray3); // [1, 2, 3, 4, 5, 6]