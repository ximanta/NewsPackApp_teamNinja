wovar React = require('react');
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
          url:"http://localhost:8090/news/get",
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
   render:function(){
     var News;
     if(this.state.Newsdata.length==0)
     {
      News =  <h1>No favourite news added</h1>
     }
     else {
        News = this.state.Newsdata.map(function(news) {
         return (<FavouriteDisplay  newsObj={news} ></FavouriteDisplay>
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
