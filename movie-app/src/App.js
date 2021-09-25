import React from 'react';
import Home from './routes/Home';
import About from './routes/About';
import Detail from './routes/Detail';
import Navigation from './components/Navigation';
import "./App.css";
import {HashRouter,Route} from "react-router-dom";

function App(){
  return(
    <HashRouter>
      <Navigation></Navigation>
      <Route path="/" exact={true} component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/movie/:id" component={Detail}/>
    </HashRouter>
  );
}

export default App;