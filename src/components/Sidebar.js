import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom"
import {renderSidebar} from "../actions";
import "../styles/sidebar.css";
import  "../styles/fonts.css"


class Sidebar extends Component {
  componentDidMount() {
    this.props.renderSidebar();
  }
  
  render() {
    const sidebar = this.props.sidebar[0];
    const content = sidebar ? (
        Object.keys(sidebar).map(element => {
          const className = `icon ${sidebar[element].icon}`;
          return (
              <li key={element}>
                <a href="#">
                  <i className={className} />
                  <span className="text">
                    {sidebar[element].text}
                  </span>
                </a>
              </li>
          ); 
        })
    ) : (
        <div>Loading, please, waits</div>
    );
    
    let fold = this.props.menu ? "sidebar unfold" : "sidebar fold";
    
    return (
        <div className={fold}>
          <Link to="/" className="logo">
            <img src="/img/logo_head.jpg" alt="logo"/>
          </Link>
          <ul className="sidebar-menu">{content}</ul>
          <div className="buttons">
            <div className="btn">Facebook Link Here.</div>
            <div className="btn">Twitter Link Here.</div>
          </div>
          <p className="find-more">
            find more <br/> about us <a href="#">click here</a>
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
