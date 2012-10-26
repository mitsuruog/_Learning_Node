var readline = require('readline');

var interface = readline.createInterface({
  input : process.stdin, 
  output : process.stdout
});

interface.question('>>What is the meaning of life? ', function(answer){
  console.log('Abount thw meaning of life, you said ' + answer);
  interface.setPrompt('>>');
  interface.prompt();
});

interface.on('line', function(cmd){
  if(cmd.trim() == '.leave'){
    closeInterface();
    return;
  } else{
    console.log('repeating command: ' + cmd);
  }
  interface.setPrompt('>>');
  interface.prompt();
}).on('SIGINT', function(){
  interface.question('Are you sure you want to exit? ', function(answer){
    if(answer.match(/^y(es)?$/i)){
      closeInterface();
    }
  });
}).on('pause', function(){
  console.log('Readling paused.');
}).on('resume', function(){
  console.log('Readline resumed.');
}).on('close', function(){
  console.log('Readline closed.');
  closeInterface();
});

function closeInterface(){
  console.log('Leaving interface...');
  process.exit();
};
