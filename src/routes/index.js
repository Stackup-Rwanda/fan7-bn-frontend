import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Route from './Route';
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
import Signup from '../pages/Authentication/Signup';
import EmailConfirm from '../pages/Authentication/EmailVerification';
import Dashboard from '../pages/Dashboard/dashboard';
import ForgetPassword from '../pages/forgetPassword';
import ResetPassword from '../pages/resetPassword';
import UserRole from '../components/admin/userRole';


export default function index() {
  const isLogedIn = AuthService.isLoggedIn();
  return (
    <Switch>
IsPrivate path="/" exact component={Home} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/login" exact component={Login} />
      <Route
        path="/profile"
        render={() => (isLogedIn ? <ProfilePage /> : <Redirect to="/login" />)}
      />
      <Route
        path="/edit-profile"
        render={() => (isLogedIn ? <EditProfilePage /> : <Redirect to="/login" />)}
      />
      <Route 
        path="/userrole" 
        render={() => (isLogedIn ? <UserRole /> : <Redirect to="/login" />)}
      />
      <Route path="/test" exact component={Test} />
      <Route path="/403" exact component={Error403} />
      <Route path="/404" exact component={Error404} />
      <Route path="/500" exact component={Error500} />
      <Route path="/confirmEmail" exact component={EmailConfirm} />
      <Route path="/dashboard" exact component={Dashboard} isPrivate />
      <Route path="/forgetPassword" exact component={ForgetPassword} />
      <Route path="/resetPassword" exact component={ResetPassword} />
      <Route path="*" component={Error} />
    </Switch>
  );
}
