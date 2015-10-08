/**
 *
 * @module messages
 * @description modules used for messages cli firekyll
 * @author Wilson Flores
 *
 */

function messages(plugins){
  this.plugins = plugins;
}
messages.prototype.commandNotFound = function(){
  console.log('');
  console.log('  '+this.plugins.symbols.warning,this.plugins.chalk.yellow('command not found !'));
  console.log('');
}

messages.prototype.successCreatePost = function(){
  console.log('');
  console.log('  '+this.plugins.symbols.success,this.plugins.chalk.green('post created '));
  console.log('');
}

messages.prototype.postExists = function(){
  console.log('');
  console.log('  '+this.plugins.symbols.warning,this.plugins.chalk.yellow('post name already exists !'));
  console.log('');
}

messages.prototype.directoryPostNotExist = function(){
  console.log('');
  console.log('  '+this.plugins.symbols.warning,this.plugins.chalk.yellow('directory does not exist _posts !'));
  console.log('');
}

messages.prototype.successCreateProject = function(){
  console.log('');
  console.log('  '+this.plugins.symbols.success,this.plugins.chalk.green('project created jekyll !'));
  console.log('');
}

messages.prototype.listPosts = function(e){
  console.log(' ',this.plugins.chalk.bold(e));
  console.log('');
}

module.exports = messages;