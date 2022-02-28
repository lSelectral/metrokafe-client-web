import { Home, BarChart, TrendingUp } from '@material-ui/icons';
import React from 'react';
import './Navbar.scss'
import Avatar from '../../resource/avatar.png'

const Navbar = () => {
  return (
      <div className='navbar'>
          <div className="navbarWrapper">
              <div className="left">
                  <span className="logo">SELECTRA</span>
              </div>
              <div className="right">
                  <div className="icons">
                      <Home/>
                  </div>
                  <div className="icons">
                      <TrendingUp/>
                  </div>
                  <div className="icons">
                      <BarChart/>
                  </div>

                  <img

                  src={Avatar} 
                  alt="Avatar" 
                  className="avatar" />
              </div>
          </div>
      </div>
  )
};

export default Navbar;
