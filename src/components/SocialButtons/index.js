import React from 'react';
import Button from '../Button';
import googleImg from '../../assets/images/google.png';
import fbImg from '../../assets/images/facebook.png';
import './SocialButtons.scss';

export const handleSocialLogin = (provider) => {
  window.location.assign(`https://barefoot-nomad-staging.herokuapp.com/api/auth/${provider}`);
};
const SocialButtons = ({page}) => (
  <>
    <div className="socialContainer">
      <p>or {page} using </p>
      <ul>
        <li>
          <Button
            className="socialBtn"
            name="facebook"
            value={<img src={fbImg} alt="Facebook" />}
            onClick={() => handleSocialLogin('facebook')}
          />
        </li>
        <li>
          <Button
            className="socialBtn"
            name="google"
            value={<img src={googleImg} alt="Google+" />}
            onClick={() => handleSocialLogin('google')}
          />
        </li>
      </ul>
    </div>
  </>
);
export default SocialButtons;
