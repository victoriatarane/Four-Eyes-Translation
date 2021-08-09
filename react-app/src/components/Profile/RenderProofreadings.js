
import styles from '../../css-modules/Profile.module.css';
import {useState} from 'react';
import Proofreading from '../Order/Proofreading';
import { NavLink } from 'react-router-dom';

const RenderProofreadings = ({ proofreading, editOrder, deleteOrder }) => {
    const [edit, setEdit] = useState(false);
    if (edit === true) {
        // setEdit(!edit)
        return (
            <div className={styles.editDiv}>
                <Proofreading
                    proofreading={proofreading.proofreading}
                    onSubmit={() => setEdit(!edit)} />
            </div>
        )
    } else {
        return (
            <div className={styles.transDiv}>
                <ul className={styles.orderRender} key={proofreading.proofreading.id}>
                    <li>Document: <a href={proofreading.proofreading.document_url}>{proofreading.proofreading.field} translation.</a></li>
                    <li>Field: {proofreading.proofreading.field}</li>
                    <li>Word count: {proofreading.proofreading.word_count}</li>
                    <li>Language: {proofreading.proofreading.language}</li>
                    <li>Date created: {proofreading.proofreading.created_at}</li>
                </ul>
                <div className={styles.buttons}>
                    <button className={styles.editButton} onClick={() => setEdit(!edit)}>📝</button>
                    <button className={styles.deleteButton} onClick={() => deleteOrder(proofreading)}>🗑</button>
                </div>
            </div>

        )
    }
}

export default RenderProofreadings;