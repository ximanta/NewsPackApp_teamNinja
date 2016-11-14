var React=require('react');

var SearchComponent=React.createClass({
    getInitialState:function(){
        return({
          SelectOptions:[],
          value:'select',
          Keyword:""
        })
    },
    componentDidMount:function(){
        var url1="http://localhost:8090/user/categories";
        $.ajax({
            url:url1,
            type:'GET',
            dataType:'JSON',
            success:function(data){
                console.log(data);
                this.setState({SelectOptions:data.category});
            }.bind(this),
            error:function(err){
                console.log(err);
            }.bind(this)
        });
    },

    submitHandler: function(){
      if(value=='select')
      {
          this.setState({value:''});
      }
      var category=this.state.value;
      var obj={"category":category,"keyword":Keyword};
      console.log(obj);
      this.getNews(obj);

    },
    changeHandler: function(event){
    this.setState({Keyword:event.target.value});
      this.props.SearchChange(Keyword)
    },

    render:function(){

      var SelectListArr=this.state.SelectOptions.map(function(option){
              console.log('entering');
              return(<option value={option}>{option}</option>);
          });

      return (
        <div>
        <h1>Search Your News</h1>
        <select id='myList' onChange={this.GetCategoryFavourites}>
        <option value="Select">Select</option>
        {SelectListArr}
        </select>
        <br/>
        < input type="text"   size="50"  placeholder="Search a News..."  onChange={this.changeHandler} />  &nbsp; &nbsp;
        <button onClick={this.submitHandler} className="btn btn-large btn-Warning "> Submit </button>
       </div>
     );

       }
   });
module.exports=SearchComponent;
