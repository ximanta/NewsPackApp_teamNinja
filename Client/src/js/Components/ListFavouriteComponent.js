var React = require('react');
var FavouriteDisplay= require('./FavouriteDisplay.js');
var SearchComponent = require('./SearchComponent');
var ListFav = React.createClass({
  getInitialState:function()
  {
    return {
      Newsdata:[]
    }
  },
  getNews: function(obj){
    if(!obj) obj={};
    $.ajax({
      url:"http://localhost:8080/news/get",
      type:'POST',
      data:obj,
      dataType: 'JSON',
      success: function(data) {
        this.setState({Newsdata:data});
      }.bind(this),
      error:function(err){
        console.log(err);
      }.bind(this)
    });
  },
  componentDidMount:function() {
    this.getNews(null);
  },
  deletemovie:function(url){
    alert(url);
    var temp = this.state.Newsdata;
    j=-1;
    for(var i=0;i<temp.length;i++){
      if(temp[i].url==url){
        j=i;
        break;
      }
    }
    if(j>-1){
      temp.splice(j,1);
    }
    this.setState({Newsdata:temp})
  },
  updateReRender:function(d){
  var temp = this.state.Newsdata;
  alert(d);
  for(var i=0;i<temp.length;i++){
    if(temp[i].url==d.url){
      temp[i].comment=d.comment;
      break;
    }
  }
  this.setState({Newsdata:temp})
},
  render:function(){
    var News;
    if(this.state.Newsdata.length==0)
    {
      News =  <h1>No favourite news added</h1>
    }
    else {
      var tempData  = this.deletemovie;
      var tempUpdate = this.updateReRender;
      News = this.state.Newsdata.map(function(news) {
        return (<FavouriteDisplay  newsObj={news} updateRender={tempUpdate} del={tempData}></FavouriteDisplay>
        );
      });
    }
    return(
      <div>
      <SearchComponent getNews={this.getNews} />
      {News}
      </div>
    )
  }
});
module.exports = ListFav;
