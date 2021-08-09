import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import styles from '../css-modules/SplashPage.module.css'
import img_url from './assets/logo_03.jpeg';

function SplashPage() {
    // const user = useSelector(state => state.session.user);

    // if (user) {
    //     return <Redirect to={`/users/${user.id}`} />
    // };

    return (
        <div className={styles.splashDiv}>
            <h1>Four Eyes Translation</h1>
            <img className={styles.logo_img} src={img_url} alt="Logo Glasses" />
        </div>
    )
}

export default SplashPage;