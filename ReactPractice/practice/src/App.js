import Login from './component/Login';
import React from "react";
import Join from  "./component/join";
import Home from './component/Home';
class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      isLogin:false,
      user_infos:[{id:"abc",pass:"123456"}],
      mode:"login"
    }
  }

  render(){
    var _article;
    const {mode}=this.state;

    if(mode==="login"){
      _article=<Login     
      user_infos={this.state.user_infos} 
      onChangeMode={function(_mode){
        this.setState({
          mode:_mode,
        })
      }.bind(this)}
      onSubmit={function(id,pass){
        this.setState({
          mode:"home",
          user:{id,pass}
        })
      }.bind(this)}
      ></Login>
    }
    else if(mode==="join"){
      _article=<Join user_infos={this.state.user_infos} onSubmit={function(id,pass){
        var infos=Array.from(this.state.user_infos);
        infos.push({id,pass});
        this.setState({
          user_infos:infos,
          mode:"login",
        })
      }.bind(this)}></Join>
    }
    else if(mode==="find_id"){

    }
    else if(mode==="find_pass"){

    }
    else if(mode==="home"){
      _article=<Home user={this.state.user}></Home>
    }
    return(
    <div className="App">
     {
      _article
     } 
    </div>
    );
  }
}



export default App;
