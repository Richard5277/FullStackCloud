import { usersUniq as users } from './data';
import { usersWithAge as users2 } from './data';
import type { User } from './data';

const uniqueById = Array.from(
    new Map(users.map(user => [user.id, user])).values()
);

// 逐步解析
// 步骤1：users.map(user => [user.id, user])
// 这一步将每个对象转换为 [key, value] 对：

const keyValuePairs = users.map(user => [user.id, user] as [number, User]);
console.log('keyValuePairs -> ', keyValuePairs);
// 输出：
// [
//   [1, {id:1, name:'Alice'}],
//   [1, {id:1, name:'Alice Clone'}],
//   [2, {id:2, name:'Bob'}],
//   [3, {id:3, name:'Charlie'}],
//   [2, {id:2, name:'Bob Duplicate'}]
// // ]
// 步骤2：new Map(keyValuePairs)
// Map 构造函数接受 [key, value] 对的数组。关键：Map 的 key 是唯一的！

// 使用 reverse 保留第一个
const uniqueKeepFirst = Array.from(
    new Map(
        [...users].reverse()
            .map(user => [user.id, user] as [number, User])
    ).values()
);
console.log('uniqueKeepFirst -> ', uniqueKeepFirst);

// 基于 name 去重
// const uniqueByName = Array.from(
//     new Map(users.map(user => [user.name, user] as [string, User])).values()
// );
// 基于多个字段
// const uniqueByComposite = Array.from(
//     new Map(
//         users.map(user => 
//             [`${user.id}-${user.name}`, user] as [string, User]
//         )
//     ).values()
// );


const mapKeyValuePair = new Map<number, User>(keyValuePairs);
console.log(mapKeyValuePair);
// Map(3) {
//   1 => {id:1, name:'Alice Clone'},     // 后面的覆盖前面的
//   2 => {id:2, name:'Bob Duplicate'},   // 后面的覆盖前面的
//   3 => {id:3, name:'Charlie'}
// }
// 重要特性：当 key 重复时，后面的值会覆盖前面的值。

// 步骤3：.values()
// 获取 Map 中所有的值：

const valuesIterator = mapKeyValuePair.values();
console.log(valuesIterator);
// MapIterator {{id:1, name:'Alice Clone'}, {id:2, name:'Bob Duplicate'}, {id:3, name:'Charlie'}}
// 步骤4：Array.from()
// 将迭代器转换为数组：

const result = Array.from(valuesIterator);
console.log(result);
// [
//   {id:1, name:'Alice Clone'},
//   {id:2, name:'Bob Duplicate'},
//   {id:3, name:'Charlie'}
// ]
// Map 去重的核心原理

// Map 的 key 唯一性
const map = new Map();
map.set(1, 'first');
map.set(1, 'second');  // 覆盖 'first'
map.set(1, 'third');   // 覆盖 'second'

console.log(map.get(1)); // 'third'
console.log(map.size);   // 1

// 使用 Map 去重（保留最后一个）
const uniqueUsers = Array.from(
    new Map(users.map(user => [user.id, user])).values()
);
console.log(uniqueUsers);
// [
//   {id:1, name:'Alice Final', age:27},  // 保留了最后的
//   {id:2, name:'Bob', age:30}
// ]

// 如果想保留第一个，可以反转数组
const uniqueUsersKeepFirst = Array.from(
    new Map([...users].reverse().map(user => [user.id, user])).values()
);
console.log(uniqueUsersKeepFirst);
// [
//   {id:2, name:'Bob', age:30},
//   {id:1, name:'Alice', age:25}  // 保留了第一个
// ]
// Map vs Set 对比

// Set：基于整个对象引用去重
const setApproach = Array.from(new Set(users));
console.log(setApproach.length); // 4（无法去重）

// Map：基于某个属性去重
const mapApproach = Array.from(
    new Map(users.map(user => [user.id, user])).values()
);
console.log(mapApproach.length); // 2（按 id 去重）


const uniqueByName = Array.from(
    new Map(users2.map(user => [
        `${user.firstName}-${user.lastName}`,  // 组合 key
        user
    ])).values()
);
console.log(uniqueByName);
// [
//   {firstName:'John', lastName:'Doe', age:31},
//   {firstName:'Jane', lastName:'Doe', age:25}
// ]

/*
优缺点
优点
✅ 代码简洁，一行完成

✅ 性能好，O(n) 时间复杂度

✅ 可以灵活指定去重键

✅ 保持插入顺序

缺点
❌ 需要理解 Map 和迭代器概念

❌ 只能基于单一 key（除非组合 key）

❌ 保留最后一个重复项（可能需要反转）

*/
// 等价的其他写法

// 使用 reduce
const uniqueReduce = users.reduce((acc, user) => {
    acc.set(user.id, user);  // 直接使用 Map
    return acc;
}, new Map());
console.log(Array.from(uniqueReduce.values()));

// 使用 filter
const uniqueFilter = users.filter((user, index, self) => 
    index === self.findIndex(u => u.id === user.id)
);

/*
总结
Map 去重的精髓在于：

利用 Map 的 key 唯一性

将对象的某个属性作为 key

重复的 key 会自动覆盖，实现去重

最后提取 values 得到去重后的对象数组

这是处理对象数组去重最推荐的方法之一！
*/


// function deduplicateByKey<T, K>(array: T[], keySelector: (item: T) => K): T[] {
//     return Array.from(
//         new Map(
//             array.map(item => [keySelector(item), item] as [K, T])
//         ).values()
//     );
// }

// // 使用
// const uniqueUsers = deduplicateByKey(users, user => user.id);


// (node:10529) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file://map.ts is not specified and it doesn't parse as CommonJS.
// Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
// To eliminate this warning, add "type": "module" to /package.json.
// (Use `node --trace-warnings ...` to show where the warning was created)

const singleUser: User = { id: 1, name: 'Alice' };
const pair = [singleUser.id, singleUser];

const pairs = [singleUser].map(u => [u.id, u]);

const arr = [1, "hello"];
// arr.push(true);
arr[0] = "world";
console.log(arr);


// 1: as
const asPair = users.map(u => [u.id, u] as [number, User]);
// type: [number, User][]

// 2: as const
const constPair = users.map(u => [u.id, u] as const);
// type: readonly [number, User][]
console.log('constPair -> ', constPair)
console.log('constPair -> ', constPair[0])
console.log('constPair -> ', constPair[0][0])


// pre-defined type
const typedPair: [number, User][] = users.map(u => [u.id, u]);


// reservied typed
function toTuple<T, U>(a: T, b: U): [T, U] {
    return [a, b];
}

const reservedTypePairs = users.map(user => toTuple(user.id, user));

// 数组：长度不限，元素类型相同
let arr2: (number | string)[] = [1, "a", 2, "b", 3];
// 元组：长度固定，每个位置类型确定
let tuple: [number, string] = [1, "a"];

arr2[0] = "string";
console.log('arr2 -> ', arr2)

// tuple[0] = "string"; // not allowed

arr2.push(4);
console.log('arr2 after push : ', arr2);


tuple.push(4);
console.log('tuple after push 4 : ', tuple);
tuple.push(5);
console.log('tuple after push 5 : ', tuple);

// use as, most clean
const finalUniqueUsers = Array.from(
    new Map(users.map(user => [user.id, user] as [number, User])).values()
);

// more delegant
function entries<T, K>(array: T[], key: (item: T) => K): [K, T][] {
    return array.map(item => [key(item), item]);
}

const elegantUniqueUsers = Array.from(
    new Map(entries(users, user => user.id)).values()
);

// const entriesObj = Object.


// 但还有这些变体：
// users.map(user => [user.id, user.name])  // key + 转换后的 value
// users.map(user => [user.id, user.age])   // key + 提取属性
// users.map(user => [user.id, {...user}])  // key + 拷贝对象