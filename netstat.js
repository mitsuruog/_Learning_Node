var spawn = require('child_process').spawn,
netstat = spawn('netstat', ['-a']);

netstat.stdout.setEncoding('utf8');

netstat.stdout.on('data', function(data){
  console.log('stdout:' + data);
});

netstat.stderr.on('data', function(data){
  console.log('stderr:' + data);
})

netstat.on('exit', function(code){
  console.log('child process exited with code ' + code);
});
