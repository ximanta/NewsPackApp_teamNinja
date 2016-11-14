var express = require('express');
var router = express.Router();
var News = require("../models/News");
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

/*add news to the database */
router.route("/add").post(isLoggedIn,function(req, res, next) {
  var Obj = req.body;/*body will contain news object from newsapi added on more field category*/
    Obj.username=req.user.username;/*adding userid for news schema*/
    if(!Obj.category){
      Obj.category = "Others";
    }
    if(!Obj.comment){
      Obj.comment = "";
    }
    User.findOne({username:req.user.username,category:{$in:[Obj.category]}},function(err,data){
      if(err){
        res.send("Some Error Occured!");/*database error*/
      }
      else{
        if(data){
          /*category already exist*/
          News.findOne({url:Obj.url,username:req.user.username},function(err,data){
            if(err){
              res.send(err);
            }
            else if(data){
              res.send("News already exist");
            }
            else{
              Obj = new News(Obj);
              Obj.save(function(err){
                if(err){
                  res.send(err);
                }
                else{
                  res.send("News Added Successfully");
                }
              });
            }
          });
        }
        else{
          User.update({username:req.user.username},{$push:{category:Obj.category}},function(error,dataU){
            if(error){
              res.send(error);
            }
            else{
              /*category added successfully*/
              News.findOne({url:Obj.url,username:req.user.username},function(err,data){
                if(err){
                  res.send(err);
                }
                else if(data){
                  res.send("News already exist");
                }
                else{
                  Obj = new News(Obj);
                  Obj.save(function(err){
                    if(err){
                      res.send(err);
                    }
                    else{
                      res.send("News Added Successfully");
                    }
                  });
                }
              });
            }
          });
        }
      }
    });
});

/*fetch news from database according to category and keyword*/
/*object from body will be passed that contain category and keyword both eare optional*/
router.route("/get").post(isLoggedIn,function(req,res,next){
  var obj = {username:req.user.username};
  var keyword = "";
  if(req.body.category){
  obj.category = req.body.category;
  }
  if(req.body.keyword){
    keyword = req.body.keyword;
  }
  News.find(obj,function(err,data){
    if(keyword){
      if(data){
        data = data.map(function(d){
        if((d.description.search(new RegExp(keyword,'i'))>-1)||(d.title.search(new RegExp(keyword,'i'))>-1)||(d.author.search(new RegExp(keyword,'i'))>-1)||(d.comment.search(new RegExp(keyword,'i'))>-1)){
          return d;
        }
        });
      }
    }
    res.json(data);
  });
});

/*update news comment and category */
router.route("/update").put(isLoggedIn,function(req,res,next){
  var obj = req.body;
  News.update({username:req.user.username,url:obj.url},{$set:{comment:obj.comment}},function(err,data){
    if(err){
      res.send(err);
    }
    else{
      if(data.nModified){
        res.send("News updated successfully");
      }
      else{
        res.send("Already up to date");
      }
    }
  });
});

/*delete news from  the database */
router.route("/delete").delete(isLoggedIn,function(req,res,next){
  var obj = req.body;
  News.remove({username:req.user.username,url:obj.url},function(err,data){
    if(err){
      res.send(err);
    }
    else{
      if(data.result.n){
        res.send("News deleted Successfully");
      }
      else{
        res.send("News is not available to delete");
      }
    }
  });
});
module.exports = router;
