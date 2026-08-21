export type User = {
  id: number;
  name: string;
};

export type UserWithAge = {
  firstName: string;
  lastName: string;
  age: number;
};

export const usersUniq: User[] = [
  { id: 1, name: "Alice" },
  { id: 1, name: "Alice Clone" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 2, name: "Bob Duplicate" },
];

export const usersDup: User[] = [
  { id: 1, name: "Alice" },
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 2, name: "Bob" },
];

export const usersWithAge = [
  { firstName: "John", lastName: "Doe", age: 30 },
  { firstName: "John", lastName: "Doe", age: 31 }, // 同名同姓
  { firstName: "Jane", lastName: "Doe", age: 25 },
];
