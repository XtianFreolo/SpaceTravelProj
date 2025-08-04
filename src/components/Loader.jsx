import styles from "./Loading.module.css";

const Loader = () => {
    return (
        <div className={styles.overlay}>
            <div className={styles.loader}></div>
            <div className={styles.text}>Engaging warp drive...</div>
        </div>
    );
};

export default Loader;
