var should = require("chai").should(),
 expect = require("chai").expect,
// assert = require("chai").assert,
supertest = require("supertest"),
app = require("../bin/www");
var sinon = require('sinon');
var model = require('../models/News.js');
var modelStub = sinon.stub(model, 'find');
var url = supertest("http://localhost:8080/news");
var url1 = supertest("http://localhost:8080");
describe("Testing add news", function(err){
    it("should login",function(done){
        url1
        .post("/login")
        .expect(200)
        .send({username:"sunjna",password:"123"})
        .end(function(err,res){
            res.text.should.be.equal('{"responseText":"Authorised"}')
                 done();
        })
            })
 it("should respond", function(done){
   url
   .post("/add")
   .expect(200)
   .send({
       "author": "BBC News",
       "title": "Trump likes main Obamacare provisions 'very much",
       "description":"Donald Trump says he is open to keeping parts of the 2010 health bill that he had labelled a \"disaster\".",
       "url": "http://www.bbc.co.uk/news/election-us-2016-37953528",
       "urlToImage": "http://ichef.bbci.co.uk/news/1024/cpsprodpb/57DA/production/_92409422_hi036281407.jpg",
       "publishedAt": "2016-11-12T04:27:28Z",
       "category":"politics",
       "comment":"recent news",
       "username":"xyz"

   })
   .end(function(err,res){
     res.text.should.be.equal('"User Unauthenticated"');
     done();
   });
 });






  it("should handle and send the computed info", function(done){
    url
        .put("/update")
        .expect(200)
        .send({
            "author": "BBC News",
            "title": "Trump likes main Obamacare provisions 'very much",
            "description":"Donald Trump says he is open to keeping parts of the 2010 health bill that he had labelled a \"disaster\".",
            "url": "http://www.bbc.co.uk/news/election-us-2016-37953528",
            "urlToImage": "http://ichef.bbci.co.uk/news/1024/cpsprodpb/57DA/production/_92409422_hi036281407.jpg",
            "publishedAt":  "2016-11-12T04:27:28Z",
            "category":"politics",
            "comment":"recent news",
            "username":"xyz"

        })
        .end(function(err,res){
          should.not.exist(err);
              res.text.should.be.equal('"User Unauthenticated"');
          done();
        });

  });





  it("should handle and send the computed info", function(done){
    url
    .delete("/delete")
   .expect(200)
   .send({
       "author": "BBC News",
       "title": "Trump likes main Obamacare provisions 'very much",
       "description":"Donald Trump says he is open to keeping parts of the 2010 health bill that he had labelled a \"disaster\".",
       "url": "http://www.bbc.co.uk/news/election-us-2016-37953528",
       "urlToImage": "http://ichef.bbci.co.uk/news/1024/cpsprodpb/57DA/production/_92409422_hi036281407.jpg",
       "publishedAt": "2016-11-12T04:27:28Z",
       "category":"politics",
       "comment":"recent news",
       "username":"xyz"

   })
   .end(function(err,res){
     should.not.exist(err);
    res.text.should.be.equal('"User Unauthenticated"');
     done();
   });

  });




  it("should handle and send the computed info", function(done){
    url
        .get("/get")
        .expect(200)
        .expect('Content-Type', /json/ )
        .end(function(err,res){
         var Obj=   JSON.parse(res.text);
         Obj.should.be.instanceOf(Array);
          done();
        });

  });
});
