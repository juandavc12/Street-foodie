import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="Footer">
      <div className="FooterContainer">
        <div className="FooterContent">
          <div className="Ready">
            <p>Ready to eat?</p>
            <Link to={'/login'}>
              <button>Go to log in</button>
            </Link>
          </div>
          <div className="Services">
            <ul>
              <h4>Services</h4>
              <li>Email Marketing</li>
              <li>Campaigns</li>
              <li>Branding</li>
              <li>Offline</li>
            </ul>
          </div>
          <div className="About">
            <ul>
              <h4>About</h4>

              <li>Our Story </li>
              <li>Benefits</li>
              <li>Team</li>
              <li>Careers</li>
            </ul>
          </div>
          <div className="Help">
            <ul>
              <h4>Help</h4>

              <li>FAQs</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="BottomContent">
          <div className="Policy">
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
          </div>
          <div className="Social">
            <img alt="Facebook" src="facebook.png" />
            <img alt="Twitter" src="twitter.png" />
            <img alt="Instagram" src="instagram.png" />
          </div>
        </div>
      </div>
    </div>
  );
}
