var React = require('react');
var NewsDisplayBox = require('./NewsDisplayBox.js');

var DisplayNews = React.createClass({
  render : function () {
    var newsArray = this.props.newsObj.map(function(news) {
      return(
        <NewsDisplayBox newsObj={news} />
      )
    });
    return(
      <div>
      {newsArray}
      </div>
    )
  }
});

module.exports = DisplayNews;
