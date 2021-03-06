import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import styles from '../../css-modules/Order.module.css';
import { addCopywriting } from '../../store/orders';
import { editCopywriting } from '../../store/orders';

const Copywriting = ({copywriting, onSubmit}) => {
    const ranges = ['', '50-100', '100-500', '500-1000', '1000-5000'];
    const languages = ['', 'German', 'English', 'Spanish'];
    const fields = ['', 'Science', 'Finance', 'Other'];
    const [errors, setErrors] = useState([]);
    const [description, setDescription] = useState('');
    const [key_words, setKey_words] = useState('');
    const [links, setLinks] = useState('');
    const [field, setField] = useState(fields[0]);
    const [word_count, setWord_count] = useState(ranges[0]);
    const [language, setLanguage] = useState(languages[0]);
    const [total, setTotal] = useState(0);
    // const [target_language, setTarget_language] = useState('English');
    const dispatch = useDispatch();
    const history = useHistory();

    const editOrder = async (e) => {
        e.preventDefault();
        await dispatch(editCopywriting({ id: copywriting.id, order_id: copywriting.order_id, description, completion_status: copywriting.completion_status, created_at: copywriting.created_at, field, word_count, language, key_words, links }));
        await onSubmit();
        history.push('/profile')
        window.location.reload(false);
    }
    
    useEffect(() => {
        if (copywriting) {
            setDescription(copywriting.description)
            setKey_words(copywriting.key_words)
            setLinks(copywriting.links)
            setField(copywriting.field)
            setWord_count(copywriting.word_count)
            setLanguage(copywriting.language)
            setTotal(copywriting.total)
        }
    }, []);

    const updateDescription = (e) => {
        setDescription(e.target.value)
    }
    const updateKey_words = (e) => {
        setKey_words(e.target.value)
    }
    const updateLinks = (e) => {
        setLinks(e.target.value)
    }

    const updateField = (e) => {
        setField(e.target.value)
    }
    const updateWord_count = (e) => {
        setWord_count(e.target.value)
        if (e.target.value == '50-100'){
            setTotal(40)
        } else if (e.target.value == '100-500'){
            setTotal(70)
        } else if (e.target.value == '500-1000'){
            setTotal(100)
        } else if (e.target.value == '1000-5000'){
            setTotal(150)
        } else {
            setErrors(['Please select desired word count range.'])
        }
    }
    const updateLanguage = (e) => {
        setLanguage(e.target.value)
    }


    const createCopywriting = async (e) => {
        e.preventDefault();
        let errorsToSet = [];
        if (!field.length || !description.length || !key_words.length || !links.length || !word_count.length || !language.length){
            if (!field.length) {
                errorsToSet.push("Please let us know what the copywriting will be about.");
            }
            if (!description.length) {
                errorsToSet.push("Please write a short summary of what would you like your order to be about.");
            }
            if (!key_words.length) {
                errorsToSet.push("Please indicate the key words you would like to see in your order.");
            }
            if (!links.length) {
                errorsToSet.push("Please let us know what to base information on.");
            }
            if (!word_count.length) {
                errorsToSet.push("Please indicate the desired length of your order.");
            }
            if (!language.length) {
                errorsToSet.push("Please indicate the target language of the order.");
            }
            setErrors(errorsToSet);
        } else {
            const formData = new FormData();
            formData.append("description", description);
            formData.append("key_words", key_words);
            formData.append("links", links);
            formData.append("field", field);
            formData.append("word_count", word_count);
            formData.append("language", language);
            const data = await dispatch(addCopywriting(formData));
            history.push('/profile')
            window.location.reload(false);
        }
    }

    return (
        <form className={styles.orderTranslation} onSubmit={copywriting ? (e)=>editOrder(e) : createCopywriting}>
            <ol>
                {errors.map((error, ind) => (
                    <li key={ind}>{error}</li>
                ))}
            </ol>
            <div>
                <label>Select topic:</label>
                <select className={styles.selectInput} value={field} onChange={updateField}>
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
                    name='key_words'
                    onChange={updateKey_words}
                    value={key_words}>
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
                <select className={styles.selectInput} value={word_count} onChange={updateWord_count}>
                    {ranges.map(range =>
                        <option key={range} value={range}>{range}</option>)}
                </select>
            </div>
            <div>
                <label>Select language:</label>
                <select className={styles.selectInput} value={language} onChange={updateLanguage}>
                    {languages.map(language =>
                        <option key={language} value={language}>{language}</option>)}
                </select>
            </div>
            {copywriting ? null : 
            <div>
                <label className={styles.price}>Your total:</label>
                <p className={styles.price}>${Number.parseFloat(total).toFixed(2)}</p>
            </div>
            }
            <button className={styles.submitButton} type='submit'>Continue</button>
        </form>
    );
};

export default Copywriting;
