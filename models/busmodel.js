var mongoose = require('mongoose');

var busSchema = new mongoose.Schema({
  busno:{type:String},
  source:{type:String},
  destination:{type:String},
  departuretime:{type:String},
  arrivaltime:{type:String}
});

mongoose.model('bus',busSchema);