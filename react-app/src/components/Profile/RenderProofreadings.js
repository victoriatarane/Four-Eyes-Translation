
import styles from '../../css-modules/Profile.module.css';
import {useState} from 'react';
import Proofreading from '../Order/Proofreading';

const RenderProofreadings = ({ proofreading, editOrder, deleteOrder }) => {
    const makeChanges = (proofreading) => {
        editOrder(proofreading)
    }
    const [edit, setEdit] = useState(false);
    if (edit === true) {
        // setEdit(!edit)
        return (
            <div className={styles.orderForm}>
                <Proofreading
                    // className={styles.orderForm}
                    translaton={proofreading}
                    onSubmit={() => {
                        setEdit(!edit)
                        makeChanges(proofreading)}} />
            </div>
        )
    } else {
        return (
            <ul className={styles.orderRender} key={proofreading.proofreading.id}>
                <li>Document: {proofreading.proofreading.document_url}</li>
                <li>Field: {proofreading.proofreading.field}</li>
                <li>Word count: {proofreading.proofreading.word_count}</li>
                <li>Language: {proofreading.proofreading.language}</li>
                <li>Date created: {proofreading.proofreading.created_at}</li>
                <button className={styles.editButton} onClick={() => setEdit(!edit)}>Edit<i className="fa-solid fa-pen" /></button>
                <button className={styles.deleteButton} onClick={() => deleteOrder(proofreading)}>Delete<i className="fas fa-trash-alt" /></button>
            </ul>

        )
    }
}

export default RenderProofreadings;