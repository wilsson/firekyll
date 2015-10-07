/**
 *
 * @module fk
 * @author Wilson Flores
 *
 */

var  cp = require('child_process')
     fs = require('fs'), 
   path = require('path'),
symbols = require('log-symbols'),
chalk   = require('chalk');

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
  var _posts = this.searchFile(process.cwd(),'_posts');
  if(_posts){
    var _file = this.searchFile('_posts',this.createNamePost());
    if(!_file){
      fs.createReadStream(path.join(__dirname,'templates/post'))
        .pipe(fs.createWriteStream(path.join('_posts',this.createNamePost())));
      console.log('');
      console.log('  '+symbols.success,chalk.green('post created ',this.createNamePost()));
      console.log('');
    }
    if(_file){
      console.log('');
      console.log('  '+symbols.warning,chalk.yellow('post name already exists !'));
      console.log('');
    }
  }
  if(!_posts){
    console.log('');
    console.log('  '+symbols.warning,chalk.yellow('directory does not exist _posts !'));
    console.log('');
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
  console.log('');
  console.log('  '+symbols.success,chalk.green('project created jekyll !'));
  console.log('');
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
  _posts = fs.readdirSync(cwd);
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
    _files = fs.readdirSync('_posts');
    console.log('');
    console.log(' List:');
    console.log('');
    _files.forEach(function(e){
      console.log(' ',chalk.bold(e));
      console.log('');
    });
  }else{
    console.log('');
    console.log('  '+symbols.warning,chalk.yellow('directory does not exist _posts !'));
    console.log('');
  }
  
};
module.exports = creator;
