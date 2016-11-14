var should = require("chai").should(),
 expect = require("chai").expect,
// assert = require("chai").assert,
supertest = require("supertest"),
app = require("../bin/harsh");
var sinon = require('sinon');
var model = require('../models/User.js');
var modelStub = sinon.stub(model, 'find');

var url = supertest("http://localhost:8080");

describe('Test my controller', function(){
  describe('Find items', function(){
    beforeEach(function(){
      modelStub.yields(null, [{'itemid': 1, 'itemname': 'goods'}]);
    });
    it('should attempt to find items', function(done){
      url
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if (err) return done(err);
          //console.log(res.body);
          //Enter your assertions here
          expect(res.body[0].itemname).to.be.equal("goods");
          done();
        });
    });
  });
  describe('Find a item given the argument', function(){
      beforeEach(function(done){
        modelStub1.withArgs({'itemid':4}).yields(null, [{'itemid': 4, 'itemname': 'Goods 45'}]);
        modelStub1.withArgs({'itemid':5}).yields(null, [{'itemid': 5, 'itemname': 'Goods 55'}]);
        done();
      });

    it('should attempt to find items', function(done){
      url
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res){
          if (err) return done(err);
          // console.log(res.body);
          // Enter your assertions here
          expect(res.body[0].itemname).to.be.equal("Goods 45");

        });
        done();
    });
  });
});
