var dgram = require('dgram');

var server = dgram.createSocket('udp4');

server.on('message', function(msg, rinfo){
  console.log('server -> Message: ' + msg + ' from ' + rinfo.address + ':' + rinfo.port);

    server.send(msg, 0, msg.length, 3000, '255.255.255.255',
    function(err, bytes){
      if(err){
        console.log('server -> '+ err);
      }else{
        console.log('server -> success');
      }
    });

});

server.on('listening', function () {
  
  server.setBroadcast(true);
  
  var address = server.address();
  console.log("server listening " + address.address + ":" + address.port);
  
});

server.bind(3000);
console.log('binding on port 3000');
