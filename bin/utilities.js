/**
 *
 * @module utilities
 * @author Wilson Flores
 * @description utilities used in the modules
 *
 */

exports.isTrueCommand = function(option){
  var flag = typeof option === 'string' ? true : false;
  return flag;  
}

exports.executeCommand = function(command,_commands,cp){
  cp.spawn(
    command,
    _commands,
    {
      cwd:process.cwd()
    }
  );
}