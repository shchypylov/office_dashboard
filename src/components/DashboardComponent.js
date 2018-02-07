import React, { Component } from "react";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import { connect } from "react-redux";
import cookie from "react-cookies";

class CardExampleWithAvatar extends Component {
  state = {
    user: cookie.load("userID") || "guest"
  };
  
  render() {
    return (
      <Card>
        <CardHeader
          title={this.state.user}
          subtitle="User #0000001"
          avatar="/img/logo.jpg"
        />
        <CardMedia overlay={<CardTitle />}>
          <img src="/img/hello.jpg" alt="" />
        </CardMedia>
        <CardTitle
          title="Hello, friend"
          subtitle="Thanks for using Nikulio's Dashboard"
        />
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis
          pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate
          interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
    );
  }
}

/**
 * DashboardComponent
 */

export class DashboardComponent extends Component {
  render() {
    return (
      <div>
        <CardExampleWithAvatar />
      </div>
    );
  }
}

export default connect()(DashboardComponent);
