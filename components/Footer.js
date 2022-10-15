import React from 'react'
import '../styles/Home.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";


function Footer () {
  return (
    <footer id="footer">
      <div className=" social-links">
      <a
        href="https://www.youtube.com/c/jamesqquick"
        className="youtube" id="youtube"
      >
        <span>Youtube</span>
      </a>
      <a
        href="https://www.facebook.com/learnbuildteach/"
        className="facebook social"
      >
        <span>Facebook</span>
      </a>
      <a href="https://www.twitter.com/jamesqquick" className="twitter social">
        <span>Twitter</span>
      </a>
      <a
        href="https://www.instagram.com/learnbuildteach"
        className="instagram social"
      >
        <span>Instagram</span>
      </a>
    </div>
      <div className="copyright">
        &copy; Copyright <strong><span>Wicked Designs</span></strong>. All Rights Reserved
      </div>
    
      <div className="credits">
        Designed by <a>Wicked Designs & Kasirocswell</a>
      </div>
  </footer>
  )}
  export default Footer