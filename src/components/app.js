import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './layout/header';
import FrontPage from './front-page';
import Signin from './auth/signin';
import Signout from './auth/signout';
import Signup from './auth/signup';
import ProtectedPage from './protected';
import RequireAuth from './auth/require-auth';

export default class App extends Component {
  render() {
    return (
      <div>
          <Header />
          <Switch>
            <Route exact path="/" component={FrontPage} />
            <Route path="/signin" component={Signin} />
            <Route path="/signout" component={Signout} />
            <Route path="/signup" component={Signup} />
            <Route path="/protected" component={RequireAuth(ProtectedPage)} />
          </Switch>
      </div>
    );
  }
}
