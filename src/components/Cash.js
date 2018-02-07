import React, {Component} from 'react';
import {connect} from "react-redux";
import Slider from 'material-ui/Slider';
import {addBalance} from "../actions"
import cookie from "react-cookies"
import RaisedButton from 'material-ui/RaisedButton';


class Cash extends Component {
  state = {
    cash: 0,
    user: cookie.load("userID") || "guest"
  };
  
  handleChange = (e, value) => {
    this.setState({
      cash: value * 100
    });
  };
  
  submitBalance = () => {
    let users = this.props.users;
    let login = this.state.user;
    let value = this.state.cash;
    Object.keys(users).map(element => {
      if (login === users[element].login) {
        this.props.addBalance(element, value, users[element].cash)
      }
    })
  };
  
  render() {
    return (
        <div>
          <h1>Here you may add some money</h1>
          <span>{this.state.cash}</span>
          <Slider onChange={this.handleChange}/>
          <RaisedButton label="Primary" primary={true} onClick={this.submitBalance}/>
        </div>
    );
  }
}

const mapDispatchToProps = {
  addBalance
};

export default connect(state => ({
  cash: state.cash,
  users: state.users,
  balance: state.balance
}), mapDispatchToProps)(Cash);
