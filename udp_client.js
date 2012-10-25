var dgram = require('dgram');

var client = dgram.createSocket('udp4');

client.bind();
client.setBroadcast(true);

process.stdin.resume();

process.stdin.on('data', function(data){
  console.log('client -> ' + data.toString('utf8'));

  client.send(data, 0, data.length, 3000, 'localhost',
    function(err, bytes){
      if(err){
        console.log('client -> '+ err);
      }else{
        console.log('client -> success');
      }
    });

}); 
