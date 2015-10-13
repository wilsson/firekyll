/**
 *
 * @module utilities
 * @author Wilson Flores
 * @description utilities used in the modules
 *
 */

function isTrueCommand(option){
  var flag = typeof option === 'string' ? true : false;
  return flag;  
}

function executeCommand(command,_commands,cp,cwd){
  console.log(command,_commands,cwd);
  cp.spawnSync(
    command,
    _commands,
    cwd
  );
}


module.exports = {
  isTrueCommand : isTrueCommand,
  executeCommand : executeCommand
}