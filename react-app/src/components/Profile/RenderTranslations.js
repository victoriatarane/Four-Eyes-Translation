import styles from '../../css-modules/Profile.module.css';
import {useState} from 'react';
import Translation from '../Order/'

const RenderTranslations = ({translation, editOrder, deleteOrder}) => {
    const makeChanges = (translation) => {
        editOrder(translation)
    }
    const [edit, setEdit] = useState(false);
    if (edit === true) {
        // setEdit(!edit)
        return (
            <Translation 
                translaton={translation.translation}
                onSubmit={()=>setEdit(!edit)}/>
        )
    } else {
        return (
            <ul className={styles.orderRender} key={translation.translation.id}>
                <li>Document: {translation.translation.document_url}</li>
                <li>Field: {translation.translation.field}</li>
                <li>Word count: {translation.translation.word_count}</li>
                <li>Source language: {translation.translation.source_language}</li>
                <li>Target language: {translation.translation.target_language}</li>
                <li>Date created: {translation.translation.created_at}</li>
                {/* <button className="fa-solid fa-pen" /> */}
                <button className={styles.editButton} onClick={()=>setEdit(!edit)}>Edit<i className="fa-solid fa-pen" /></button>
                <button className={styles.deleteButton} onClick={() => deleteOrder(translation)}>Delete<i className="fas fa-trash-alt" /></button>
            </ul>
        )
    }
}

export default RenderTranslations;