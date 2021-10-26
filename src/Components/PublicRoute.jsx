import React from 'react';
import { Redirect, Route } from 'react-router';

function PublicRoute({ children, ...routeProps }) {
  const isLoggedIn = false;

  if (isLoggedIn) {
    return <Redirect to="/"></Redirect>;
  }

  return <Route {...routeProps}>{children}</Route>;
}

export default PublicRoute;
