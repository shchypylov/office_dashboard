import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <Content />
      </div>
    );
  }
}

export default Dashboard;
