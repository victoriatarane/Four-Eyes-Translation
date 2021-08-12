import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '../store/session';
import styles from '../css-modules/NavBar.module.css'

const DemoUser = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const email = 'demo@aa.io'
    const password = 'password'

    const onLogin = async (e) => {
        e.preventDefault();
        await dispatch(login(email, password));
        history.push(`/order`)
    }

    return (
        <div className={styles.demoFormContainer} onClick={onLogin}>
            <p className={styles.demoSign}>DEMO</p>
        </div>
    )
}

export default DemoUser;