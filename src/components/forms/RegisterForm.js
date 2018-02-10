import React, {Component} from "react"
import {connect} from "react-redux"
import {Field, reduxForm} from "redux-form"
import cookies from "react-cookies"
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


const renderField = ({input, label, type, floatingLabelText}) => (
    <div className="row">
      <div className="input-field col s12">
        <TextField {...input} floatingLabelText={floatingLabelText} placeholder={label} type={type}/>
      </div>
    </div>
);


let RegisterComponent = (props) => {
  const {handleSubmit} = props;
  return (
      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-wrap">
          <Field name="login" floatingLabelText="Your login" component={renderField} type="text"/>
        </div>
        <div className="input-wrap">
          <Field name="password" floatingLabelText="Your password" component={renderField} type="password"/>
        </div>
        <div className="input-wrap">
          <Field name="name" floatingLabelText="Your name" component={renderField} type="text"/>
        </div>
        <div className="input-wrap">
          <Field name="surname" floatingLabelText="New surname" component={renderField} type="text"/>
        </div>
        <div className="input-wrap">
          <RaisedButton label="Submit" primary={true} type="submit"/>
        </div>
      </form>
  );
};

class RegisterForm extends Component {
  state = {
    userExists: false,
    missingData: false
  }
  
  submit = val => {
    const {users} = this.props;
    Object.keys(users).map(user => {
      if (!val.login || !val.password) {
        this.setState({
          missingData: true
        })
      }
      else if (val.login !== users[user].login) {
        if (val.login && val.password) {
        
        }
      }
      else {
        this.setState({
          userExists: true
        })
      }
      
    })
  };
  
  
  render() {
    return (
        <div>
          <RegisterComponent onSubmit={this.submit}/>
          {this.state.userExists && (
              <div className="error">
                This user is already exists. Please, login in.
              </div>
          )}
          {this.state.missingData && (
              <div className="error">
                Fill in important filed (login and password)
              </div>
          )}
        </div>
    
    )
    
  }
}

RegisterComponent = reduxForm({
  form: "registerForm"
})(RegisterComponent);


export default RegisterForm