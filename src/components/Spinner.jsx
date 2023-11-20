import styles from '../styles/spinner.module.css';
export default function Spinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className={styles.loader}></span>
    </div>
  );
}
