import page404 from './assets/page404.jpeg';
import styles from '../css-modules/Page404.module.css'


function Page404() {

    return (
        <div className={styles.page404}>
            <h1 className={styles.page404__header}>Page Not Found!</h1>
            <div className={styles.page404div}>
                <img src={page404} alt="404" className={styles.page404img} />
            </div>
            <div className={styles.page404txt}>
                <div>
                    <p>The resource couldn't be found!</p>
                </div>
            </div>
        </div>
    )
}

export default Page404;