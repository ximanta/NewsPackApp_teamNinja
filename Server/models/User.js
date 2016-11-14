
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userDetailsSchema = new Schema({
  name:{first:String,last:String},
  email:String,
  username: String,
  password: String,
  createdAt:{type:Date,default:Date.now()},
  category:[String]
});
module.exports = mongoose.model('userdetails',userDetailsSchema);
