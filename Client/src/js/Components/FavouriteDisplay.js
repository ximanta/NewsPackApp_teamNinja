var React = require('react');
var FavouriteDisplay= React.createClass({
  updateNews: function(){
  var comment = this.refs.comment.value;
  var toBeUpdateObj =  {'url':this.props.newsObj.url,'comment':comment};
  alert(comment);
   url = this.props.newsObj.url;
   var updateRender = this.props.updateRender.bind(null,url);
   $.ajax({
     url:'http://localhost:8080/news/update',
     type: 'PUT',
     data: toBeUpdateObj,

     success: function(data)
     {
       alert("in success");
       updateRender();
       alert(data);
     }.bind(this),
     error: function(err)
     {
       console.log(err);
     }.bind(this)
   });
 },
  deleteFavNews:function()
  {
   //alert(title);
   var toBeDeleteObj = this.props.newsObj;
   url = this.props.newsObj.url;
   alert(url);
   var deleteFromURL = this.props.del.bind(null,url);
  $.ajax({
    url:'http://localhost:8080/news/delete/',
    type: 'DELETE',
    data : toBeDeleteObj,

    success: function(data)
    {
      alert(url);
      deleteFromURL();
    }.bind(this),
    error: function(err)
    {
      console.log(err);
    }.bind(this)
  });
  },
  render: function(){
    var title=this.props.newsObj.publishedAt;
   console.log(title);
   var titleID='';
   for(var i=0;i<title.length;++i){
     if(title.charAt(i)==='-'||title.charAt(i)===':'){
       continue;
     }
     else{
       titleID+=title.charAt(i);
     }
   }
   console.log(titleID);
    return (
      <div className="container" id="movieElement">
      <div style={{backgroundColor:'#CCCCCC'}} className="row">
      <div className="col-xs-4">
      <div >
      <img style={{width: 350, height: 400}} src={this.props.newsObj.urlToImage}></img></div>
      </div>
      <div className="col-xs-8">
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <div style={{fontSize:'30px'}}>
      <h3>{this.props.newsObj.title}</h3>
      </div>
      <div className="form-group form-group-sm">
    <label className="col-sm-2 control-label" htmlFor="formGroupInputLarge">Desciprion:</label>
    <div className="col-sm-10">
    <input className="form-control" id="disabledInput" type="text" placeholder={this.props.newsObj.description} disabled></input><p></p>
    </div>
    </div>
    <div className="form-group form-group-sm">
  <label className="col-sm-2 control-label" htmlFor="formGroupInputLarge">Published:</label>
  <div className="col-sm-10">
      <input className="form-control" id="disabledInput" type="text" placeholder={this.props.newsObj.publishedAt} disabled></input><p></p>
  </div>
  </div>
  <div className="form-group form-group-sm">
<label className="col-sm-2 control-label" htmlFor="formGroupInputLarge">Category:</label>
<div className="col-sm-10">
<input className="form-control" id="disabledInput" type="text" placeholder={this.props.newsObj.category} disabled></input><p></p>
</div>
</div>
<div className="form-group form-group-sm">
<label className="col-sm-2 control-label" htmlFor="formGroupInputLarge">Comments:</label>
<div className="col-sm-10">
<input className="form-control" id="disabledInput" type="text" placeholder={this.props.newsObj.comment} disabled></input><p></p>
</div>
</div>
  <div className="form-group form-group-sm">
<label className="col-sm-1 control-label" htmlFor="formGroupInputLarge"></label>
<div className="col-sm-11">
<a id="modal-195236" href={'#'+titleID} role="button" className="btn" data-toggle="modal">
<button className="btn btn-primary btn-sm">UPDATE <span className="glyphicon glyphicon-check"></span></button></a>&emsp;&emsp;
<button onClick={this.deleteFavNews} className="btn btn-primary btn-sm">DELETE <span className="glyphicon glyphicon-trash"></span></button>&emsp;&emsp;
   <a href={this.props.newsObj.url} target="_blank"><button className="btn btn-success btn-sm">Check full News<span className="glyphicon glyphicon-eye-open"></span></button></a>
</div>
</div>
      </div>
      </div>
      <div className="row">
      <div className="col-md-12">
      <p></p>
      </div>
      </div>

      <div className="modal fade" id={titleID} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">

              <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                ×
              </button>
              <h4 className="modal-title" id="myModalLabel">
                Modal title
              </h4>
            </div>
            <div className="modal-body">
              <p>
                <small className="text-muted">Mention your Category------</small>
              </p>
              <hr/>
              <form className="form-horizontal" action="index.html" method="post">
                <div className="form-group">
                  <label className="col-lg-2 control-label" htmlFor="inputEmail">Comments</label>
                  <div className="col-lg-10">
                    <input type="text" ref="comment" className="form-control" placeholder={this.props.newsObj.comment} ></input>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">
                Close
              </button>
              <button onClick={this.updateNews} type="button" data-dismiss="modal" className="btn btn-success">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
});

module.exports = FavouriteDisplay;
