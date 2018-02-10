import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import cookie from "react-cookies";
import history from "../history";
import {submitUser, fetchUsers} from "../actions";
import Toggle from 'material-ui/Toggle';
import "../css/login.css";

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
          <button className="btn" type="submit">
            Submit
          </button>
        </div>
      </form>
  );
};


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
    current_user: "",
    login_error: false,
    user_exists_error: false,
    empty_data_error: false,
    user: cookie.load("userID") || "You don't have account yet, so just create it"
  };
  
  componentWillMount() {
    this.props.fetchUsers();
  }
  
  submit = values => {
    
    let {users} = this.props;
    if (values.login && values.password) {
      Object.keys(users).map(element => {
        if (values.login === users[element].login) {
          if (cookie.load("userID") === undefined) {
            cookie.save("userID", values.login);
            this.props.submitUser(values);
          } else {
            const userID = cookie.load("userID");
            const user = {};
            Object.keys(users).map(elem => {
              if (users[elem].login === userID) {
                user.login = users[elem].login;
                user.password = users[elem].password;
              }
            });
            if (values.login === user.login && values.password === user.password) {
              history.push("/dashboard/dash");
            } else {
              this.setState({
                login_error: true
              })
            }
          }
        }
        else {
          this.setState({
            login_error: true,
            empty_data_error: false,
            user_exists_error: false
          });
        }
        // else {
        //   this.setState({
        //     current_user: users[element].login,
        //     user_exists_error: !this.state.user_exists_error
        //   });
        // }
      })
    }
    else {
      this.setState({
        empty_data_error: !this.state.empty_data_error,
        login_error: false,
        user_exists_error: false,
      });
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
            
            <div style={styles.block}>
              <Toggle
                  label="Register new?"
                  style={styles.toggle}
              />
            </div>
            
            
            <LoginForm onSubmit={this.submit}/>
            {this.state.login_error && (
                <div className="error">
                  Sorry, something gone wrong. Double-check your login/password or create another account
                </div>
            )}
            {this.state.user_exists_error && (
                <div className="error">
                  C'mon, you are already have account here! Your login is :
                  <br/>
                  <b style={{display: "block"}}> {this.state.current_user}</b>
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

export default connect(
    state => ({
      user: state.user,
      users: state.users
    }),
    mapDispatchToProps
)(Login);


