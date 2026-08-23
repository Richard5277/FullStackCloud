- normal flow

browser -> Next.js API -> MondoDB -> Response


- with Redis : cache aside pattern

Browser -> Next.js API -> Redis

 - HIT -> Response

 - MISS -> MongoDB -> Redis -> Response


- Redis isn't necessarily just for caching. It can also be used for:

caching
sessions
rate limiting
distributed locks
counters
queues / job coordination
pub/sub