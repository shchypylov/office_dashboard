import React, {Component} from 'react';
import {Switch, Route} from "react-router-dom"
import Login from "./Login"
import Dashboard from "./Dashboard"

class App extends Component {
  render() {
    return (
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
        
    );
  }
}


export default App;
