import React, { Component } from 'react';
import './landingPage.scss';
import Input from '../components/InputField';
import Button from '../components/Button'
import profileImg from '../assets/icons/icons8-customer-48.png';
import notification from '../assets/icons/notification.png';

import Logo from '../components/logo/logo';


class LandingPage extends Component {
    render() {
return(
    <div className="homeBody">
    <div className="homeBody_homeNavbar">
    <Logo className="logoo"/> 
    <ul className="homeBody_homeNavbar_items">
      <li>
        <img src={notification} alt="notifications" className="homeBody_homeNavbar_items_single" />
      </li>
      <li>
        <img src={profileImg} alt="profile" className="homeBody_homeNavbar_items_single2" />
        
      </li>
    </ul>
  </div>

    <div className="homeBody_image">
    <div className="homeBody_image_title"><h1>Travel The World</h1></div>

    <div className="homeBody_image_homeTab">
    <div className="homeBody_image_homeTab_inputDiv"><Input  type="text" className="input location" placeholder="Where do you want to go?"/></div>
    <div className="homeBody_image_homeTab_buttonDiv">    
    <Button className="btn findBtn" value="Find"/> 
    </div>
    </div> 
    </div>
<div className="homeBody_mainDiv">
<div className="homeBody_mainDiv_div1">
<div className="homeBody_mainDiv_div1_content">
<h1>Unlock your best Barefoot Nomad</h1>
<br></br>
<ul>
<li>Get access to the best accommodations in the world</li>
<br></br>

<li>Get access to rate an favourite accommodations</li>
<br></br>

<li>Feel free to request for a trip</li>
<br></br>
</ul>
<Button className="btn signupBtn" value="Get Started"/>
</div>
</div>
<div className="homeBody_mainDiv_div2"></div>
<div className="homeBody_mainDiv_div3"></div></div>

    </div>
);
    }
}
export default LandingPage;