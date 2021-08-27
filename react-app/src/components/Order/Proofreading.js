import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
// import { signUp } from '../../store/session';
import styles from '../../css-modules/Order.module.css';
import { addProofreading } from '../../store/orders';
// import UploadFile from './Upload';
import { editProofreading } from '../../store/orders';

const Proofreading = ({proofreading, onSubmit}) => {
    const languages = ['', 'German', 'English', 'Spanish'];
    const fields = ['', 'Science', 'Finance', 'Other'];
    const [errors, setErrors] = useState([]);
    const [document_url, setDocument_url] = useState('');
    const [file, setFile] = useState(null);
    const [field, setField] = useState(fields[0])
    const [word_count, setWord_count] = useState(0);
    const [language, setLanguage] = useState(languages[0]);
    const [total, setTotal] = useState(0);
    const [fileLoading, setFileLoading] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const editOrder = async (e) => {
        e.preventDefault()
        await dispatch(editProofreading({ id: proofreading.id, order_id: proofreading.order_id, document_url: proofreading.document_url, completion_status: proofreading.completion_status, created_at: proofreading.created_at, field, word_count, language }));
        await onSubmit();
        history.push('/profile');
        window.location.reload(false);
    }

    useEffect(() => {
        if (proofreading) {
            setDocument_url(proofreading.document_url)
            setField(proofreading.field)
            setWord_count(proofreading.word_count)
            setLanguage(proofreading.language)
        }
    }, [])

    const updateField = (e) => {
        setField(e.target.value)
    }
    const updateWord_count = (e) => {
        setWord_count(e.target.value)
        setTotal(e.target.value * 0.12)
    }
    const updateLanguage = (e) => {
        setLanguage(e.target.value)
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setDocument_url(file)
    }

    const createProofreading = async (e) => {
        e.preventDefault();
        let errorsToSet = [];
        if (!field.length || !word_count.length || !language.length || !document_url.length) {
            if (!field.length) {
                errorsToSet.push("Please let us know what the proofreading will be about.");
            }
            if (!word_count.length) {
                errorsToSet.push("Please indicate the length of your source document.");
            }
            if (!language.length) {
                errorsToSet.push("Please indicate the source language of the proofreading.");
            }
            if (!document_url.length) {
                errorsToSet.push("Please attach a translation source document.")
            }
            setErrors(errorsToSet);
        } else {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("document_url", document_url);
            formData.append("field", field);
            formData.append("word_count", word_count);
            formData.append("language", language);
            setFileLoading(true);
            const data = await dispatch(addProofreading(formData))
            setFileLoading(false);
            history.push('/profile')
            window.location.reload(false);
        }
    }
    return (
        <form className={styles.orderTranslation} onSubmit={proofreading ? (e)=>editOrder(e) : createProofreading}>
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
                <label>Word count:</label>
                <input
                    type='text'
                    name='word_count'
                    onChange={updateWord_count}
                    value={word_count}>
                </input>
            </div>
            <div>
                <label>Select language:</label>
                <select className={styles.selectInput} value={language} onChange={updateLanguage}>
                    {languages.map(language =>
                        <option key={language} value={language}>{language}</option>)}
                </select>
            </div>
            <div>
                <input
                    type="file"
                    accept="file/*"
                    onChange={updateFile}
                    // value={document_url}
                />
                {(fileLoading) && <p>Loading...</p>}
            </div>
            <div>
                <label className={styles.price}>Your total:</label>
                <p className={styles.price}>${Number.parseFloat(total).toFixed(2)}</p>
            </div>
            <button className={styles.submitButton} type='submit'>Continue</button>
        </form>
    );
};

export default Proofreading;
