/**
 *
 * @module fk
 * @author Wilson Flores
 *
 */
 
var plugins = require('./plugins');

plugins.program.on('--help', function(){
  console.log('  Examples:');
  console.log('');
  console.log('    $ jk new     [nameProject]');
  console.log('    $ jk newpost [namePost]');
  console.log('    $ jk list');
  console.log('');
});

plugins.program.parse(process.argv);
var messages = new plugins.messages(plugins);
var zap = new plugins.creator(plugins);
var command = plugins.program.args;

if(command.length >= 3){ 
  plugins.program.help();
}
if(command.length == 1){
   if(command[0] == 'list'){
      zap.run('listPosts');
      process.exit();
    }
}
if(command.length > 1){
  var command = plugins.program.args[0];
  switch(command){
    case 'newpost':
      zap.run('newpost');
      break;
    case 'new':
      zap.run('new');
      break;
    default:
      messages.commandNotFound();
  }
}else{
  plugins.program.help();
}
