import React, { Component } from "react";
import { connect } from "react-redux";
import { Pie, Cell, PieChart, Legend } from "recharts";
import "../styles/bills.css";

class DashFirstRow extends Component {
  render() {
    const data = [
      { name: "Late Payments", value: 400 },
      { name: "Due Payments", value: 300 },
      { name: "Unpaid Payments", value: 300 }
    ];
    const COLORS = ["#00c5b2", "#ff5252", "#ffa32d"];

    const RADIAN = Math.PI / 180;

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
        <div className="bills-progress">
          <div className="title">
            <h2>Graph progress</h2>
          </div>
          <div className="graph">
            <PieChart width={300} height={300}>
              <Legend verticalAlign="right" height={30} />
              <Pie
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                data={data}
              >
                {data.map((entry, index) => (
                  <Cell fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(DashFirstRow);
