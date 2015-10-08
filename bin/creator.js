/**
 *
 * @module creator
 * @author Wilson Flores
 *
 */

function creator(plugins){
  this.commander = plugins.program;
  this.plugins = plugins;
  this.messages = new plugins.messages(this.plugins);
  this.run = function(task){
    if(typeof this[task] == 'function' ){
      this[task]();
    }else{
      this.messages.commandNotFound();
    }
  }  
}

creator.prototype.newpost = function(){
  var _posts = this.searchFile(process.cwd(),'_posts');
  if(_posts){
    var _file = this.searchFile('_posts',this.createNamePost());
    if(!_file){
      this.plugins.fs.createReadStream(this.plugins.path.join(__dirname,'templates/post'))
        .pipe(this.plugins.fs.createWriteStream(this.plugins.path.join('_posts',this.createNamePost())));
      this.messages.successCreatePost();
    }
    if(_file){
      this.messages.postExists();
    }
  }
  if(!_posts){
    this.messages.directoryPostNotExist();
  }
};

creator.prototype.new = function(){
  var jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
  this.plugins.cp.spawn(
    jekyll,
    ['new',this.commander.args[1]],
    {
      cwd:process.cwd()
    }
  );
  this.messages.successCreateProject();
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

creator.prototype.searchFile = function(cwd,name){
  var _posts = [];
  _posts = this.plugins.fs.readdirSync(cwd);
  for(var i = 0;i<_posts.length;i++){
    if(_posts[i] == name){
      return true;
    }
  }
  return false;
}

creator.prototype.listPosts = function(){
  var _files = [];
  if(this.searchFile(process.cwd(),'_posts')){
    _files = this.plugins.fs.readdirSync('_posts');
    console.log('');
    console.log(' List:');
    console.log('');
    _files.forEach(function(e){
      console.log(e);
    });
  }else{
    this.messages.directoryPostNotExist();
  }
};

module.exports = creator;