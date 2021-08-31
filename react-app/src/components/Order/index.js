import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import styles from '../../css-modules/Order.module.css';
import Translation from './Translation';
import Proofreading from './Proofreading';
import Copywriting from './Copywriting';

const Order = ({translation, proofreading, copywriting, onSubmit}) => {
    const [errors, setErrors] = useState([]);
    const [service, setService] = useState('Translation')
    if (proofreading) {
        setService('Proofreading')
    } else if (copywriting) {
        setService('Copywriting')
    }
    const [wordCount, setWordCount] = useState(0);
    const languages = ['German', 'English', 'Spanish'];
    const fields = ['Science', 'Finance'];
    
    // let currentService = <Translation />

    const orderTranslation = (e) => {
        e.preventDefault();
        setService('Translation');
        
    }
    const orderProofreading = (e) => {
        e.preventDefault();
        setService('Proofreading');
    }
    const orderCopywriting = (e) => {
        e.preventDefault();
        setService('Copywriting');
    }

    // const onSubmit = async (e) => {
    //     e.preventDefault()
    //     setService(e.target.value)
    //    console.log(service)
    // }
    return (
        <div className={styles.orderForm}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <i className={styles.header}>Customize service of your choice:</i>
            {/* <div className={styles.selectService}>
                <input type="radio" id="translation" name="service" value="translation"/>
                    <label>Translation</label><br/>
                <input type="radio" id="copywriting" name="service" value="copywriting"/>
                    <label>Copywriting</label><br/>
                <input type="radio" id="proofreading" name="service" value="proofreading"/>
                    <label>Proofreading</label>
            </div> */}
            {translation ? null : 
            <div className={styles.selectService}>
                <button className={styles.bookmark} onClick={orderTranslation}>
                    Translation
                </button>
                <br className={styles.bookmarkDividers}/>
                <div className={styles.spacemaker}/>
                <button className={styles.bookmark} onClick={orderProofreading}>
                    Proofreading
                </button>
                <br className={styles.bookmarkDividers}/>
                <div className={styles.spacemaker}/>
                <button className={styles.bookmark} onClick={orderCopywriting}>
                    Copywriting
                </button><br className={styles.underOrderSelection}/>
            </div>}
            <div className={styles.serviceForm}>
                {service === 'Translation' ? <Translation translation={translation} onSubmit={onSubmit}/> : null}
                {service === 'Proofreading' ? <Proofreading proofreading={proofreading} onSubmit={onSubmit}/> : null}
                {service === 'Copywriting' ? <Copywriting copywriting={copywriting} onSubmit={onSubmit}/> : null}
            </div>
            {/* <button className={styles.submitButton} type='submit'>Continue</button> */}
        </div>
    );
};

export default Order;
