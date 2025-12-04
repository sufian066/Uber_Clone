import styles from './DashboardLayout.module.css';

export default function DashboardLayout({ user, left, right }) {
  return (
    <div className={styles.dashboardPage}>
      <div className={styles.dashboardShell}>
        <aside className={styles.sidebar}>
          <div className={styles.logo}>
            Uber<span>Clone</span>
          </div>
          <div className={styles.navTitle}>Main</div>
          <ul className={styles.navList}>
            <li className={`${styles.navItem} ${styles.navItemActive}`}>Dashboard</li>
            <li className={styles.navItem}>My Rides</li>
            <li className={styles.navItem}>Payments</li>
          </ul>

          <div className={styles.navTitle} style={{ marginTop: '18px' }}>Account</div>
          <ul className={styles.navList}>
            <li className={styles.navItem}>Profile</li>
            <li className={styles.navItem}>Settings</li>
          </ul>
        </aside>

        <main className={styles.main}>
          <div className={styles.topRow}>
            <h1 className={styles.pageTitle}>Dashboard</h1>
            <div className={styles.userChip}>
              {user ? `Logged in as ${user.role}` : 'Not logged in'}
            </div>
          </div>

          <div className={styles.contentCards}>
            <section className={styles.card}>{left}</section>
            <section className={styles.card}>{right}</section>
          </div>
        </main>
      </div>
    </div>
  );
}
