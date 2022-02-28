import { Home, BarChart, TrendingUp } from '@material-ui/icons';
import React from 'react';
import './Navbar.scss'
import Avatar from '../../resource/avatar.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
      <div className='navbar'>
          <div className="navbarWrapper">
              <div className="left">
                  <span className="logo">SELECTRA</span>
              </div>
              <div className="right">
                  <Link to={'/'} className="icons">
                      <Home/>
                  </Link>
                  <Link to={'/originalHome'} className="icons">
                      <TrendingUp/>
                  </Link>
                  <Link to={'/admin'} className="icons">
                      <BarChart/>
                  </Link>

                  <Link to={'/profile'} className="icons">
                    <img
                    src={Avatar} 
                    alt="Avatar" 
                    className="avatar"/>
                  </Link>

              </div>
          </div>
      </div>
  )
};

export default Navbar;
