import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import styles from '../../css-modules/Order.module.css';

const Order = () => {
    const [errors, setErrors] = useState([]);
    const [service, setService] = useState('translation')
   

    const onSubmit = async (e) => {
        e.preventDefault()
        setService(e.target.value)
        console.log(service)
    }
    return (
        <form className={styles.signupForm} onSubmit={onSubmit}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <p>Select service of your choice:</p>
            <div>
                <input type="radio" id="translation" name="service" value="translation"/>
                    <label>Translation</label><br/>
                <input type="radio" id="copywriting" name="service" value="copywriting"/>
                    <label>Copywriting</label><br/>
                <input type="radio" id="proofreading" name="service" value="proofreading"/>
                    <label>Proofreading</label>
            </div>
          
            <button className={styles.submitButton} type='submit'>Continue</button>
        </form>
    );
};

export default Order;