var http = require('http');

var opt = {
  host: 'localhost',
  port: '3000',
  path: '/?file=main',
  method: 'GET'
};

var proseccPublicTimeLine = function(res){
  console.log('finish request');
  console.log(res);
}

for(var i=0; i<2000; i++){
  http.request(opt, proseccPublicTimeLine).end();
}
