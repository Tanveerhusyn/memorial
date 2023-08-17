import React, { useState } from "react";
import "./Header.css";
import logoSvg from "../../../assets/logo.svg";
import logopng from "../../../assets/NewLogo2.png"
import { Link } from "react-router-dom";
import menuIcon from "../../../assets/menu.svg";
import closeIcon from "../../../assets/close.png";
import { useUserContext } from "../../../context/MemorialContext";
import { Avatar } from "@mui/material";

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AvatarComponent from "./AvatarComponent";

const Header = ({ loggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [DmenuOpen, setDMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const AvatarCom = ({ displayName }) => {
    return (
      <div onClick={handleClick} className="avatar">
        {/* Render your avatar image */}
        <Avatar alt="Remy Sharp"/>
        <p>{displayName}</p>
        <Menu
           id="basic-menu"
           anchorEl={anchorEl}
           open={open}
           onClose={handleClose}
           MenuListProps={{
             'aria-labelledby': 'basic-button',
           }}
           anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
         >
           <MenuItem onClick={handleClose}>Profile</MenuItem>
           <MenuItem onClick={handleClose}>My account</MenuItem>
           <MenuItem onClick={handleClose}>Logout</MenuItem>
         </Menu>
      
      </div>
    );
  };

  const {user} = useUserContext();
  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleAvatarClick = () => {
    setDMenuOpen(!menuOpen);
  };

  return (
    <header className="header-container">
      <div >
        <Link to="/">
          <img src={logopng} style={{maxWidth:'300px',minWidth:'200px'}} alt="Logo"  className="header-logo" />
        </Link>
      </div>
      <div className="menu-toggle" onClick={handleMenuToggle}>
        {menuOpen ? (
          <img src={closeIcon} alt="Close" />
        ) : (
          <img src={menuIcon} alt="Menu" />
        )}
      </div>
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        {!user ? (
          <ul>
            <li  className="Lnk" onClick={() => setMenuOpen(!menuOpen)}>
              <Link to="/">HOME</Link>
            </li>
            <li className="Lnk"  onClick={() => setMenuOpen(!menuOpen)}>
              <Link to="/creatememorial">CREATE MEMORIAL</Link>
            </li>
            <li className="Lnk"  onClick={() => setMenuOpen(!menuOpen)}>
              <Link to="/pricing">PRICING</Link>
            </li>
            <li className="Lnk"  onClick={() => setMenuOpen(!menuOpen)}>
              <Link to="/about">ABOUT</Link>
            </li>
            <li className="Lnk"  onClick={() => setMenuOpen(!menuOpen)}>
              <Link to="/contactus">CONTACT US</Link>
            </li>
            {/* <li className="Lnk"  onClick={() => setMenuOpen(!menuOpen)}>
              <Link to="/theme">Theme</Link>
            </li>
            <li className="Lnk"  onClick={() => setMenuOpen(!menuOpen)}>
              <Link to="/profile">Profile</Link>
            </li> */}

            <li className="Lnk btn" onClick={() => setMenuOpen(!menuOpen)}>
              <button className="login-button">
                <Link style={{ color: "#ffffff" }} to="/login">
                  Login
                </Link>
              </button>
            </li>
          </ul>
        ) : (
          <ul>
             <li className="Lnk"  onClick={() => setMenuOpen(!menuOpen)}>
              <Link to="/creatememorial">CREATE MEMORIAL</Link>
            </li>
            <li  className="Lnk" onClick={() => setMenuOpen(!menuOpen)}>
              <Link to="/mymemo">My Memorials</Link>
            </li>
            <li className="Lnk"  onClick={() => setMenuOpen(!menuOpen)}>
              <Link to="/about">About</Link>
            </li>
            <li className="Lnk"  onClick={() => setMenuOpen(!menuOpen)}>
              <Link to="/contactus">Contact</Link>
            </li>
            <li className="Lnk"  onClick={() => setMenuOpen(!menuOpen)}>
              {/* <Link to="/myaccount">My Account</Link> */}
            <AvatarComponent/>

      
          
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
