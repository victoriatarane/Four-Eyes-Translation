import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import styles from '../../css-modules/Order.module.css';
import { addTranslation } from '../../store/orders';

const Translation = () => {
    const [errors, setErrors] = useState([]);
    const [documentUrl, setDocumentUrl] = useState('hhhh');
    const [field, setField] = useState('Other')
    const [wordCount, setWordCount] = useState(0);
    const [sourceLanguage, setSourceLanguage] = useState('English');
    const [targetLanguage, setTargetLanguage] = useState('English');
    const dispatch = useDispatch();

    const languages = ['German', 'English', 'Spanish'];
    const fields = ['Science', 'Finance', 'Other'];

    const updateField = (e) => {
        setField(e.target.value)
    }
    const updateWordCount = (e) => {
        setWordCount(e.target.value)
    }
    const updateSourceLanguage = (e) => {
        setSourceLanguage(e.target.value)
    }
    const updateTargetLanguage = (e) => {
        setTargetLanguage(e.target.value)
    }

    const createTranslation = async (e) => {
        e.preventDefault();
        const data = await dispatch(addTranslation(
            documentUrl,
            field,
            wordCount,
            sourceLanguage,
            targetLanguage,
        ))
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
                    name='wordcount'
                    onChange={updateWordCount}
                    value={wordCount}>
                </input>
            </div>
            <div>
                <label>Select source language:</label>
                <select onChange={updateSourceLanguage}>
                    {languages.map(language =>
                        <option key={language} value={language}>{language}</option>)}
                </select>
            </div>
            <div>
                <label>Select target language:</label>
                <select onChange={updateTargetLanguage}>
                    {languages.map(language =>
                        <option key={language} value={language}>{language}</option>)}
                </select>
            </div>
            <button className={styles.submitButton} type='submit'>Continue</button>
        </form>
    );
};

export default Translation;
