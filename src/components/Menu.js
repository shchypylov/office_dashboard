import React, {Component} from "react";
import {connect} from "react-redux";
import {changeSidebar, fetchNotifications} from "../actions";
import MdNotificationsActive from "react-icons/lib/md/notifications-active"
import MdMarkunread from "react-icons/lib/md/markunread"
import MdArrowBack from "react-icons/lib/md/arrow-back"
import MdArrowDropDown from "react-icons/lib/md/arrow-drop-down"
import "../styles/menu.css"

class Menu extends Component {
  
  state = {
    arrow_active: false
  };
  
  componentDidMount() {
    this.props.fetchNotifications();
  }
  
  renderNotifications() {
    const notifications = this.props.notifications;
    return Object.keys(notifications).map(elem => {
      if (elem === 'Notifications') {
        return (
            <div className="item" key={elem}>
              <MdNotificationsActive size={27} color="white"/>
              <span className="unchecked-event">
                {notifications[elem]}
              </span>
            </div>
        );
      }
      else {
        return (
            <div className="item" key={elem}>
              <MdMarkunread size={27} color="white"/>
              <span className="unchecked-event">
                {notifications[elem]}
              </span>
            </div>
        );
      }
      
    });
  }
  
  renderUser() {
    if (this.props.user[0]) {
      const user = this.props.user[0].login;
      return (
          <div className="top-menu__user">
            <img className="user-icon" src="/img/no_user.jpg" alt=""/>
            <span>{user}</span>
          
          </div>
      );
    } else {
      return (
          <div className="top-menu__user">
            <img className="user-icon" src="/img/no_user.jpg" alt=""/>
            <span>Guest</span>
            <MdArrowDropDown size={19} color="white"/>
          </div>
      );
    }
  }
  
  render() {
    const content = this.renderNotifications() ? (
        this.renderNotifications()
    ) : (
        <div>Loading...</div>
    );
    const changeSidebar = !this.props.menu ? "active change-sidebar" : "change-sidebar";
    return (
        <div className="top-menu">
          <a href="#" onClick={this.props.changeSidebar} className={changeSidebar}>
            <MdArrowBack size={27} color="white"/>
          </a>
          
          <div className="top-menu__info">
            <div className="top-menu__notifications">{content}</div>
            {this.renderUser()}
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {user: state.user, notifications: state.notifications, menu: state.menu};
}

const mapDispatchToProps = {
  changeSidebar,
  fetchNotifications
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
