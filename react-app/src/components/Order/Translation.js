import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
// import { signUp } from '../../store/session';
import styles from '../../css-modules/Order.module.css';
import { addTranslation } from '../../store/orders';
// import UploadFile from './Upload';
import { editTranslation } from '../../store/orders';

const Translation = ({translation, onSubmit}) => {
    const languages = ['', 'German', 'English', 'Spanish'];
    const fields = ['', 'Science', 'Finance', 'Other'];
    const [errors, setErrors] = useState([]);
    const [document_url, setDocumentUrl] = useState('');
    const [field, setField] = useState(fields[0])
    const [word_count, setWord_count] = useState(0);
    const [source_language, setSource_language] = useState(languages[0]);
    const [target_language, setTarget_language] = useState(languages[0]);
    const [total, setTotal] = useState(0);
    const [file, setFile] = useState(null);
    const [fileLoading, setFileLoading] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();

    const editOrder = async (e) => {
        e.preventDefault()
        await dispatch(editTranslation({id: translation.id, order_id: translation.order_id, document_url: translation.document_url, completion_status: translation.completion_status, created_at: translation.created_at, field, word_count, source_language, target_language}));
        await onSubmit();
        history.push('/profile')
        window.location.reload(false);
    }
    useEffect(() => {
        if (translation) {
            setDocumentUrl(translation.document_url)
            setField(translation.field)
            setWord_count(translation.word_count)
            setSource_language(translation.source_language)
            setTarget_language(translation.target_language)
        }
    }, [])

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
    const updateFile = (e) => {
        const file = e.target.files[0];
        setFile(file);
        setDocumentUrl(file)
    //    console.log(file)
    }
    const createTranslation = async (e) => {
        e.preventDefault();
        let errorsToSet = [];
        if (!field.length || !word_count.length || !source_language.length || !target_language.length || !document_url.length) {
            if (!field.length) {
                errorsToSet.push("Please let us know what the translation will be about.");
            }
            if (!word_count.length) {
                errorsToSet.push("Please indicate the length of your source document.");
            }
            if (!source_language.length) {
                errorsToSet.push("Please indicate the source language of the translation.");
            }
            if (!target_language.length) {
                errorsToSet.push("Please indicate the target language of the translation.")
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
            formData.append("source_language", source_language);
            formData.append("target_language", target_language);
            setFileLoading(true);
            const data = await dispatch(addTranslation(formData))
            setFileLoading(false);
            history.push('/profile')
            window.location.reload(false);
        }
    }
    return (
        <form className={styles.orderTranslation} onSubmit={translation ? (e)=>editOrder(e) : createTranslation}>
            <ol>
                {errors.map((error, ind) => (
                    <li key={ind}>{error}</li>
                ))}
            </ol>
            <div>
                <label>Select topic:</label>
                <select className={styles.selectInput} onChange={updateField} value={field}>
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
                    value={word_count}
                    // defaultValue={word_count}
                    >
                </input>
            </div>
            <div>
                <label>Select source language:</label>
                <select className={styles.selectInput}  onChange={updateSource_language} value={source_language}>
                    {languages.map(language =>
                        <option key={language} value={language} defaultValue={source_language}>{language}</option>)}
                </select>
            </div>
            <div>
                <label>Select target language:</label>
                <select className={styles.selectInput}  onChange={updateTarget_language} value={target_language}>
                    {languages.map(language =>
                        <option key={language} value={language} defaultValue={target_language}>{language}</option>)}
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
            <button className={styles.submitButton} type='submit'>Submit</button>
        </form>
    );
};

export default Translation;
