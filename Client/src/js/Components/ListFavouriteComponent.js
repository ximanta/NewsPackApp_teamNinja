var React = require('react');
var FavouriteDisplay= require('./FavouriteDisplay.js');
var ListFav = React.createClass({

   getInitialState:function()
   {
     return {
       newsData:[]
     }
   },
  getNews: function(obj){
    if(!obj){
      obj={};
    }
        $.ajax({
            url:"http://localhost:8080/news/get",
            type:'POST',
            data:obj,
            dataType: 'JSON',
            success: function(data) {
             this.setState({newsData:data});
           }.bind(this),
             error:function(err){
                 console.log(err);
             }.bind(this)
        });
    },
  componentDidMount:function() {
    this.getNews();
  },
deletemovie:function(url){
  alert(url);
  var temp = this.state.newsData;
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
  this.setState({newsData:temp})
},
   render:function(){
     var News;
     if(this.state.newsData.length==0)
     {
      News =  <h1>No favourite news added</h1>
     }
     else {
       var te  = this.deletemovie;
        News = this.state.newsData.map(function(news) {
         return (<FavouriteDisplay  newsObj={news}  del={te}></FavouriteDisplay>
         );
        });
     }
     return(
       <div>
        {News}
       </div>
       )
   }
   });
module.exports = ListFav;
