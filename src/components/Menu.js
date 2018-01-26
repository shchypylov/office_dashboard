import React, {Component} from "react";
import {connect} from "react-redux";
import {changeSidebar, fetchNotifications} from "../actions";
import FaLongArrowLeft from "react-icons/lib/fa/long-arrow-left"
import MdNotificationsActive from "react-icons/lib/md/notifications-active"
import MdMarkunread from "react-icons/lib/md/markunread"
import "../styles/menu.css";

class Menu extends Component {
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
  
  rednerUser() {
    if (this.props.user[0]) {
      const user = this.props.user[0].login;
      return (
          <div className="user">
            <img className="user-icon" src="/img/no_user.jpg" alt=""/>
            {user}
          </div>
      );
    } else {
      return (
          <div className="user">
            <img className="user-icon" src="/img/no_user.jpg" alt=""/>
            Guest
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
    return (
        <div className="top-menu">
          <a href="#" onClick={this.props.changeSidebar}>
            <FaLongArrowLeft size={27} color="white"/>
          </a>
          <div className="top-menu__info">
            <div className="top-menu__notifications">{content}</div>
            <div className="top-menu__user">{this.rednerUser()}</div>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {user: state.user, notifications: state.notifications};
}

const mapDispatchToProps = {
  changeSidebar,
  fetchNotifications
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
