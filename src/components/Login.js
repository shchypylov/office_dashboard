import React, {Component} from 'react';
import {Field, reduxForm} from "redux-form"
import {connect} from "react-redux"
import history from "../history"
import {submitUser} from "../actions"
import "../styles/login.css"


let LoginForm = props => {
  const {handleSubmit} = props;
  return (
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label htmlFor="login">Login</label>
          <Field name="login" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Field name="password" component="input" type="password"/>
        </div>
        <button type="submit">Submit</button>
      </form>
  )
};

class Login extends Component {
  
  submit = values => {
    this.props.submitUser(values);
    history.push('/dashboard')
  };
  
  render() {
    return (
        <div className="login-page">
          <img src="/img/bg.jpg" alt=""/>
          <h1>Hello, friend</h1>
          <LoginForm onSubmit={this.submit}/>
        </div>
    );
  }
}

LoginForm = reduxForm({
  form: "login"
})(LoginForm);

const mapDispatchToProps = {
  submitUser
}

export default connect(state => ({
  user: state.user
}), mapDispatchToProps)(Login);
