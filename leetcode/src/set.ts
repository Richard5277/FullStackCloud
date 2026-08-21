type User = {
    id: number;
    name: string;
}

const users: User[] = [
    {id: 1, name: 'Alice'},
    {id: 1, name: 'Alice'},
    {id: 2, name: 'Bob'},
    {id: 3, name: 'Charlie'}
];

const uniqueUsers = Array.from(new Set(users));
console.log(uniqueUsers.length); // 4，没有去重！

//////
// 使用 Map 基于 id 去重
const uniqueById1 = Array.from(
    new Map(users.map(user => [user.id, user])).values()
);
console.log(uniqueById1);
// [{id:1, name:'Alice'}, {id:2, name:'Bob'}, {id:3, name:'Charlie'}]

// 方法2：基于 JSON 字符串去重
const uniqueByJSON = Array.from(
    new Map(users.map(user => [JSON.stringify(user), user])).values()
);
console.log(uniqueByJSON);
// 基于完整内容去重


// 方法3：使用 filter + findIndex
const uniqueUsersFilter = users.filter((user, index, self) => 
    index === self.findIndex(u => u.id === user.id)
);
console.log(uniqueUsersFilter);
// 基于 id 去重

// 方法4：使用 reduce
const uniqueUsersReduce = users.reduce((acc, current) => {
    const exists = acc.some(item => item.id === current.id);
    if (!exists) {
        acc.push(current);
    }
    return acc;
}, [] as typeof users);

// 特殊情况：同一个引用会被去重
const sharedObj = {id: 1, name: 'Alice'};
const users2 = [sharedObj, sharedObj, {id: 2, name: 'Bob'}];

const uniqueUsers2 = Array.from(new Set(users2));
console.log(uniqueUsers2.length); // 2
// sharedObj 因为是同一个引用，被去重了
// 但 {id:2, name:'Bob'} 是另一个引用，保留


// Set 自动去重
const set3 = new Set([1, 1, 2, 2, 3]);
console.log(set3); // Set(3) {1, 2, 3}

// Set 保持插入顺序
const set4 = new Set([3, 1, 2, 3, 1,4,5,5,6]);
console.log(set4); // Set(4) {3, 1, 2,4,5,6}

//////
const a1 = [1,2,3,4,5,5,6];
//////

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


// 注意：Set 对对象是引用比较
const objects = [{id: 1}, {id: 1}, {id: 2}];
const uniqueObjects = Array.from(new Set(objects));
console.log('uniqueObjects -> ', uniqueObjects); // [{id:1}, {id:1}, {id:2}] - 不会去重！

// 需要自定义去重逻辑
const uniqueById = Array.from(
    new Map(objects.map(obj => [obj.id, obj])).values()
);
console.log('uniqueById1 -> ',uniqueById); // [{id:1}, {id:2}]

// 情况1：两个不同的对象，内容相同但引用不同
const obj1 = {id: 1, name: 'Alice'};
const obj2 = {id: 1, name: 'Alice'};
console.log(obj1 === obj2); // false - 不同的内存地址

// 情况2：同一个对象的两个引用
const obj3 = {id: 1, name: 'Alice'};
const obj1Alias = obj3;  // 指向同一个对象
console.log(obj3 === obj1Alias); // true - 相同的内存地址

// 情况3：同一个变量和自己比较
console.log(obj1 === obj1); // true - 显然相同


// 显式展示引用关系
const alice = {id: 1, name: 'Alice'};

const arr1 = [alice, alice];  // 两个元素都是 alice
console.log(new Set(arr1).size); // 1 ✅ 去重成功

const arr2 = [
    {id: 1, name: 'Alice'},  // 新对象
    {id: 1, name: 'Alice'}   // 另一个新对象
];
console.log(new Set(arr2).size); // 2 ❌ 无法去重

// 混合情况
const arr3 = [
    alice,                    // 引用 alice
    alice,                    // 还是 alice（去重）
    {id: 1, name: 'Alice'},  // 新对象（不去重）
    {id: 2, name: 'Bob'}     // 新对象
];
console.log(new Set(arr3).size); // 3

//////

const apiResponse1 = [
    {id: 1, name: 'Alice'},
    {id: 1, name: 'Alice'}  // 重复数据
];

// 场景：手动创建的引用
const alice1 = {id: 1, name: 'Alice'};
const apiResponse2 = [alice1, alice1];  // 同一个引用

// 场景：实际开发中更常见的是第一种情况
// 因为 JSON.parse() 或 API 返回的数据总是创建新对象

/* 
=== 比较的是引用（内存地址），不是内容

同一个变量或引用 → === 返回 true → Set 可以去重

内容相同但引用不同 → === 返回 false → Set 不能去重

实际开发中，对象数组去重通常需要指定去重键（如 id）或使用其他方法
*/