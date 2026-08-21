A curated list of problems

Increasing difficulty

TypeScript‑specific twists

Starter templates

Guided Links so you can ask for full solutions or deeper explanations instantly

===

⭐ Level 1 — Warm‑up TypeScript Logic (must be instant for senior devs)
Two Sum — Hash map fundamentals

Valid Parentheses — Stack basics

Merge Sorted Arrays — Two‑pointer technique

Remove Duplicates — Array manipulation

Reverse String — Basic pointer logic

Starter template
ts
function solve(input: any): any {
  // your logic here
}
⭐ Level 2 — TypeScript + Data Structures (where most interviews start)
Binary Tree Level Order Traversal — BFS

Binary Search — Classic must‑know

LRU Cache — Map + doubly linked list

Min Stack — Stack with O(1) min

Group Anagrams — Hashing strings

TypeScript class template
ts
class Solution {
  solve(input: any): any {
    // ...
  }
}
⭐ Level 3 — TypeScript + Algorithms (senior-level expectation)
Top K Frequent Elements — Heap or bucket sort

Longest Substring Without Repeating Characters — Sliding window

Product of Array Except Self — Prefix/suffix arrays

Rotate Matrix — In‑place matrix manipulation

Search in Rotated Sorted Array — Modified binary search

⭐ Level 4 — TypeScript + Async/Promises (frontend interviews LOVE this)
These are not classic LeetCode, but frontend interview must‑haves.

Promise.all implementation

Debounce function

Throttle function

Retry async function

EventEmitter class

Example starter
ts
function debounce(fn: Function, delay: number) {
  let timer: any;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
⭐ Level 5 — TypeScript + System Design Lite (for senior roles)
These are “coding + architecture” questions:

Design a Rate Limiter

Design a Task Scheduler

Design a Cache with TTL

Design a Pub/Sub system

Design a File System

These show senior‑level thinking beyond algorithms.