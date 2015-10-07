var cp = require('child_process')
    fs = require('fs'), 
  path = require('path');

function creator(commander){
  this.commander = commander;
  this.run = function(task){
    if(typeof this[task] == 'function' ){
      this[task]();
      }else{
        console.log('comando no encontrado');
      }
  }  
}

creator.prototype.newpost = function(){
  if(this.searchDirectory()){
    console.log('creando post..',this.createNamePost());
  }else{
    console.log('no existe directorio _posts');
  }
};

creator.prototype.new = function(){
  console.log('create project jekyll..');
  cp.spawn(
	'jekyll',
    ['new',this.commander.args[1]],
    {
      cwd:process.cwd()
    });
};

creator.prototype.createNamePost = function(){
  var d = new Date();
  var fetch = [];
  fetch.push(d.getFullYear());
  fetch.push(d.getDate());
  fetch.push(d.getDay());
  var name = fetch.join('-')+'-'+this.commander.args[1]+'.markdown'; 
  return name;
};

creator.prototype.searchDirectory = function(){
  var _posts = [];
  var cwd = process.cwd();
  _posts = fs.readdirSync(cwd)
  for(var i = 0;i<_posts.length;i++){
    if(_posts[i] == '_posts'){
      return true;
    }
  }
  return false;
}
module.exports = creator;
