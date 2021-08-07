import styles from '../../css-modules/Profile.module.css';
import {useState, useEffect} from 'react';
import Translation from '../Order/'
// import { NavLink } from 'react-router-dom';

const RenderTranslations = ({translation, editOrder, deleteOrder}) => {
    const [edit, setEdit] = useState(false);
    if (edit === true) {
        // setEdit(!edit)
        return (
            <Translation 
                translation={translation.translation}
                onSubmit={()=>setEdit(!edit)}/>
        )
    } else {
        return (
            <ul className={styles.orderRender} key={translation.translation.id}>
                <li>Document: 
                    <a href={translation.translation.document_url}>{translation.translation.field} translation.</a>
                </li>
                <li>Field: {translation.translation.field}</li>
                <li>Word count: {translation.translation.word_count}</li>
                <li>Source language: {translation.translation.source_language}</li>
                <li>Target language: {translation.translation.target_language}</li>
                <li>Date created: {translation.translation.created_at}</li>
                <button className={styles.editButton} onClick={()=>setEdit(!edit)}>Edit<i className="fa-solid fa-pen" /></button>
                <button className={styles.deleteButton} onClick={() => deleteOrder(translation)}>Delete<i className="fas fa-trash-alt" /></button>
            </ul>
        )
    }
}

export default RenderTranslations;