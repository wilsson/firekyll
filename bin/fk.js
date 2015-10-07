var program = require('commander'),
       path = require('path'),
    creator = require('./creator');

program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ jk new     [nameProject]');
  console.log('    $ jk newpost [namePost]');
  console.log('');
});

program.parse(process.argv);

var zap = new creator(program);
var command = program.args;

if(command.length >= 3){ 
  program.help();
}
if(command.length > 1){
  var command = program.args[0];
  switch(command){
    case 'newpost':
      zap.run('newpost');
      break;
    case 'new':
      zap.run('new');
      break;
    default:
      console.log('command not found');
  }
}else{
  program.help();
}