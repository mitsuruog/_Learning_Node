var http = require('http'),
fs = require('fs');

function writeNumber(res){
  var count = 0;
  for(var i=0; i<100; i++){
    count++;
    res.write(count.toString());
  }
}  

http.createServer(function(req, res){

  var opt = {
    'content-type' : 'text/plain',
    //	'content-length' : '123',
    //	'connection' : 'keep-alive',
    //	'accept' : '*/*'
  };

  var query = require('url').parse(req.url).query;
  var app = require('querystring').parse(query).file + '.txt';

  res.writeHead(200, opt);

  writeNumber(res);

  setTimeout(function(){

    console.log('opening ' + app);
    fs.readFile(app, 'utf8', function(err, data){

      if(err){
        res.write('Could not find or open file for reading');
      }else{
        res.write(data);
      }
      res.end();
    });
  }, 2000);

}).listen(3000);

console.log('Server running on 3000');
