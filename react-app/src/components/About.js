import React from 'react';
// import { useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import github from './assets/GitHub-Mark-32px.png';
import linkedin from './assets/LI-In-Bug.png';

import styles from '../css-modules/NavBar2.module.css';

const NavBar2 = () => {
    // const user = useSelector(state => state.session.user);
    return (
        <nav className={styles.navBar2}>
            <ul>
                <li>
                    <p>Victoria Tarane</p>
                </li>
                <li>
                    <img src={linkedin} alt='LinkedIn' onClick={() => window.open("https://www.linkedin.com/in/victoria-tarane-54a86b5b/")} />
                </li>
                <li>
                    <img src={github} alt='GitHub' onClick={() => window.open("https://github.com/victoriatarane")} />
                </li>
            </ul>
        </nav>
    );
}

export default NavBar2;