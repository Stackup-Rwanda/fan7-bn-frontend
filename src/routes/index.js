import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../components';
import Error from '../components/error';
import Login from '../pages/auth/Login';
import ProfilePage from '../pages/profile/ProfilePage';
import EditProfilePage from '../pages/profile/EditProfilePage';
import Error403 from '../pages/errors/Error403';
import Error404 from '../pages/errors/Error404';
import Error500 from '../pages/errors/Error500';
import Test from '../components/profile/ProfileForm';
import AuthService from '../utils/AuthService';

export default function index() {
  const isLogedIn = AuthService.isLoggedIn();
  return (
    <Switch>
      <Route path="/dashboard" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route
        path="/profile"
        render={() => (isLogedIn ? <ProfilePage /> : <Redirect to="/login" />)}
      />
      <Route
        path="/edit-profile"
        render={() => (isLogedIn ? <EditProfilePage /> : <Redirect to="/login" />)}
      />
      <Route path="/test" exact component={Test} />
      <Route path="/403" exact component={Error403} />
      <Route path="/404" exact component={Error404} />
      <Route path="/500" exact component={Error500} />
      <Route path="*" component={Error} />
    </Switch>
  );
}
