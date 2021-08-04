import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import styles from '../../css-modules/Order.module.css';
import { addCopywriting } from '../../store/orders';

const Copywriting = () => {
    const [errors, setErrors] = useState([]);
    const [description, setDescription] = useState('');
    const [keyWords, setKeyWords] = useState('');
    const [links, setLinks] = useState('');
    const [field, setField] = useState('Other');
    const [wordCount, setWordCount] = useState(0);
    const [sourceLanguage, setSourceLanguage] = useState('English');
    const [targetLanguage, setTargetLanguage] = useState('English');
    const dispatch = useDispatch();
    
    const ranges = ['50-100', '100-500', '500-1000', '1000-5000'];
    const languages = ['German', 'English', 'Spanish'];
    const fields = ['Science', 'Finance', 'Other'];

    const updateDescription = (e) => {
        setDescription(e.target.value)
    }
    const updateKeyWords = (e) => {
        setKeyWords(e.target.value)
    }
    const updateLinks = (e) => {
        setLinks(e.target.value)
    }

    const updateField = (e) => {
        setField(e.target.value)
    }
    const updateWordCount = (e) => {
        setWordCount(e.target.value)
    }
    const updateLanguage = (e) => {
        setSourceLanguage(e.target.value)
    }


    const createTranslation = async (e) => {
        e.preventDefault();
        const data = await dispatch(addCopywriting(
            description, 
            keyWords,
            links,
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
                <label>Please describe what should the copy be about:</label>
                <input 
                    type='text' 
                    name='description'
                    onChange={updateDescription}
                    value={description}>
                </input>
            </div>
            <div>
                <label>Please list key words you would like to see in your copy:</label>
                <input
                    type='text'
                    name='keyWords'
                    onChange={updateKeyWords}
                    value={keyWords}>
                </input>
            </div>
            <div>
                <label>Please include links for reference:</label>
                <input 
                    type='url' 
                    name='links'
                    onChange={updateLinks}
                    value={links}>
                </input>
            </div>
            <div>
                <label>Select optimal word count range:</label>
                <select onChange={updateWordCount}>
                    {ranges.map(range =>
                        <option key={range} value={range}>{range}</option>)}
                </select>
            </div>
            <div>
                <label>Select language:</label>
                <select onChange={updateLanguage}>
                    {languages.map(language =>
                        <option key={language} value={language}>{language}</option>)}
                </select>
            </div>
            <button className={styles.submitButton} type='submit'>Continue</button>
        </form>
    );
};

export default Copywriting;
