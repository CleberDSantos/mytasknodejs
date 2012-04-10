var express = require('express');
var app = express.createServer();

var mongoose = require('mongoose');
mongoose.connect('mongodb://root:1234@staff.mongohq.com:10093/tasks');

var Schema = mongoose.Schema;

var Task = new Schema({
    title  :  { type: String, default: 'Tarefa 1' }
  , description   :  { type: String }
});

var TaskModel = mongoose.model('Task',Task);

var objTask = new TaskModel();
objTask.title = "Minha segunda tarefa";
objTask.description = "Apenas uma descrição";

objTask.save(function(err) {
  if (err) throw err;
  console.log('Tarefa salva, starting server...');

}); 
/**/

app.configure(function () {
    app.use(express.logger());
    app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/static'));
})

//configurando as mensagens de erro
app.configure('developer',function (){

	app.use(express.logger());
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack:true
	}));

})

app.configure('prodution',function (){
	app.use(express.errorHandler());
})

//configurando a view
app.set('views', __dirname + '/views');
app.set('view engine','jade');
app.set('view options', {layout: true})


//metodo de chamada padrao - index
app.get('/', function(req, res){
	//res.render('task/list')
    TaskModel.find({},function(err,result){
        res.render('task/list',{locals:{
		tasks: result
		}});
        
    })
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
