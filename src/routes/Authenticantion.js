import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Login from '../pages/Authentication/Login';
import ProfilePage from '../pages/profile/ProfilePage';
import EditProfilePage from '../pages/profile/EditProfilePage';
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
import ConfirmDialogue from '../components/ConfirmDialogue';

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
      <Route path="/confirmDialogue" exact component={ConfirmDialogue} />
    </Switch>
  );
}
