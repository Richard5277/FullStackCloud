q1:

LRU Cache is extremely common — it tests architecture + TS classes.


q2:

Binary Tree Level Order is BFS — not hard, but tests recursion vs queue thinking.


q3:

Group Anagrams tests hashing logic and string manipulation.


q4:

Longest Substring Without Repeating Characters → sliding window mastery

Top K Frequent Elements → heap or bucket sort

Product Except Self → prefix/suffix arrays



q5:

Interviewers LOVE:

Debounce

Throttle

Retry logic

Promise combinators

EventEmitter


Frontend devs deal with:

user input

API retries

rate limiting

event systems

async rendering



q6:


RxJS

Observables

async pipelines

event streams



q7:

System Design Lite

This is senior‑level thinking:

designing components

managing state

handling concurrency

caching

scheduling

pub/sub patterns

These are not algorithm questions — they test:

architecture

tradeoffs

scalability

clean API design

reasoning about constraints

Most important ones
Rate Limiter → async control + queueing

Cache with TTL → Map + timers

Pub/Sub → event architecture

Why frontend interviews ask this
Modern frontend apps are basically distributed systems:

caching API responses

scheduling background tasks

managing event streams

rate‑limiting user actions

This is where senior candidates shine.

/*

⭐ 3. Understanding of O(1) operations
LRU Cache is a classic test of:

constant‑time eviction

constant‑time update

constant‑time lookup

If you use:

arrays → ❌

sorting → ❌

scanning → ❌

*/


/*

⭐ 4. Ability to reason about state mutation
Frontend devs deal with:

caching API responses

memoizing expensive operations

invalidating stale data

managing component state

LRU Cache tests whether you can think about:

what happens when capacity is exceeded

how to maintain ordering

how to update state efficiently

This is directly relevant to frontend performance optimization.

*/


/*

A strong candidate explains:

“We need a Map for O(1) lookup.”

“We need a doubly linked list for O(1) removal and insertion.”

“Head is most recent, tail is least recent.”

“Eviction happens when size exceeds capacity.”


*/


/*

⭐ Simple example
Capacity = 3
Operations:

put(1) → cache = [1]

put(2) → cache = [1, 2]

put(3) → cache = [1, 2, 3]

get(1) → 1 becomes most recently used → order = [2, 3, 1]

put(4) → cache full → evict 2 (least recently used)
→ cache = [3, 1, 4]

The key idea:
The item you haven’t touched for the longest time gets kicked out.


*/