import React, {Component} from 'react';
import {Field, reduxForm} from "redux-form"
import {connect} from "react-redux"
import cookie from "react-cookies"
import history from "../history"
import {submitUser, fetchUsers} from "../actions"
import "../styles/login.css"


let LoginForm = props => {
  const {handleSubmit} = props;
  return (
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-wrap">
          <label htmlFor="login">Login</label>
          <Field name="login" component="input" type="text"/>
        </div>
        <div className="input-wrap">
          <label htmlFor="password">Password</label>
          <Field name="password" component="input" type="password"/>
        </div>
        <div className="input-wrap">
          <button className="btn" type="submit">Submit</button>
        </div>
      </form>
  )
};

class Login extends Component {
  
  state = {
    error: false,
    user: cookie.load('userID') || "guest"
  };
  
  componentWillMount() {
    this.props.fetchUsers();
  }
  
  submit = values => {
    if (cookie.load('userID') === undefined) {
      const now = new Date();
      cookie.save(
          "userID",
          values.login
      );
      this.props.submitUser(values);
    }
    else {
      const users = this.props.users;
      const userID = cookie.load('userID');
      const user = {};
      Object.keys(users).map(elem => {
        if (users[elem].login === userID) {
          user.login = users[elem].login;
          user.password = users[elem].password
        }
      });
      
      if (values.login === user.login && values.password === user.password) {
        history.push('/dashboard')
      }
      else {
        this.setState({
          error: true
        })
      }
      
    }
    
  };
  
  render() {
    return (
        <div className="login-page">
          <img src="/img/bg.jpg" alt=""/>
          <div className="content">
            <div className="welcome">
              <h1>Hello,</h1>
              <h3>please, log-in</h3>
            </div>
            <LoginForm onSubmit={this.submit}/>
            {this.state.error && <div className="error">
              Sorry, something gone wrong. Double-check your login/password. By the way, your login is:
              <b> {this.state.user}</b>
            </div>
            }
          </div>
        </div>
    );
  }
}

LoginForm = reduxForm({
  form: "login"
})(LoginForm);

const mapDispatchToProps = {
  submitUser,
  fetchUsers
};

export default connect(state => ({
  user: state.user,
  users: state.users
}), mapDispatchToProps)(Login);
