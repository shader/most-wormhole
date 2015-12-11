import most from 'most'

export function wormhole() {
  // Create a 'wormhole' that allows circularly dependent streams
  let send,
      stream = most.fromPromise(new Promise(res => send = res)).join()
  stream.send = s => { send(s); return s }
  return stream
}

/* Example:
let w = wormhole()
    s = most.of(1).merge(w).map(n => n + 1)
w.send(s.delay(500).map(n => n * 2))
s.observe(console.log.bind(console))
*/

export function ouroboros(fn) {
  // Create a cyclic stream
  let w = wormhole()
  return w.send(fn(w))
}

/* Example:
let s = ouroboros(s => s.startWith(1).map(n => n*2)) // infinite stream of the powers of 2
s.take(10).observe(console.log.bind(console))
*/

export default wormhole
