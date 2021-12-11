var mongoose = require('mongoose'),Bus = mongoose.model('bus');

module.exports={
// All Buses Page
GetAll:function(req,res){
  console.log("list of all buses");
  Bus.find({},function(err,results){
      if(err) throw err;
      res.render('buslist.ejs',{allthebuses:results});
  });
},

//For Home Page
Home:function(req,res){
  console.log("Home Page displayed!");
  res.render('home.ejs');
},

//Search by Destination Page
GetByDestination:function(req,res){
  console.log("list of buses by destination");
  const {destination} = req.query;
  Bus.find({destination},function(err,results){
      if(err) throw err;
      if(results.length == 0)
          {
            res.render('nobuses.ejs');
          }
          else{
                res.render('buslist.ejs',{allthebuses:results});
              }
  });
},

//Add a New Bus Page
AddNewBus:function(req,res){
  console.log("Adding a New Bus");
  var busInfo = req.body;
  busInfo={"busno":req.body.busno,
            "source":req.body.source,
            "destination":req.body.destination,
            "departuretime":req.body.departuretime,
            "arrivaltime":req.body.arrivaltime};
  Bus.create(busInfo,function(err,results){
    if(err) throw err;
    res.redirect('/buses/all');
  });
},

//Edit a Bus Page
EditBus:function(req,res){
  console.log("updating bus details");
  var id = req.params.id;
  Bus.findByIdAndUpdate(id,{busno:req.body.busno,
    source:req.body.source,
    destination:req.body.destination,
    departuretime:req.body.departuretime,
    arrivaltime:req.body.arrivaltime},(err,result)=>{
      if(err) throw err;
      res.redirect('/buses/all');
    });
},

//Delete a Bus Page
DeleteBus:function(req,res){
  console.log("deleting a bus");
  var id = req.params.id;
  Bus.findByIdAndDelete(id,(err,result)=>{
      if(err) throw err;
      res.redirect('/buses/all');
    });
}
}