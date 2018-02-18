import React, { Component } from "react";
import { connect } from "react-redux";
import {
  changeSidebar,
  fetchNotifications,
  fetchBalance,
  renderSidebar
} from "../actions";
import cookie from "react-cookies";
import { NavLink, Link } from "react-router-dom";
//material ui
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import AttachMoney from "material-ui/svg-icons/editor/attach-money";
import AccountBox from "material-ui/svg-icons/action/account-box";
import { grey900, white, greenA400 } from "material-ui/styles/colors";
//material ui finish

import "../css/menu.css";

class MenuItems extends Component {
  render() {
    const { args } = this.props;
    const items = this.props.menu;
    const balance = `Balance: ${this.props.balance}`;
    const content = items ? (
      Object.keys(items).map(element => {
        const url = items[element].url;
        return (
          <NavLink to={url} key={element} exact>
            <MenuItem primaryText={items[element].text} />
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
            <IconButton>
              <MoreVertIcon color={white} />
            </IconButton>
          }
          targetOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          <Menu desktop={true} width={320}>
            <MenuItem
              disabled={true}
              leftIcon={<AttachMoney color={grey900} />}
              primaryText={balance}
            />
            {content}
          </Menu>
        </IconMenu>
      </div>
    );
  }
}

class AppBarComponent extends Component {
  state = {
    user: cookie.load("userID")
  };

  render() {
    const { items } = this.props;
    const { cash } = this.props;

    const title = `Hello, ${this.state.user}`;
    return (
      <div>
        <AppBar
          title={title}
          iconElementLeft={
            <Link to="/">
              <IconButton>
                <AccountBox color={white} />
              </IconButton>
            </Link>
          }
          iconElementRight={<MenuItems menu={items} balance={cash} />}
        />
      </div>
    );
  }
}

class MenuComponent extends Component {
  state = {
    user: cookie.load("userID") || "Guest",
    balance: this.props.balance || 0
  };

  componentWillMount() {
    this.props.renderSidebar();
    this.props.fetchBalance(this.state.user);
  }

  render() {
    const { sidebar } = this.props;
    const { balance } = this.props;

    return (
      <div>
        <AppBarComponent items={sidebar} cash={balance} />
      </div>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent);
