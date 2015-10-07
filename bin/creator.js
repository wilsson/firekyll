var cp = require('child_process')
    fs = require('fs'), 
  path = require('path');

function creator(commander){
  this.commander = commander;
  this.run = function(task){
    if(typeof this[task] == 'function' ){
      this[task]();
      }else{
        console.log('command not found');
      }
  }  
}

creator.prototype.newpost = function(){
  var _posts = this.searchDirectoryPosts();
  if(_posts){
    var _file = this.searchFile('_posts',this.createNamePost());
    if(!_file){
      fs.createReadStream(path.join(__dirname,'templates/post'))
        .pipe(fs.createWriteStream(path.join('_posts',this.createNamePost())));
      console.log('post created ',this.createNamePost());
    }
    if(_file){
      console.log('post name already exists!');
    }
  }
  if(!_posts){
    console.log('directory does not exist _posts');
  }
};

creator.prototype.new = function(){
  cp.spawn(
    'jekyll',
    ['new',this.commander.args[1]],
    {
      cwd:process.cwd()
    }
  );
  console.log('project created jekyll');
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

creator.prototype.searchDirectoryPosts = function(){
  var _posts = [];
  var cwd = process.cwd();
  _posts = fs.readdirSync(cwd);
  for(var i = 0;i<_posts.length;i++){
    if(_posts[i] == '_posts'){
      return true;
    }
  }
  return false;
}

creator.prototype.searchFile = function(sc,name){
  var _files = [];
  _files = fs.readdirSync(sc);
  for(var i = 0;i<_files.length;i++){
    if(_files[i] == name){
      return true;
    }
  }
  return false;
}

module.exports = creator;
