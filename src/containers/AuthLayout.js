/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Logo from '../components/logo/logo';
import './authLayout.scss';
import SocialButtons from '../components/SocialButtons';

// eslint-disable-next-line react/prop-types
export default function AuthLayout({ title, redirectMsg, redirect, redirectLocation, children }) {
  const page = redirectLocation == ' Signup' ? 'log in' : 'sign up';
  return (
    <div className="auth_mainnn">
      <div className="auth_container">
        <div className="auth_tab1">
          <Logo />

          <h6 className="auth_title">{title}</h6>
          {children}
          <SocialButtons page={page} />
          <div className="auth_bottom_link">
            <p href="#" className="auth_link">
              {redirectMsg}
              <a onClick={redirect}>{redirectLocation}</a>
            </p>
          </div>
        </div>
        <div className="auth_tab2">
          <div className="auth_glass">
            <div className="auth_travel__tab">
              <h1 className="auth_travel_info_title">Travel The World</h1>
              <p className="auth_travel_info">
                We make travel and accommodation
              </p>
              <p className="auth_travel_info"> easy and convenient</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
