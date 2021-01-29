import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import React, {useState, useEffect, useRef} from 'react';



function App() {

  const shopRef = useRef(null);
  const executeScroll = () => {
    if(shopRef.current){
      shopRef.current.scrollIntoView() ;
    }
  }   

  return (
    <div className="App">
    <div className="wrapAll">
    <BrowserRouter>
      <Navigation executeScroll={executeScroll}/>
      <Switch>
          <Route exact path="/" component={()=> <Home executeScroll={executeScroll} shopRef={shopRef}/>} ></Route>
          <Route path="/sign-in" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
      </Switch>
      
      </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
