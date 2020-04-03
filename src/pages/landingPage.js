import React, { Component } from 'react';
import './landingPage.scss';
import Logo from '../components/logo/logo';

class LandingPage extends Component {
    render() {
return(
    <div className="homeBody">
    <div className="homeBody_homeNavbar">
    <Logo className="logoo"/> 

    </div>
    <div className="homeBody_image">
    <div className="homeBody_image_title"><h1>Travel The World</h1></div>

    <div className="homeBody_image_homeTab">
    </div>
    
    </div>
    </div>
);
    }
}
export default LandingPage;