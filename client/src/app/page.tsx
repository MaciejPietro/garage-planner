import Link from 'next/link';
import styles from './page.module.css';

export default function Planner() {
  return (
    <div className={styles.grid}>
      <Link href="dashboard" className={styles.card}>
        <h2>
          Dashboard <span>-&gt;</span>
        </h2>
      </Link>
    </div>
  );
}
