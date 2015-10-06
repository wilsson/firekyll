var program = require('commander'),
                path = require('path'),
            creator = require('./creator');

program
    .version('0.0.1');

program.parse(process.argv);

var cli = new creator(program);
var command = program.args;

if(command.length >= 3){ 
  commander.help();
}else{
  var command = program.args[0];
  switch(command){
    case 'newpost':
      cli.run('newpost');
      break;
    case 'new':
      cli.run('new');  
      break;
    default:
      console.log('help comando no encontrado');
      program.help();
  }
}
