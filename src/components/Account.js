import React, {Component} from "react";
import TextField from 'material-ui/TextField';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux"
import RaisedButton from 'material-ui/RaisedButton';
import {editUser} from "../actions"
import cookie from "react-cookies"
import "../css/account.css"

const renderField = ({input, label, type, floatingLabelText}) => (
    <div className="row">
      <div className="input-field col s12">
        <TextField {...input} floatingLabelText={floatingLabelText} placeholder={label} type={type}/>
        {/*<label>{label}</label>*/}
      </div>
    </div>
);


let AccountForm = props => {
  const {handleSubmit} = props;
  return (
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-wrap">
          <Field name="login" floatingLabelText="New login" component={renderField} type="text"/>
        </div>
        <div className="input-wrap">
          <Field name="password" floatingLabelText="New password" component={renderField} type="password"/>
        </div>
        
        <div className="input-wrap">
          <Field name="name" floatingLabelText="New name" component={renderField} type="text"/>
        </div>
        
        <div className="input-wrap">
          <Field name="surname" floatingLabelText="New surname" component={renderField} type="text"/>
        </div>
        
        <div className="input-wrap">
          <RaisedButton label="Submit" secondary={true} type="submit"/>
        </div>
      </form>
  );
};

const TextFieldExampleSimple = () => (
    <div>
      <TextField
          hintText="Hint Text"
      /><br/>
      <br/>
      <TextField
          hintText="The hint text can be as long as you want, it will wrap."
      /><br/>
      <TextField
          id="text-field-default"
          defaultValue="Default Value"
      /><br/>
      <TextField
          hintText="Hint Text"
          floatingLabelText="Floating Label Text"
      /><br/>
      <TextField
          defaultValue="Default Value"
          floatingLabelText="Floating Label Text"
      /><br/>
      <TextField
          hintText="Hint Text"
          floatingLabelText="Fixed Floating Label Text"
          floatingLabelFixed={true}
      /><br/>
      <TextField
          hintText="Password Field"
          floatingLabelText="Password"
          type="password"
      /><br/>
      <TextField
          hintText="MultiLine with rows: 2 and rowsMax: 4"
          multiLine={true}
          rows={2}
          rowsMax={4}
      /><br/>
      <TextField
          hintText="Message Field"
          floatingLabelText="MultiLine and FloatingLabel"
          multiLine={true}
          rows={2}
      /><br/>
      <TextField
          hintText="Full width"
          fullWidth={true}
      />
    </div>
);


/**
 * Account
 */

class Account extends Component {
  
  state = {
    user: cookie.load("userID") || "guest",
  };
  
  submit = (props) => {
    let {users} = this.props;
    let login = this.state.user;
    Object.keys(users).map(element => {
      if (login === users[element].login) {
        this.props.editUser(element, login, users[element].password, props);
      }
    })
  };
  
  
  render() {
    return (
        <div className="account-editing">
          <h1>Here you may change your account settings</h1>
          <AccountForm onSubmit={this.submit}/>
        </div>
    );
  }
}

AccountForm = reduxForm({
  form: "accountForm"
})(AccountForm);

export default connect(state => ({users: state.users}), {editUser})(Account);
