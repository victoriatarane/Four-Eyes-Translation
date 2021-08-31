import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import styles from '../css-modules/SplashPage.module.css'
import img_url from './assets/logo_03.jpeg';
import img_2_url from './assets/logoName.png'

function SplashPage() {
    // const user = useSelector(state => state.session.user);

    // if (user) {
    //     return <Redirect to={`/users/${user.id}`} />
    // };

    return (
        <div className={styles.splashDiv}>
            <img src={img_2_url} alt="FOUR EYES TRANSLATION"/>
            <img className={styles.logo_img} src={img_url} alt="Logo Glasses" />
        </div>
    )
}

export default SplashPage;