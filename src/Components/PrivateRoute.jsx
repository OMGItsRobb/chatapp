import React from 'react';
import { Redirect, Route } from 'react-router';

function PrivateRoute({ children, ...routeProps }) {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return <Redirect to="/signin"></Redirect>;
  }

  return <Route {...routeProps}>{children}</Route>;
}

export default PrivateRoute;
