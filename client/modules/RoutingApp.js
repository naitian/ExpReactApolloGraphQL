import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { HomePage, NotFoundPage } from "./core/components";
import PostPage from "./posts/Post.js";

class RoutingApp extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/posts/:post_id" component={PostPage} />
        <Route exact path="*" component={NotFoundPage} />
      </Switch>
    );
  }
}

export default RoutingApp;
