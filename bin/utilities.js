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

function executeCommand(command,_commands,cp){
  cp.spawnSync(
    command,
    _commands,
    {
      cwd:process.cwd()
    }
  );
}


module.exports = {
  isTrueCommand : isTrueCommand,
  executeCommand : executeCommand
}