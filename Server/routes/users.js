var express = require('express');
var router = express.Router();
var User = require("../models/User");

/* GET users listing. */
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  else{
    res.json("User Unauthenticated");
  }
}
/*user signup*/
router.route("/signup").post(function(req, res, next) {
  var Obj = req.body;/*object has two fields Username And Password*/
  Obj["category"]=["Others"];/*adding a default category Others*/
  if(check(Obj)){
    Obj.name={first:Obj.firstName,last:Obj.lastName};
    Obj = new User(Obj);/*filter the content according to Schema*/
    User.findOne({username:Obj.username},function(err,data){
      if(err)
        res.send("Some Error Occured!");/*database error*/
      else {
        if(data){
          res.send("Sorry! Another User has already taken this Username. Please continue taking diffrent Username");/*response for user*/
        }
        else{
          User.findOne({email:Obj.email},function(err,data){
            if(err)
            res.send("Some Error Occured!");
            else{
              if(data){
                res.send("Sorry! Another User has already taken this Email. Please continue taking diffrent Email");/*response for user*/
              }
              else{
                Obj.save(function(error){
                  if(error){
                    res.send(error);/*error in saving to database*/
                  }
                  else{
                    console.log("New User Added to database");
                    res.send("Sign Up Successfull. Please Login to Continue");/*sign up success resposne*/
                  }
                });
              }
            }
          })
        }
      }
    });
  }
  else{
    res.send("all field are not sent! Sign up unsuccessfull");
  }
});


/*fetch category name for a perticular user from database*/
router.route("/categories").get(isLoggedIn,function(req,res,next){
  var obj ={username:req.user.username};
  User.findOne(obj,{category:1,_id:0},function(err,data){
      if(err){
        res.send(err);
      }
      else {
        res.send(data);
      }
  });
});



function check(obj){
  if(!obj.firstName)
  return false;
  if(!obj.username)
  return false;
  if(!obj.email)
  return false;
  if(!obj.password)
  return false;
  return true;
}
module.exports = router;
