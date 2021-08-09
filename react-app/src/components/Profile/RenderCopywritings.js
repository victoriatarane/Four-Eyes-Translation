import styles from '../../css-modules/Profile.module.css';
import {useState} from 'react';
import Copywriting from '../Order/Copywriting';

const RenderCopywritings = ({ copywriting, editOrder, deleteOrder }) => {
    const [edit, setEdit] = useState(false);
    if (edit === true) {
        // setEdit(!edit)
        return ( 
            <div className={styles.editDiv}>
                <Copywriting
                    copywriting={copywriting.copywriting}
                    onSubmit={() => setEdit(!edit)} />
            </div>
        )
    } else {
        return (
            <div className={styles.transDiv}>
                <ul className={styles.orderRender} key={copywriting.copywriting.id}>
                    <li>Description: {copywriting.copywriting.description}</li>
                    <li>Key words: {copywriting.copywriting.key_words}</li>
                    <li>Links: {copywriting.copywriting.links}</li>
                    <li>Field: {copywriting.copywriting.field}</li>
                    <li>Word count: {copywriting.copywriting.word_count}</li>
                    <li>Language: {copywriting.copywriting.language}</li>
                    <li>Date created: {copywriting.copywriting.created_at}</li>
                </ul>
                <div className={styles.buttons}>
                    <button className={styles.editButton} onClick={() => setEdit(!edit)}>📝</button>
                    <button className={styles.deleteButton} onClick={() => deleteOrder(copywriting)}>🗑</button>
                </div>
            </div>
        )
    }
}

export default RenderCopywritings;