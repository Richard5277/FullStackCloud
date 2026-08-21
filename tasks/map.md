/*
why 

users.map(user => [user.id, user]);

return type:
(number | User)[][]

not:
[number, User][]

*/

import type { User } from '../leetcode/src/data';


const pair = [user.id, user];

// TypeScript 推断为
const pair: (number | User)[] = [user.id, user];
// 而不是
const pair: [number, User] = [user.id, user];


2. TypeScript 的保守策略
TypeScript 默认选择更通用的类型：


// TypeScript 认为这可能是：
[1, "string"]       // (number | string)[]
[1, {id: 1}]        // (number | {id: number})[]
[true, [1,2]]       // (boolean | number[])[]

// 而不是元组：
[number, string]
[number, {id: number}]
[boolean, number[]]

interface User {
    id: number;
    name: string;
}

const user: User = { id: 1, name: "Alice" };

// 单个数组字面量
const pair = [user.id, user];
// 类型：(number | User)[]

// map 的结果
const pairs = [user].map(u => [u.id, u]);
// 类型：(number | User)[][]