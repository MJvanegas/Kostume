import "./Footer.css";
import logokoos from "../../assets/KustomeLogoBlanco 3.png";
import facebook from '../../assets/facebook.png'
import instagram from '../../assets/instagram.png'
import twitter from '../../assets/twitter.png'
import tiktok from '../../assets/tiktok.png'
import {FaKey} from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='footer'>
      <div>
        <img className="Logof" src={logokoos} alt="koostume"/>
        
      </div>
      <div className='social-container'>
        <a href="http://localhost:3000/">
          <FaKey className="social"/>
        </a>
        <a href="https://www.facebook.com">
          <img className='social' src={facebook} alt="koostume"/>
        </a>
        <a href="https://www.instagram.com">
          <img className='social' src={instagram} alt="koostume"/>
        </a>
        <a href="https://www.tiktok.com">
          <img className='social' src={tiktok} alt="koostume"/>
        </a>
        <a href="https://twitter.com">
          <img className='social' src={twitter} alt="koostume"/>
        </a>     
      </div>
    </div>
  );
};

export default Footer;