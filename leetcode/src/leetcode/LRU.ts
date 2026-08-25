// LRU : Least Recently Used

type Nullable<T> = T | null;

class LRUNode<K, V> {
    key: Nullable<K>;
    value: Nullable<V>;
    prev: Nullable<LRUNode<K, V>> = null;
    next: Nullable<LRUNode<K, V>> = null;
    constructor(key: Nullable<K>, value: Nullable<V>) {
        this.key = key;
        this.value = value;
    }
}

class LRUCache<K, V> {
    private capacity: number;
    private map: Map<K, LRUNode<K, V>>;
    private head: LRUNode<K, V>;
    private tail: LRUNode<K, V>;

    constructor(capacity: number) {
        if ( capacity <= 0) {
            throw new Error("Capacity must be greater than 0");
        }

        this.capacity = capacity;
        this.map = new Map<K, LRUNode<K, V>>();

        this.head = new LRUNode<K, V>(null, null);
        this.tail = new LRUNode<K, V>(null, null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get(key: K): Nullable<V> {
        const node = this.map.get(key);
        if (!node || node.value === null) {
            return null; // Key not found
        }

        this.moveToFront(node);
        return node.value;
    }

    put(key: K, value: V): void {
        const existing = this.map.get(key);

        if (existing) {
            existing.value = value;
            this.moveToFront(existing);
        }

        const newNode = new LRUNode<K, V>(key, value);
        this.map.set(key, newNode);
        this.addToFront(newNode);

        if (this.map.size > this.capacity) {
            this.evictLRU();
        }
    }

    has(key: K): boolean {
        return this.map.has(key);
    }

    delete(key: K): boolean {
        const node = this.map.get(key);
        if (!node) return false;
        this.removeNode(node);
        return true;
    }

    size(): number {
        return this.map.size;
    }

    keys(): K[] {
        const result: K[] = [];
        let curr = this.head.next;
        while (curr && curr !== this.tail) {
            if (curr.key !== null)
                result.push(curr.key);
                curr = curr.next;
        }
        return result;
    }

    values(): V[] {
        const result: V[] = [];
        let curr = this.head.next;
        while (curr && curr !== this.tail) {
            if (curr.value !== null) result.push(curr.value);
            curr = curr.next;
        }
        return result;
    }

    // ---- private helpers ----

    private addToFront(node: LRUNode<K, V>): void {
        const first = this.head.next!;
        node.prev = this.head;
        node.next = first;
        this.head.next = node;
        first.prev = node;
    }

       
    private removeNode(node: LRUNode<K, V>): void {
        const prev = node.prev!
        const next = node.next!;
        prev.next = next;
        next.prev = prev;
        node.prev = null;
        node.next = null;
    }

    private moveToFront(node: LRUNode<K, V>): void {
        this.removeNode(node);
        this.addToFront(node);
    }

    private evictLRU(): void {
        const lru = this.tail.prev!;
        if (lru === this.head) return; //nothing to evict

        if (lru.key !== null) {
            this.map.delete(lru.key);
        }
        this.removeNode(lru);
    }
 
}

// usecases


// P  O  N


// [N0] -> [N1, N0]
// N0 exist, pre&next null
// add current node: N1
// node.prev = head;
// node.next = head.next


/*

LRU Cache 用的是 带 head 和 tail 的双向链表：

head <-> A <-> B <-> C <-> tail

head 是最前面（最近使用）
tail 是最后面（最久未使用)

当你 get(key) 或 put(key) 时，这个 key 对应的节点必须变成 最新使用 → 放到 head 后面。

head <-> node1 <-> node2 <-> ... <-> nodeN <-> tail

head.next 永远存在

tail.prev 永远存在

删除任何节点都不会影响 head/tail

插入任何节点都可以统一插在 head 后面

*/


/*

⭐ O(1) 是什么？
O(1) = 常数时间  
意思是：
无论链表里有 1 个节点还是 100 万个节点，
你的操作耗时都一样，不会变慢。

在 LRU 里，哪些是 O(1)？
删除一个节点（因为有 prev 和 next）

插入一个节点到头部（因为 head 永远在那）

移动节点到头部（remove + addToFront）

用 Map 查找节点（哈希查找是 O(1)）

这些操作都不需要扫描链表。


⭐ 为什么 LRU 必须做到所有操作都是 O(1)？
因为 LRU 是缓存系统，必须非常快。


⭐ 最直观的例子：插入节点
你问的重点是：

为什么 addToFront 是 O(1)？

因为 head 永远在那，你不需要扫描链表。

ts
node.prev = head;
node.next = head.next;
无论链表有多少节点，这两步永远是常数时间。

如果你要插入到尾部（没有 tail 哨兵）：

你必须扫描到最后一个节点 → O(n)
*/


/*
LRU uses a hash map and a doubly linked list to guarantee all operations are O(1).”
*/