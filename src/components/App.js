import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Application from "./Application";
import {fetchUsers } from "../actions";
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux"

class App extends Component {
  
  componentWillMount() {
    this.props.fetchUsers();
  }
  
  render() {
    return (
      <MuiThemeProvider>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Application} />
        </Switch>
      </MuiThemeProvider>
    );
  }
}

const mapDispatchToProps = {
  fetchUsers
}

export default withRouter(connect(null, mapDispatchToProps)(App));
