var React = require('react');
var {Link} = require('react-router');
var DisplayNews = require('./DisplayNews.js');

var HomeComponent = React.createClass({
  getInitialState: function () {
    return {
      stateNews : []
    };
  },
  source(str){
    var source = str;
    $.ajax({
      url:'https://newsapi.org/v1/articles?source='+source+'&apiKey=d39a8bf66cc946f380211c5759769af5',
      type: 'GET',
      dataType: 'JSON',
      success: function(data)
      {
        console.log("Ajax login success");
        this.setState({stateNews:data.articles});
        //console.log(data.articles);
      }.bind(this),
      error: function(err)
      {
        console.log(err);
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="container-fluid">
        <img src="../css/edit.png"></img>
        <div className="container">
        	<div className="row">
        		<div className="col-sm-4">
              <img style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}} src="../css/e.jpg" className="img-rounded"></img>
              <br></br>
              <button onClick={this.source.bind(null,'bbc-news')} type="button" className="btn btn-warning active btn-lg btn-block">
				          BBC-NEWS
			        </button>
        		</div>
        		<div className="col-sm-4">
              <img style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}} src="../css/f.jpg" className="img-rounded"></img>
              <br></br>
              <button onClick={this.source.bind(null,'financial-times')} type="button" className="btn btn-warning active btn-lg btn-block">
				          FINANCIAL TMES
			        </button>
        		</div>
        		<div className="col-sm-4">
              <img style={{display: 'block', marginLeft: 'auto', marginRight: 'auto'}} src="../css/g.png" className="img-rounded"></img>
              <br></br>
              <button onClick={this.source.bind(null,'espn')} type="button" className="btn btn-warning active btn-lg btn-block">
				          ESPN-NEWS
			        </button>
        		</div>
        	</div>
        </div>
        <br/>
        <br/>
        <br/>
        <DisplayNews newsObj={this.state.stateNews}/>
      </div>
    )
  }
});

module.exports = HomeComponent;
