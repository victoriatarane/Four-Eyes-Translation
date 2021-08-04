import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import styles from '../../css-modules/Order.module.css';
import { addTranslation } from '../../store/orders';

const Translation = () => {
    const [errors, setErrors] = useState([]);
    const [document_url, setDocumentUrl] = useState('hhhh');
    const [field, setField] = useState('Other')
    const [word_count, setWord_count] = useState(0);
    const [source_language, setSource_language] = useState('English');
    const [target_language, setTarget_language] = useState('English');
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch();

    const languages = ['German', 'English', 'Spanish'];
    const fields = ['Science', 'Finance', 'Other'];

    const updateField = (e) => {
        setField(e.target.value)
    }
    const updateWord_count = (e) => {
        setWord_count(e.target.value)
        setTotal(e.target.value * 0.16)
    }
    const updateSource_language = (e) => {
        setSource_language(e.target.value)
    }
    const updateTarget_language = (e) => {
        setTarget_language(e.target.value)
    }
    const createTranslation = async (e) => {
        e.preventDefault();
        const data = await dispatch(addTranslation({
            document_url,
            field,
            word_count,
            source_language,
            target_language,
        }))
        console.log(data, "#####")
        if (data) {
            setErrors(data)
        }
    }

    return (
        <form onSubmit={createTranslation}>
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
            <div>
                <label>Select source language:</label>
                <select onChange={updateSource_language}>
                    {languages.map(language =>
                        <option key={language} value={language}>{language}</option>)}
                </select>
            </div>
            <div>
                <label>Select target language:</label>
                <select onChange={updateTarget_language}>
                    {languages.map(language =>
                        <option key={language} value={language}>{language}</option>)}
                </select>
            </div>
            <div>
                <label>Your total:</label>
                <p>${Number.parseFloat(total).toFixed(2)}</p>
            </div>
            <button className={styles.submitButton} type='submit'>Continue</button>
        </form>
    );
};

export default Translation;
