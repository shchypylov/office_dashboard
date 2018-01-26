import React, {Component} from 'react';
import {connect} from 'react-redux';
import Menu from "./Menu.js"
import "../styles/page-content.css"

class Content extends Component {
  render() {
    return (
        <div className="page-content">
          <Menu />
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
    mapStateToProps,
)(Content);
