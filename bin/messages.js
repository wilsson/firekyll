/**
 *
 * @module messages
 * @description modules used for messages cli firekyll
 * @author Wilson Flores
 *
 */

function messages(plugins){
  this.output = '';
  this.plugins = plugins;
    this.tablero = [];
}

messages.prototype.server = function(){
  this.output+='\n';
  this.output+=' '+this.plugins.symbols.success+' '+this.plugins.chalk.green('server ready - port : '+ 4000);
  this.output+='\n';
  console.log(this.output);
}

messages.prototype.build = function(){
  this.output+='\n';
  this.output+=' '+this.plugins.symbols.success+' '+this.plugins.chalk.green('build jekyll');
  this.output+='\n';
  console.log(this.output);
}

messages.prototype.commandNotFound = function(){
  this.output+='\n';
  this.output+=' '+this.plugins.symbols.warning+' '+this.plugins.chalk.yellow('command not found');
  this.output+='\n';
  console.log(this.output);
}

messages.prototype.successCreatePost = function(){
  this.output+='\n';
  this.output+=' '+this.plugins.symbols.success+' '+this.plugins.chalk.green('post created');
  this.output+='\n';
  console.log(this.output);
}

messages.prototype.postExists = function(){
  this.output+='\n';
  this.output+=' '+this.plugins.symbols.warning+' '+this.plugins.chalk.yellow('post name already exists');
  this.output+='\n';
  console.log(this.output);
}

messages.prototype.projectExists = function(){
  this.output+='\n';
  this.output+=' '+this.plugins.symbols.warning+' '+this.plugins.chalk.yellow('project name already exists');
  this.output+='\n';
  console.log(this.output);
}

messages.prototype.directoryPostNotExist = function(){
  this.output+='\n';
  this.output+=' '+this.plugins.symbols.warning+' '+this.plugins.chalk.yellow('directory does not exist _posts');
  this.output+='\n';
  console.log(this.output);
}

messages.prototype.successCreateProject = function(){
  this.output+='\n';
  this.output+=' '+this.plugins.symbols.success+' '+this.plugins.chalk.green('project created jekyll');
  this.output+='\n';
  console.log(this.output);
}

messages.prototype.errorProjectNew = function(error){
  this.output+='\n';
  this.output+=' '+this.plugins.symbols.error+' '+this.plugins.chalk.red(' '+error);
  this.output+='\n';
  console.log(this.output);
}

messages.prototype.listPosts = function(a,b,wrapper,length){
  wrapper.push(
  	  [this.plugins.chalk.magenta(b+' bytes'),this.plugins.chalk.bold(a)]
  );
    if(wrapper.length == length){
        console.log(wrapper.toString());
    }
}

module.exports = messages;
