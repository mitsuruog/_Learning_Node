'use strict';

const http = require('http');
const fs = require('fs');
const oppressor = require('oppressor');
const filed = require('filed');

/**
 * stream処理ではないもの
 */
const server1 = http.createServer((req, res) => {
    // [MEMO] これでも動作するけどdata.txtが巨大な場合、全てMemoryに展開されるので非効率
    fs.readFile(__dirname + '/data.txt', (err, data) => {
       res.end(data); 
    });
});
server1.listen(8001);

/**
 * stream処理 
 */
const server2 = http.createServer((req, res) => {
    const stream = fs.createReadStream(__dirname + '/data.txt');
    stream.pipe(res);
});
server2.listen(8002);

const server3 = http.createServer((req, res) => {
    const stream = fs.createReadStream(__dirname + '/data.txt');
    // [MEMO] oppressorはstreamをgzipする
    stream
        .pipe(oppressor(req))
        .pipe(res);
});
server3.listen(8003);

const server4 = http.createServer((req, res) => {
    // [MEMO] filedはstreamに etag, last-modified, content-typeを付与する
    filed(__dirname + '/data.txt')
        .pipe(oppressor(req))
        .pipe(res);
});
server4.listen(8004);
