var cp = require('child_process');
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
  var d = new Date();
  var fetch = [];
  fetch.push(d.getFullYear());
  fetch.push(d.getDate());
  fetch.push(d.getDay());
  var name = fetch.join('-')+'-'+this.commander.args[1]+'.markdown'; 
  console.log(name);
};

creator.prototype.new = function(){
  console.log('create project jekyll..');
  cp.spawn(
	'jekyll',
    ['new',this.commander.args[1]],
    {
        cwd:process.cwd()
    });

}
module.exports = creator;
