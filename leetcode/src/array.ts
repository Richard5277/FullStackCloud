//Remove Duplicates — Array manipulation
//Set 是 ES6 引入的数据结构
// Set 的特性：只能存储唯一值，自动去重
export const a1: number[] = [1,2,3,4,5,5,6];
const s1: Set<number> = new Set(a1);
console.log('s1 -> ', s1);

//Array.from() - 转回数组
const uniqueArray: number[] = Array.from(new Set(a1));
console.log('uniqueArray -> ', uniqueArray);
