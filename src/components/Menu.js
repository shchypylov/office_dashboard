import React, {Component} from "react";
import {connect} from "react-redux";
import {changeSidebar, fetchNotifications, fetchBalance, renderSidebar} from "../actions";
import cookie from "react-cookies";
import {NavLink, Link} from "react-router-dom";
//material ui
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AttachMoney from 'material-ui/svg-icons/editor/attach-money';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import {grey900, white} from 'material-ui/styles/colors';
//material ui finish


import "../css/menu.css";


class MenuItems extends Component {
  state = {
    balance: this.props.balance || 0
  };
  
  render() {
    
    const {args} = this.props;
    const items = this.props.menu;
    const balance = `Balance: ${this.state.balance}`;
    const content = items ? (
        Object.keys(items).map(element => {
          const url = items[element].url;
          return (
              <NavLink to={url} key={element} exact>
                <MenuItem primaryText={items[element].text}/>
              </NavLink>
          );
        })
    ) : (
        <div>Loading, please, waits</div>
    );
    return (
        <div>
          <IconMenu
              {...args}
              iconButtonElement={
                <IconButton><MoreVertIcon/></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem leftIcon={<AttachMoney color={grey900}/>} primaryText={balance}/>
            {content}
          
          </IconMenu>
        </div>
    
    )
  }
}

MenuItems.muiName = 'IconMenu';

class AppBarComponent extends Component {
  state = {
    user: cookie.load("userID") || "Guest",
    balance: this.props.balance || 0
  };
  
  handleChange = (event, logged) => {
    this.setState({logged: logged});
  };
  
  
  render() {
    const {items} = this.props;
    const {balance} = this.state;
    const title = `Hello, ${this.state.user}`;
    return (
        <div>
          <AppBar
              title={title}
              iconElementLeft={<Link to="/" onClick={cookie.remove("userID")}>
                <IconButton><AccountBox color={white}/></IconButton></Link>}
              iconElementRight={<MenuItems menu={items} balance={balance}/>}>
          </AppBar>
        </div>
    );
  }
}

class Menu extends Component {
  state = {
    user: cookie.load("userID") || "Guest",
    balance: this.props.balance || 0
  };
  
  componentWillMount() {
    this.props.renderSidebar();
    this.props.fetchBalance(this.state.user);
  }
  
  
  render() {
    const {sidebar} = this.props;
    const {balance} = this.props;
    return (
        <div>
          <AppBarComponent items={sidebar} balance={balance}/>
        </div>
    
    )
  }
}

function mapStateToProps(state) {
  return {
    notifications: state.notifications,
    menu: state.menu,
    balance: state.balance,
    users: state.users,
    sidebar: state.sidebar
  };
}

const mapDispatchToProps = {
  changeSidebar,
  fetchNotifications,
  fetchBalance,
  renderSidebar
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
