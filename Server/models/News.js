
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var newsDetailsSchema = new Schema({
  author: String,
  title: String,
  description:String,
  url:String,
  urlToImage:String,
  publishedAt:String,
  category:String,
  comment:String,
  username:String,
  addedAt:{type:Date,default:Date.now()}
});
module.exports = mongoose.model('newsdetails',newsDetailsSchema);
