'use strict';

const Readable = require('stream').Readable;

sample1();
sample2();
sample3();
sample4();

function sample1() {
  const rs = new Readable();
  // [MEMO] pushはstreamのbufferにchunksデータを貯める
  rs.push('beep ');
  rs.push('boop\n');
  // [MEMO] nullを設定するとstreamが終端となる
  rs.push(null);
  rs.pipe(process.stdout);
}

function sample2() {
  const rs = new Readable();
  let char = 97;
  // [MEMO] _readってなんだろ
  rs._read = function () {
    rs.push(String.fromCharCode(char++));
    if (char > 'z'.charCodeAt(0)) {
      rs.push('\n');
      rs.push(null);
    }
  }
  rs.pipe(process.stdout);
}

function sample3() {
  const rs = new Readable();
  let char = 97;
  rs._read = function () {
    if (char > 'z'.charCodeAt(0)) {
      rs.push('\n');
      rs.push(null);
    }
    setTimeout(() => {
      // FIXME Error: stream.push() after EOF
      // at readableAddChunk (_stream_readable.js:133:17)
      // at Readable.push (_stream_readable.js:111:10)
      // at null._onTimeout (/Users/mitsuruog/workspace/work/Learning_Node/stream/1_readable_stream.js:44:10)
      // at Timer.listOnTimeout (timers.js:92:15)
      rs.push(String.fromCharCode(char++));
    }, 100);
  }
  rs.pipe(process.stdout);
  process.on('exit', () => console.error(`_read() called ${char - 97} times`));
  process.stdout.on('error', () => process.exit);
}

/**
 * (echo abc; sleep 1; echo def; sleep 1; echo ghi) | node 1_readable_stream.js
 */
function sample4() {
  process.stdin.on('readable', () => {
    let buf = process.stdin.read(3);
    console.dir(buf);
    // [MEMO] readはbufferのchunksデータをunshiftする。つまり、readするとbufferから消える
    process.stdin.read(0);
  });
}
