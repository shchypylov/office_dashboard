import React, {Component} from 'react';
import {connect} from 'react-redux';

class DashFirstRow extends Component {
  render() {
    return (
        <div className="row">
          <div className="bills">
            <div className="title">
              <h2>Bills & Invoices</h2>
            </div>
            <div className="bills-stats">
              <div className="late">
                <span>Late</span>
                <p>32</p>
              </div>
              <div className="unpaid">
                <span>Unpaid</span>
                <p>12</p>
              </div>
              <div className="due">
                <span>Due</span>
                <p>24</p>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(
    mapStateToProps,
)(DashFirstRow);
