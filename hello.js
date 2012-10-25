var http = require('http');

http.createServer(function(req, res){

  var opt = {
    'content-type' : 'content-type',
    //	'content-length' : '123',
    //	'connection' : 'keep-alive',
    //	'accept' : '*/*'
  };

  res.writeHead(200, opt);
  res.end('Hello World!');

}).listen(3000);

console.log('Server running on 3000');
