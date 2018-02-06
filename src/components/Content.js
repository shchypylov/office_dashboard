import React, {Component} from 'react';
import {connect} from 'react-redux';
import Menu from "./Menu.js"
import DashFirstRow from "./DashFirstRow.js"
import "../styles/page-content.css"

class Content extends Component {
  render() {
    return (
        <div className="page-content">
          <Menu />
          {/*<DashFirstRow />*/}
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
