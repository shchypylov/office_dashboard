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
  
  submit = values => {
    this.props.submitUser(values);
    history.push('/dashboard')
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
          </div>
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
