import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topRow}>
        <div className={styles.logo}><span>Uber</span></div>
        <button className={styles.helpLink}>Visit Help Center</button>
      </div>

      <div className={styles.columnsRow}>
        <div className={styles.leftBlock}>
          <div className={styles.footerColumn}>
            <h4>Company</h4>
            <a>About us</a>
            <a>Our offerings</a>
            <a>Newsroom</a>
            <a>Investors</a>
            <a>Blog</a>
            <a>Careers</a>
          </div>
        </div>

        <div className={styles.rightBlock}>
          <div className={styles.footerColumn}>
            <h4>Products</h4>
            <a>Ride</a>
            <a>Drive</a>
            <a>Deliver</a>
            <a>Uber for Business</a>
            <a>Gift cards</a>
          </div>
          <div className={styles.footerColumn}>
            <h4>Global citizenship</h4>
            <a>Safety</a>
            <a>Sustainability</a>
          </div>
          <div className={styles.footerColumn}>
            <h4>Travel</h4>
            <a>Reserve</a>
            <a>Airports</a>
            <a>Cities</a>
          </div>
        </div>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.bottomLeft}>
          <span>English</span>
          <span>•</span>
          <span>India</span>
        </div>
        <div className={styles.bottomRight}>
          <span>© {new Date().getFullYear()} Uber Clone</span>
        </div>
      </div>
    </footer>
  );
}
