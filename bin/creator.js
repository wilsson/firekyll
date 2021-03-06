/**
 *
 * @module creator
 * @author Wilson Flores
 *
 */

function Creator(plugins){
  /*
   * 
   * @instance messages, wrapper
   * @param {plugins} plugins - modules used in firekyll
   *
   */

  this.plugins   = plugins;
  this.program   = this.plugins.program;
  this.cp        = this.plugins.cp;
  this.fs        = this.plugins.fs;
  this.path      = this.plugins.path;
  this.utilities = this.plugins.utilities;
  this.table     = this.plugins.table;
  this.inquirer  = this.plugins.inquirer;
  this.jekyll    = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
  this.messages  = new this.plugins.messages(this.plugins);
  this.wrapper   = new this.table({
    head:[this.plugins.chalk.cyan.bold('Size'),this.plugins.chalk.cyan.bold('Name')],
    colWidths:[25,50]
  });
  this.executeCommandCwd= {
    cwd:process.cwd()
  }
  this.choicesNew = [
    new this.inquirer.Separator(),
    'Create with firekyll',
    'Create with firekyll and (gulp + browserSync + express + sass)',
    new this.inquirer.Separator()
  ]    
}

/*
 *
 * @function create new post for jekyll
 *
 */

Creator.prototype.newpost = function(){
  var _posts = this.fs.existsSync(this.path.join(process.cwd(),'_posts'));
  if(_posts){
    var _file = this.fs.existsSync(this.path.join('_posts',this.createNamePost()));
    if(_file){
      this.messages.postExists();
    }
    if(!_file){
      this.fs.createReadStream(this.path.join(__dirname,'templates/post'))
        .pipe(this.fs.createWriteStream(this.path.join('_posts',this.createNamePost())));
      this.messages.successCreatePost();
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

Creator.prototype.new = function(){
  var ctx = this;
  this.inquirer.prompt([
    {
      type:'list',
      name:'home',
      message:'What would you like to do?',
      choices:ctx.choicesNew,
    }
  ],function(answers){
    var _project = ctx.fs.existsSync(ctx.path.join(process.cwd(),ctx.program.new));
    if(_project){
      ctx.messages.projectExists();
    }

    if(!_project){
      if(answers.home == ctx.choicesNew[1]){    
        var _commands = ['new',ctx.program.new];
        ctx.utilities.executeCommand(ctx.jekyll,_commands,ctx.cp,ctx.executeCommandCwd);
        ctx.messages.successCreateProject();
      }
      
      if(answers.home == ctx.choicesNew[2]){
        ctx.createGenerator();
        var _commands = ['new',ctx.program.new];
        ctx.utilities.executeCommand(ctx.jekyll,_commands,ctx.cp,ctx.executeCommandCwd);
        ctx.fs.createReadStream(ctx.path.join(__dirname,'/templates/config'))
          .pipe(ctx.fs.createWriteStream(ctx.path.join(ctx.program.new,'_config.yml')));
        ctx.messages.successCreateProject();
      }
    }
  });
}

/*
 *
 * @function server createGenerator
 *
 */

Creator.prototype.createGenerator = function(){
  try{
    var generator = require('firekyll-generator-gulp-webapp');
    var run = new generator();
    run.directory(this.program.new);
  }catch(e){
    this.messages.errorProjectNew(e);
    process.exit();
  }
}

/*
 *
 * @function server jekyll
 *
 */

Creator.prototype.server = function(){
  var _commands = ['server'];
  this.utilities.executeCommand(this.jekyll,_commands,this.cp,this.executeCommandCwd);
  this.messages.server();
}

/*
 *
 * @function build jekyll
 *
 */

Creator.prototype.build = function(){
  var _commands = ['build'];
  this.utilities.executeCommand(this.jekyll,_commands,this.cp,this.executeCommandCwd);
  this.messages.build();
}

/*
 *
 * @function create name post
 * @return {name} - name for post
 *
 */

Creator.prototype.createNamePost = function(){
  var d = new Date();
  var date = [];
  date.push(d.getFullYear());
  date.push(d.getMonth()+1);
  date.push(d.getDate());
  var name = date.join('-')+'-'+this.program.newpost+'.markdown'; 
  return name;
};

/*
 *
 * @function List all posts
 *
 */

Creator.prototype.listPosts = function(){
  var _files = [];
  var stats;
  if(this.fs.existsSync(this.path.join(process.cwd(),'_posts'))){
    _files = this.fs.readdirSync('_posts');
    for (var _i=0; _i<_files.length;_i++) {
      stats = this.fs.statSync(this.path.join(process.cwd(),'_posts',_files[_i]));
        this.messages.listPosts(_files[_i],stats.size,this.wrapper,_files.length);
    };
    process.exit();
  }
  this.messages.directoryPostNotExist();
};

module.exports = Creator;