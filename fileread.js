var http = require('http'),
  fs = require('fs');

http.createServer(function(req, res){

  var opt = {
    'content-type' : 'content-type',
    //	'content-length' : '123',
    //	'connection' : 'keep-alive',
    //	'accept' : '*/*'
  };

  fs.readFile('hello.js', 'utf-8', function(err, data){
    
    res.writeHead(200, opt);
    if(err){
      res.write('Could not find or open file for reading');
    }else{
      res.write(data);
    }
    res.end();
    
  });

}).listen(3000);

console.log('Server running on 3000');
