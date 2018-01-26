import React, { Component } from "react";
import { connect } from "react-redux";
import { renderSidebar } from "../actions";
import "../styles/sidebar.css";

class Sidebar extends Component {
  componentDidMount() {
    this.props.renderSidebar();
  }

  render() {
    const sidebar = this.props.sidebar;
    const content = sidebar ? (
      sidebar.map((element, index) => {
        return (
          <li key={index}>
            <a href="#">{element}</a>
          </li>
        );
      })
    ) : (
      <div>Loading, please, waits</div>
    );

    let fold = this.props.menu ? "sidebar unfold" : "sidebar fold";

    return (
      <div className={fold}>
        <div className="logo">
          <img src="/img/logo.jpg" alt="logo" />
        </div>
        <ul className="sidebar-menu">{content}</ul>
        <div className="buttons">
          <div className="btn">Facebook Link Here.</div>
          <div className="btn">Twitter Link Here.</div>
        </div>
        <p className="find-more">
          find more <br /> about us <a href="#">click here</a>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sidebar: state.sidebar,
    menu: state.menu
  };
};
const mapDispatchToProps = {
  renderSidebar
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
