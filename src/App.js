import React, { Fragment } from 'react';
import {
  Switch,
  Route,
  useLocation,
}  from "react-router-dom";
import Landing from './components/pages/landing'
import Story from './components/pages/story';
import Login from './components/login';
import Register from './components/register';
import Auth from './components/pages/auth';
import Header from './components/header';
import Amplify from '@aws-amplify/core';
import aws_exports from './aws-exports';
import useCheckLogin from './helpers/hooks/check-login';

// in this way you are only importing Auth and configuring it.
Amplify.configure(aws_exports);

function App() {
  const query = new URLSearchParams(useLocation().search);

  return (
    <Fragment>
      <Header />
      <Switch>
      <Route exact path="/">
          <Landing />
        </Route>
      <Route path="/story/:storyId?">
          <Story inviteId={query.get('i')} />
      </Route>
      <Route exact path="/login">
        <Auth>
          <Login />
        </Auth>
      </Route>
      <Route exact path="/register">
        <Auth>
          <Register />
        </Auth>
      </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
