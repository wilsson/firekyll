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

exports.isFunction = function(task,context){
  if(typeof context[task] == 'function'){
    return true;
  } 
  return false;
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