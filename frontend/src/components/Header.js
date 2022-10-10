import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../images/header/__logo.svg';

function Header({ isLoggedIn, userEmail, onSignOut }) {

    const location = useLocation();
    const isLocationSignIn = location.pathname === '/sign-in';


    function handleSignOut() {
      onSignOut();
    }

    return (
      <header className="header">
         
         <img className="header__logo" src={logo} alt="Логотип" />
         
         {  isLoggedIn ? 
             (<div className="header__nav-container">
                <p className="header__email">{userEmail}</p>
                <NavLink className="header__nav-link header__nav-link_active"  onClick={handleSignOut} to={"/sign-in"}>Выйти</NavLink>
              </div> 
             ) :
             (!isLocationSignIn ?
             <NavLink className="header__nav-link" to={"/sign-in"}>Войти</NavLink> :
             <NavLink className="header__nav-link" to={"/sign-up"}>Регистрация</NavLink>
             )
         }
      </header>
    );
}

export default Header;