import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { Route, Switch, BrowserRouter, HashRouter } from "react-router-dom";
import React, {useRef} from 'react';



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
    <HashRouter
    basename="/"
    forceRefresh={false}
    getUserConfirmation={(message, callback) => {
      const allowTransition = window.confirm(message);
      callback(allowTransition);
    }}
    keyLength={12}
    >
      <Navigation executeScroll={executeScroll}/>
      <Switch>
          <Route exact path="/" component={()=> <Home executeScroll={executeScroll} shopRef={shopRef}/>} ></Route>
          <Route path="/sign-in" component={Login}></Route>
          <Route path="/register" component={()=> <Register/>}></Route>
      </Switch>
      
      </HashRouter>

      {/* <BrowserRouter>
      <Navigation executeScroll={executeScroll}/>
      <Switch>
          <Route exact path="/" component={()=> <Home executeScroll={executeScroll} shopRef={shopRef}/>} ></Route>
          <Route path="/sign-in" component={Login}></Route>
          <Route path="/register" component={()=> <Register/>}></Route>
      </Switch>
      
      </BrowserRouter> */}
    </div>
    </div>
  );
}

export default App;
