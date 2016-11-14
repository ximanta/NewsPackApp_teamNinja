var React = require('react');
var {browserHistory} = require('react-router');
var Signup = React.createClass({

    signUpFunction : function(){
                var firstname = this.refs.fname.value;
                var lastname= this.refs.lname.value;
                var email = this.refs.email.value;
                var username = this.refs.userName.value;
                var password = this.refs.pass.value;
                var confirmpass = this.refs.confirmPass.value;
                if (password==confirmpass)
                {
                var signupForm = {
                    'firstName':this.refs.fname.value,
                    'lastName':this.refs.lname.value,
                    'email':this.refs.email.value,
                    'username': this.refs.userName.value,
                    'password': this.refs.pass.value,
                                        }
                //object1 = JSON.stringify(object1);
                console.log(signupForm);
                $.ajax({
                    url:'http://localhost:8080/user/signup',
                    type: 'POST',
                    data: signupForm,
                    success: function(data)
                    {
                        console.log(data);
                        browserHistory.push('/');
                    }.bind(this),
                    error: function(err)
                    {
                        console.log(err);
                    }.bind(this)
                    });
                }
                else
                {
                        alert("password and confirm password have to be same !!");
                }

},

 render:function(){
   return (

       <div className="container">
           <h1 className="form-signin-heading">Please SIGN UP</h1>
           <div className="input-group input-group-lg">
               <span className="input-group-addon">First Name</span>
               <input type="text" ref='fname' className="form-control"></input>
           </div>
           <br></br>
           <div className="input-group input-group-lg">
               <span className="input-group-addon">Last Name </span>
               <input type="text" ref='lname' className="form-control"></input>
           </div>
           <br></br>
           <div className="input-group input-group-lg">
               <span className="input-group-addon"> Email ID</span>
               <input type="email" ref='email' className="form-control"></input>
           </div>
           <br></br>
           <div className="input-group input-group-lg">
               <span className="input-group-addon">User Name</span>
               <input type="text" ref='userName' className="form-control"></input>
           </div>
           <br></br>
           <div className="input-group input-group-lg">
               <span className="input-group-addon">  Password  </span>
               <input type="password" ref='pass' className="form-control"></input>
           </div>
           <br></br>
           <div className="input-group input-group-lg">
               <span className="input-group-addon">Confirm Password</span>
               <input type="password" ref='confirmPass' className="form-control"></input>
           </div>
           <br></br>
           <button onClick={this.signUpFunction} className="btn btn-lg btn-primary btn-block">SIGN UP</button>
           <br></br>
       </div>

)}
});
module.exports=Signup;
