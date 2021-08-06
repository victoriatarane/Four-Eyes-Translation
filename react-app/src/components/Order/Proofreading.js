import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import styles from '../../css-modules/Order.module.css';
import { addProofreading } from '../../store/orders';
import UploadFile from './Upload';

const Proofreading = ({proofreading}) => {
    const [errors, setErrors] = useState([]);
    const [document_url, setDocument_url] = useState('hhhh');
    const [field, setField] = useState('Other')
    const [word_count, setWord_count] = useState(0);
    const [language, setLanguage] = useState('English');
    const [total, setTotal] = useState(0);
    // const [targetLanguage, setTargetLanguage] = useState('English');
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        if (proofreading) {
            setDocument_url(proofreading.document_url)
            setField(proofreading.field)
            setWord_count(proofreading.word_count)
            setLanguage(proofreading.language)
            // setTotal(proofreading.total)
        }
    }, [proofreading])

    const languages = ['', 'German', 'English', 'Spanish'];
    const fields = ['', 'Science', 'Finance', 'Other'];

    const updateField = (e) => {
        setField(e.target.value)
    }
    const updateWord_count = (e) => {
        setWord_count(e.target.value)
        setTotal(e.target.value * 0.12)
    }
    // const updateSourceLanguage = (e) => {
    //     setSourceLanguage(e.target.value)
    // }
    const updateLanguage = (e) => {
        setLanguage(e.target.value)
    }

    const createProofreading = async (e) => {
        e.preventDefault();
        const data = await dispatch(addProofreading({
            document_url,
            field,
            word_count,
            language
            // targetLanguage,
        }))
        console.log(data, "#####")
        if (data) {
            setErrors(data)
        } else {
            history.push('/profile')
        }
    }

    return (
        <form onSubmit={createProofreading}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label>Select topic:</label>
                <select onChange={updateField}>
                    {fields.map(field =>
                        <option key={field} value={field}>{field}</option>)}
                </select>
            </div>
            <div>
                <label>Word count:</label>
                <input
                    type='text'
                    name='word_count'
                    onChange={updateWord_count}
                    value={word_count}>
                </input>
            </div>
            {/* <div>
                <label>Select source language:</label>
                <select onChange={updateSourceLanguage}>
                    {languages.map(language =>
                        <option key={language} value={language}>{language}</option>)}
                </select>
            </div> */}
            <div>
                <label>Select language:</label>
                <select onChange={updateLanguage}>
                    {languages.map(language =>
                        <option key={language} value={language}>{language}</option>)}
                </select>
            </div>
            <UploadFile />
            <div>
                <label>Your total:</label>
                <p>${Number.parseFloat(total).toFixed(2)}</p>
            </div>
            <button className={styles.submitButton} type='submit'>Continue</button>
        </form>
    );
};

export default Proofreading;
