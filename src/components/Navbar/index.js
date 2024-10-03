import React, { useContext, useEffect, useState } from 'react';
import "./index.scss"
import { Icon } from '@iconify/react';
import { useLocation, useRoutes } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import api from '../../services/api';
import { isMobile } from 'react-device-detect';
import Cookies from 'js-cookie';

//Imagens
import logo from './img/logo-idz.svg'
import logocliente from './img/logocliente.png'

function Navbar() {    
    return (
        <>
            
            <header>
                <div className="headerMobile"></div>   
            </header>
           
            <aside>
                <div className='container-header'>
                    <a href="/">
                        <img className="logo" src={logo} />
                    </a>
                    <a className='closeMenu'><Icon icon="ep:close-bold" /></a>

                    <nav className="navbar">

                        <ul className="navbar-nav">
                            <li className={`nav-item`}>
                                <a href="/dashboard">
                                    <Icon className="icons" icon="material-symbols:dashboard-customize" />
                                    <span>Dashboard</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="user-card profile">
                        <div className="profile">
                            <a className='avatar'><img className="logo"  /></a>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
export default Navbar;
