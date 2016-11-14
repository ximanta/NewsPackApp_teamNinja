var React = require('react');
var Footer = React.createClass({

  render : function(){
    return(
        <footer style={{backgroundColor : '#009595'}} className="footer navbar-fixed-bottom">
          <div style={{color:'#ffffff'}} className="container">
            <div className="row">
              <div className="col-sm-3">
                <h5>Copyright &copy 2016</h5>
                <h5>News Search Coorporation</h5>
              </div>
              <div className="col-sm-5">
                <h5>About Us</h5>
                <p>THE GREATEST FILMS The "Greatest" and the "Best" </p>
                <p>in Cinematic History. COME.. SEARCH.. ENJOY..!!</p>
                </div>
                <div className="col-sm-2">
                  <h5>Follow Us</h5>
                    <span className="fa fa-facebook-official"></span>&emsp;
                    <span className="fa fa-twitter"></span>&emsp;
                    <span className="fa fa-instagram"></span>&emsp;
                    <span className="fa fa-youtube-play"></span>&emsp;
                </div>
                <div className="col-sm-2">
                  <h6>Coded  With  <span className="glyphicon glyphicon-heart"></span>  by  Team Ninja</h6>
                </div>
              </div>
            </div>
          </footer>
    );
  }
});

module.exports = Footer;
