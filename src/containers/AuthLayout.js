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
    <div className="container">
      <div className="tab1">
        <Logo />

        <h6 className="title">{title}</h6>
        {children}
        <SocialButtons page={page} />
        <div className="bottom_link">
          <p href="#" className="link">
            {redirectMsg}
            <a onClick={redirect}>
              {redirectLocation}
            </a>
          </p>
        </div>
      </div>
      <div className="tab2">
        <div className="glass">
          <div className="travel__tab">
            <h1 className="travel_info_title">Travel The World</h1>
            <p className="travel_info">We make travel and accommodation</p>
            <p className="travel_info"> easy and convenient</p>
          </div>
        </div>
      </div>
    </div>
  );
}
