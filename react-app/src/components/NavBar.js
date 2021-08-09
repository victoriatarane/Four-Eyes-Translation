
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import DemoUser from './DemoUser';
import logoName from './assets/logoName.png';

import styles from '../css-modules/NavBar.module.css';

const NavBar = () => {
  const user = useSelector(state => state.session.user);
  return (
    <nav className={styles.navBar1}>
      <ul>
        <li className={styles.loginNavBar}>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        {user ? (
        <li className={styles.loginNavBar}>
          <LogoutButton />
        </li>
        ) : (
        <li className= { styles.loginNavBar }>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        )}
        {user ? null : (
        <li className={styles.loginNavBar}>
          <DemoUser />
        </li>
        )}
        {user ? (
        <li className={styles.loginNavBar}>
          <NavLink to='/profile' exact={true} activeClassName='active'>
            Profile
          </NavLink>
        </li>
        ) : (
        <li className={styles.loginNavBar}>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        )}
        {user ? (
        <li className={styles.loginNavBar}>
          <NavLink to='/order' exact={true} activeClassName='active'>
            Order
          </NavLink>
        </li>
        ) : null}
        <li className={styles.loginNavBar}>
          <img className={styles.logoName} src={logoName} alt='Four Eyes Translation'></img>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
