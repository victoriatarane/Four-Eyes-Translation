import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import styles from '../../css-modules/Order.module.css';
import Translation from './Translation';

const Order = () => {
    const [errors, setErrors] = useState([]);
    const [service, setService] = useState('translation')
    const [wordCount, setWordCount] = useState(0);
    const languages = ['German', 'English', 'Spanish'];
    const fields = ['Science', 'Finance'];
    

    const orderTranslation = (e) => {
        e.preventDefault();
        return (
            <Translation/>
        )
    }
    const orderProofreading = (e) => {
        e.preventDefault();

    }
    const orderCopywriting = (e) => {
        e.preventDefault();

    }

    // const onSubmit = async (e) => {
    //     e.preventDefault()
    //     setService(e.target.value)
    //     console.log(service)
    // }
    return (
        <form className={styles.orderForm}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <p>Select service of your choice:</p>
            {/* <div className={styles.selectService}>
                <input type="radio" id="translation" name="service" value="translation"/>
                    <label>Translation</label><br/>
                <input type="radio" id="copywriting" name="service" value="copywriting"/>
                    <label>Copywriting</label><br/>
                <input type="radio" id="proofreading" name="service" value="proofreading"/>
                    <label>Proofreading</label>
            </div> */}
            <div className={styles.selectService}>
                <button className={styles.bookmark} onClick={orderTranslation}>
                    Translation
                </button>
                <div className={styles.spacemaker}/>
                <button className={styles.bookmark} onClick={orderProofreading}>
                    Proofreading
                </button>
                <div className={styles.spacemaker}/>
                <button className={styles.bookmark} onClick={orderCopywriting}>
                    Copywriting
                </button><br/>
            </div>
            <Translation/>
            <button className={styles.submitButton} type='submit'>Continue</button>
        </form>
    );
};

export default Order;
