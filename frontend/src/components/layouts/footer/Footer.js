import React from 'react'
import playStore from '../../../img/playStore.png'
import appStore from '../../../img/appStore.png'
import './Footer.css'

function Footer() {
  return (
    <footer id='footer'>
        <div className="leftFooter">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download app for android and ios mobile phone</p>
            <img src={playStore} alt="playstore" />
            <img src={appStore} alt="appstore" />
        </div>

        <div className="midFooter">
            <h1>ECOMMERCE</h1>
            <p>High quality is our first priority</p>
            <p>Copyrights 2021 &copy; me</p>
        </div>

        <div className="rightFooter">
            <h4>Follows us</h4>
            <a href="/">Instagram</a>
            <a href="/">Facebook</a>
            <a href="/">Youtub</a>
        </div>
    </footer>
  )
}

export default Footer