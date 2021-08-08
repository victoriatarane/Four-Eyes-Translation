
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

import styles from '../css-modules/NavBar.module.css';

const NavBar = () => {
  const user = useSelector(state => state.session.user);
  return (
    <nav className={styles.navBar1}>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        {user ? (
        <li>
          <LogoutButton />
        </li>
        ) : (
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        )}
        {user ? (
        <li>
          <NavLink to='/profile' exact={true} activeClassName='active'>
            Profile
          </NavLink>
        </li>
        ) : (
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        )}
        {user ? (
        <li>
          <NavLink to='/order' exact={true} activeClassName='active'>
            Order
          </NavLink>
        </li>
        ) : null}
      </ul>
    </nav>
  );
}

export default NavBar;
