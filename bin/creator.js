/**
 *
 * @module creator
 * @author Wilson Flores
 *
 */

function creator(plugins){
  /*
   * 
   * @description plugins parse in this.plugins
   *
   */

  this.plugins   = plugins;
  this.program   = this.plugins.program;
  this.cp        = this.plugins.cp;
  this.fs        = this.plugins.fs;
  this.path      = this.plugins.path;
  this.utilities = this.plugins.utilities;
  this.jekyll    = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
  this.messages  = new plugins.messages(this.plugins);
}

/*
 *
 * @function create new post for jekyll
 *
 */

creator.prototype.newpost = function(){
  var _posts = this.searchFile(process.cwd(),'_posts');
  if(_posts){
    var _file = this.searchFile('_posts',this.createNamePost());
    if(!_file){
      this.fs.createReadStream(this.path.join(__dirname,'templates/post'))
        .pipe(this.fs.createWriteStream(this.path.join('_posts',this.createNamePost())));
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

/*
 *
 * @function create new project jekyll
 *
 */

creator.prototype.new = function(){
  var _commands = ['new',this.program.new];
  this.utilities.executeCommand(this.jekyll,_commands,this.cp);
  this.messages.successCreateProject();
};

/*
 *
 * @function server jekyll
 *
 */

creator.prototype.server = function(){
  var _commands = ['server'];
  this.utilities.executeCommand(this.jekyll,_commands,this.cp);
  this.messages.server();
}

/*
 *
 * @function build jekyll
 *
 */

creator.prototype.build = function(){
  var _commands = ['build'];
  this.utilities.executeCommand(this.jekyll,_commands,this.cp);
  this.messages.build();
}

/*
 *
 * @function create name post
 *
 */

creator.prototype.createNamePost = function(){
  var d = new Date();
  var fetch = [];
  fetch.push(d.getFullYear());
  fetch.push(d.getDate());
  fetch.push(d.getDay());
  var name = fetch.join('-')+'-'+this.program.newpost+'.markdown'; 
  return name;
};

/*
 *
 * @function search directory _posts or one post
 *
 */

creator.prototype.searchFile = function(cwd,name){
  var _posts = [];
  _posts = this.fs.readdirSync(cwd);
  for(var _i = 0;_i<_posts.length;_i++){
    if(_posts[_i] == name){
      return true;
    }
  }
  return false;
}

/*
 *
 * @function List all posts
 *
 */

creator.prototype.listPosts = function(){
  var _files = [];
  var stats;
  if(this.searchFile(process.cwd(),'_posts')){
    _files = this.fs.readdirSync('_posts');
    for (var _i=0; _i<_files.length;_i++) {
      stats = this.fs.statSync(this.path.join(process.cwd(),'_posts',_files[_i]));
      this.messages.listPosts(_files[_i],stats.size);
    };
  }else{
    this.messages.directoryPostNotExist();
  }
};

module.exports = creator;