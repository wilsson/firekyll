var commander = require('commander'),
         path = require('path');

commander.parse(process.argv)
//console.log(commander,commander.rawArgs.length);

function newpost(){
  var d = new Date();
  var fetch = [];
  fetch.push(d.getFullYear());
  fetch.push(d.getDate());
  fetch.push(d.getDay());

  var name = fetch.join('-')+'-'+commander.args[1]+'.markdown'; 
  console.log(name);
}

var command = commander.args;
console.log(command.length);
if(command.length == 0){
  console.log('create project jekyll..');
}

if(command.length >= 3 && command.length > 0){
  console.log('1');
  commander.help();
}else{
  console.log('2');
  var command = commander.args[0];
  switch(command){
    case 'newpost':
      newpost();
      break;
    default:
      commander.help();
  }
}

