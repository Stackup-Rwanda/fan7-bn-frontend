import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Error from '../components/error';
import Login from '../pages/auth/Login';
import ProfilePage from '../pages/profile/ProfilePage';
import EditProfilePage from '../pages/profile/EditProfilePage';
import Error403 from '../pages/errors/Error403';
import Error404 from '../pages/errors/Error404';
import Error500 from '../pages/errors/Error500';
import Test from '../components/Table/TableLoader';
import AuthService from '../utils/AuthService';
import Signup from '../pages/Authentication/Signup';
import EmailConfirm from '../pages/Authentication/EmailVerification';
import Dashboard from '../pages/Dashboard/dashboard';
import ForgetPassword from '../pages/forgetPassword';
import ResetPassword from '../pages/resetPassword';
import UserRole from '../components/admin/userRole';
import ProtectedRoutes from '../components/ProtectedRoutes';
import Request from '../pages/Request';

export default function index() {
  const isLoggeddIn = AuthService.isLoggedIn();
  return (
    <Switch>
      {/* IsPrivate path="/" exact component={Home} /> */}
      <Route path="/signup" exact component={Signup} />
      <Route path="/" exact component={Login} />
      <Route path="/login" exact component={Login} />
      <ProtectedRoutes path="/userrole" exact component={UserRole} />
      <ProtectedRoutes path="/profile" exact component={ProfilePage} />
      <ProtectedRoutes path="/edit-profile" exact component={EditProfilePage} />
      <ProtectedRoutes path="/dashboard/:token" exact component={Dashboard} />
      <ProtectedRoutes path="/dashboard" exact component={Dashboard} />
      <Route path="/test" exact component={Test} />
      <Route path="/403" exact component={Error403} />
      <Route path="/404" exact component={Error404} />
      <Route path="/500" exact component={Error500} />
      <Route path="/confirmEmail" exact component={EmailConfirm} />
      <ProtectedRoutes path="/dashboard" exact component={Dashboard} />
      <ProtectedRoutes path="/dashboard/:token" exact component={Dashboard} />
      <Route path="/forgetPassword" exact component={ForgetPassword} />
      <Route path="/resetPassword" exact component={ResetPassword} />
      <Route
        path="/request"
        exact
        component={Request}
        roleRequired={['requester', 'manager']}
      />
      <Route path="*" component={Error} />
    </Switch>
  );
}
