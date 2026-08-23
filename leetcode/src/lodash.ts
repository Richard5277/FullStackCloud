import _ from 'lodash';

const users = [
  {id: 1, name: 'Alice'},
  {id: 1, name: 'Alice'},
  {id: 1, name: 'Alice'},
  {id: 2, name: 'Bob'}
];

const userMap1 = _.keyBy(users, 'id');

console.log('userMap1 => ', userMap1);


const userMap2 = new Map(users.map(user => [user.id, user]));
console.log('userMap2 => ', userMap2);

const uniqueUser = [...new Map(users.map(user => [user.id, user])).values()];

console.log('uniqueUser => ', uniqueUser);


const userMapReduce = users.reduce((map, user) => {
  map.set(user.id, user);
  return map;
}, new Map<number, User>());
console.log('userMapReduce => ', userMapReduce);