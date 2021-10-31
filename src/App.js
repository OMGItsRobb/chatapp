import React from 'react';
import { Switch } from 'react-router';
import 'rsuite/dist/rsuite.min.css';
import PrivateRoute from './Components/PrivateRoute';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import PublicRoute from './Components/PublicRoute';
import './styles/main.scss';
import { ProfileProvider } from './context/profile.context';

function App() {
  return (
    <ProfileProvider>
      <Switch>
        <PublicRoute path="/signin">
          <SignIn></SignIn>
        </PublicRoute>
        <PrivateRoute path="/">
          <Home></Home>
        </PrivateRoute>
      </Switch>
    </ProfileProvider>
  );
}

export default App;
