var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

require('./models/busmodel');

mongoose.connect('mongodb+srv://komalnayan:1234@cluster0.nw2jo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useUnifiedTopology:true},{useNewUrlParser:true});

const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error!'));
db.once('open',function(){
  console.log("Mongoose is connected")
});

var busController = require('./controllers/buscontroller.js');

app.get('/',busController.Home);

app.get('/buses/searchbydestination',busController.GetByDestination);

app.get('/buses/all',busController.GetAll);

app.post('/buses/addbus',busController.AddNewBus);

app.get('/add',function(req,res){
  res.render('addBus.ejs');
});
app.get('/edit/:id',(req,res)=>{
  let id = req.params.id;
  var Bus = mongoose.model('bus')
  Bus.findById(id,(err,bus)=>{
    if(err) throw err;
    res.render('editbus.ejs',{title: "Edit Bus", bus: bus });
  });
});

app.get('/book/:id',(req,res)=>{
  let id = req.params.id;
  var Bus = mongoose.model('bus')
  Bus.findById(id,(err,bus)=>{
    if(err) throw err;
    res.render('ticket.ejs',{title: "Ticket", bus: bus });
  });
});

app.get('/delete/:id',busController.DeleteBus);
app.post('/buses/edit/:id',busController.EditBus);
app.listen(3000);