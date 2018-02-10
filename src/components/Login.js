import React, {Component} from "react";
import {connect} from "react-redux";
import Toggle from 'material-ui/Toggle';
import "../css/login.css";
import LoginForm from "./forms/LoginForm"
import RegisterForm from "./forms/RegisterForm"
import {fetchUsers} from "../actions";


const styles = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: 'red',
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
  labelStyle: {
    color: 'red',
  },
};


class Login extends Component {
  state = {
    form: false,
  };
  
  componentWillMount() {
    this.props.fetchUsers();
  }
  
  
  formChange = (event, isInputChecked) => {
    this.setState({
      form: isInputChecked
    })
  };
  
  
  render() {
    const {users} = this.props;
    return (
        <div className="login-page">
          <div className="content">
            <div className="welcome">
              <h1>Welcome!</h1>
            </div>
            <div style={styles.block}>
              <Toggle
                  label="Register new?"
                  style={styles.toggle}
                  onToggle={this.formChange}
              />
            </div>
            {this.state.form ? <RegisterForm users={users}/> : <LoginForm users={users}/>}
          
          </div>
        </div>
    );
  }
}


const mapDispatchToProps = {
  fetchUsers
};

export default connect(
    state => ({
      user: state.user,
      users: state.users
    }),
    mapDispatchToProps
)(Login);


