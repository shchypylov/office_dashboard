import React, {Component} from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {submitUser} from "../../actions";
import cookie from "react-cookies";
import history from "../../history";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


const renderField = ({input, label, type, floatingLabelText}) => (
    <div className="row">
      <div className="input-field col s12">
        <TextField {...input} floatingLabelText={floatingLabelText} placeholder={label} type={type}/>
      </div>
    </div>
);


let LoginComponent = props => {
  const {handleSubmit} = props;
  return (
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-wrap">
          <Field name="login" floatingLabelText="Your login" component={renderField} type="text"/>
        </div>
        <div className="input-wrap">
          <Field name="password" floatingLabelText="Your password" component={renderField} type="password"/>
        </div>
        <div className="input-wrap submit-wrap">
          <RaisedButton label="Submit" className="submit-button" primary={true} type="submit"/>
        </div>
      </form>
  );
};


class LoginForm extends Component {
  
  state = {
    current_user: "",
    login_error: false,
    user_exists_error: false,
    empty_data_error: false,
    user: cookie.load("userID") || "Guest"
  }
  
  submit = values => {
    
    let {users} = this.props;
    if (values.login && values.password) {
      Object.keys(users).map(element => {
        if (values.login === users[element].login && values.password === users[element].password) {
          cookie.remove("userID");
          cookie.save("userID", values.login);
          history.push("/dashboard/dash");
        }
        else {
          this.setState({
            login_error: true,
            empty_data_error: false,
          });
        }
      })
    }
    else {
      this.setState({
        empty_data_error: !this.state.empty_data_error,
        login_error: false,
      });
    }
  };
  
  render() {
    return (
        <div>
          <LoginComponent onSubmit={this.submit}/>
          {this.state.login_error && (
              <div className="error">
                Error. Double-check your login/password or create another account
              </div>
          )}
          {this.state.empty_data_error && (
              <div className="error">
                Considering putting some data?
                <br/>
                <b style={{display: "block"}}> {this.state.current_user}</b>
              </div>
          )}
        </div>
    );
  }
}

LoginComponent = reduxForm({
  form: "loginForm"
})(LoginComponent);

const mapDispatchToProps = {
  submitUser
};

export default connect(null, mapDispatchToProps)(LoginForm);
