import PropTypes from "prop-types"
import React, { useEffect } from 'react'
import branding from "../images/plry-branding.svg";
import facebook from "../images/facebook.svg";
import instagram from "../images/instagram.svg";
import Headroom from "headroom.js";
import AniLink from "gatsby-plugin-transition-link/AniLink"

const Header = ({ siteTitle }) => {
  useEffect(() => {
    let myElement = document.querySelector("header")
    let headroom  = new Headroom(myElement)
    headroom.init()
  })
  return(
    <header id="header" className="headroom">
      <div className="header-inner row">
        <div className="col col-branding s4 m4 l4">
          <AniLink paintDrip color="white" to="/" style={{ color: `black`, textDecoration: `none`, }}>
            <img alt="banner" id="branding" src={branding} height="60" width="auto" />
          </AniLink>
        </div>
        <div className="col col-menu s4 m4 l4">
          <ul className="menu">
            <li className="item">
              <a href="/#chapter2">Economie</a>
            </li>
            <li className="item">
              <a href="/#chapter67">Environnement</a>
            </li>
            <li className="item">
              <a href="/#chapter1">Social</a>
            </li>
            <li className="item">
              <a href="/#chapter76">Sécurité</a>
            </li>
          </ul>
        </div>
        <div className="col col-social s4 m4 l4">
          <ul className="social">
            <li className="item">
              <a href="https://www.facebook.com/PLR-Yverdon-PLRY-202283523122024" target="_blank" rel="noreferrer">
                <img id="facebook" alt="facebook" src={facebook} height="80" width="80" />
              </a>
            </li>
            <li className="item">
              <a href="https://www.instagram.com/plryverdon/" target="_blank" rel="noreferrer">
                <img id="instagram" alt="facebook" src={instagram} height="80" width="80" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
