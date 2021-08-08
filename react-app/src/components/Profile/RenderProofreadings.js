
import styles from '../../css-modules/Profile.module.css';
import {useState} from 'react';
import Proofreading from '../Order/Proofreading';
import { NavLink } from 'react-router-dom';

const RenderProofreadings = ({ proofreading, editOrder, deleteOrder }) => {
    const [edit, setEdit] = useState(false);
    if (edit === true) {
        // setEdit(!edit)
        return (
            <Proofreading
                proofreading={proofreading.proofreading}
                onSubmit={() => setEdit(!edit)} />
        )
    } else {
        return (
            <ul className={styles.orderRender} key={proofreading.proofreading.id}>
                <li>Document: <a href={proofreading.proofreading.document_url}>{proofreading.proofreading.field} translation.</a></li>
                <li>Field: {proofreading.proofreading.field}</li>
                <li>Word count: {proofreading.proofreading.word_count}</li>
                <li>Language: {proofreading.proofreading.language}</li>
                <li>Date created: {proofreading.proofreading.created_at}</li>
                <button className={styles.editButton} onClick={() => setEdit(!edit)}>📝</button>
                <button className={styles.deleteButton} onClick={() => deleteOrder(proofreading)}>🗑</button>
            </ul>

        )
    }
}

export default RenderProofreadings;