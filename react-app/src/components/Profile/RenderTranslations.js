import styles from '../../css-modules/Profile.module.css';
import {useState, useEffect} from 'react';
import Translation from '../Order/'
// import { Link } from "react-router";
import picture from '../assets/logo_03.jpeg';

const RenderTranslations = ({translation, editOrder, deleteOrder}) => {
    const [edit, setEdit] = useState(false);
    if (edit === true) {
        // setEdit(!edit)
        // window.location.reload(false);
        return (
            <div className={styles.transDiv}>
                <Translation 
                    translation={translation.translation}
                    onSubmit={()=>setEdit(!edit)}/>
            </div>
        )
    } else {
        return (
            <div className={styles.transDiv}>
                <ul className={styles.orderRender} key={translation.translation.id}>
                    <li>Document: 
                        <a key={translation.translation.id} href={translation.translation.document_url}>{translation.translation.field} translation.</a>
                    </li>
                    
                    
                    <li>Field: {translation.translation.field}</li>
                    <li>Word count: {translation.translation.word_count}</li>
                    <li>Source language: {translation.translation.source_language}</li>
                    <li>Target language: {translation.translation.target_language}</li>
                    <li>Date created: {translation.translation.created_at}</li>
                </ul>
                <div className={styles.buttons}>
                    <button className={styles.editButton} onClick={()=>setEdit(!edit)}>📝</button>
                    <button className={styles.deleteButton} onClick={() => deleteOrder(translation)}>🗑</button>
                </div>
            </div>
        )
    }
}

export default RenderTranslations;