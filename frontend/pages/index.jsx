import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useAuth } from '../context/AuthContext';
import RideForm from '../components/RideForm';
import styles from '../components/HomeHero.module.css';
import Footer from '../components/Footer';

// Map (Leaflet) – SSR off
const MapComponent = dynamic(() => import('../components/MapComponent'), {
  ssr: false,
});

export default function Home() {
  const { user, logout, token } = useAuth();
  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);

  const handleRequestRide = async ({ pickup, dropoff }) => {
    // demo markers
    setPickup([17.385, 78.4867]);
    setDropoff([17.435, 78.4444]);

    if (!token) {
      alert('Please log in as a rider to request a ride.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/rides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pickup, dropoff }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Ride requested successfully!');
        console.log('Ride created:', data);
      } else {
        console.error('Ride error:', data);
        alert(data.error || 'Ride request failed');
      }
    } catch (err) {
      console.error('Ride request error:', err);
      alert('Server error while creating ride');
    }
  };

  return (
    <>
      <div className={styles.page}>
        <div className={styles.inner}>
          {/* Top bar */}
          <header className={styles.topBar}>
            <div className={styles.logo}>
              Uber<span>Clone</span>
            </div>
            <nav className={styles.navLinks}>
              {user ? (
                <>
                  <span className={styles.navLink}>
                    {user.name ? `Hi, ${user.name}` : user.email}
                  </span>
                  <Link href="/dashboard" className={styles.navLink}>
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    className={styles.navLink}
                    onClick={logout}
                    style={{ border: 'none', background: 'transparent', padding: 0 }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/register" className={styles.navLink}>
                    Register
                  </Link>
                  <Link href="/login" className={styles.navLink}>
                    Login
                  </Link>
                  <Link href="/dashboard" className={styles.navLink}>
                    Dashboard
                  </Link>
                </>
              )}
            </nav>
          </header>

          {/* Badge */}
          <div className={styles.badge}>🚗 Demo Uber-style booking</div>

          {/* Hero grid: form + map */}
          <div className={styles.heroGrid}>
            {/* Left: text + form */}
            <section className={styles.heroText}>
              <h1 className={styles.heroTitle}>
                Book your next ride with{' '}
                <span className={styles.heroHighlight}>Uber</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Enter your pickup and drop locations, preview your route on the map,
                then manage everything from your dashboard.
              </p>

              <div className={styles.formCard}>
                {user && user.role === 'driver' ? (
                  <p className={styles.helperText}>
                    You are logged in as a driver. Go to your dashboard to see assigned
                    rides.
                  </p>
                ) : user ? (
                  <RideForm onRequestRide={handleRequestRide} />
                ) : (
                  <p className={styles.helperText}>
                    Please log in as a rider to request a ride.
                  </p>
                )}
              </div>
            </section>

            {/* Right: map */}
            <section className={styles.mapCard}>
              <div className={styles.mapHeader}>
                <div className={styles.mapTitle}>Live route preview</div>
                <div className={styles.mapHint}>
                  After you request a ride, your pickup and drop markers will appear
                  here.
                </div>
              </div>
              <div className={styles.mapBody}>
                <MapComponent pickup={pickup} dropoff={dropoff} />
              </div>
            </section>
          </div>

          {/* Info cards row */}
          <section className={styles.infoSection}>
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <h2>Why ride with Uber?</h2>
                <p>
                  Upfront routes, simple booking flow, and a clean dashboard to track
                  your trips.
                </p>
              </div>
              <div className={styles.infoCard}>
                <h3>Safe and reliable</h3>
                <p>
                  Drivers verify their profile and see only rides that match their
                  status.
                </p>
              </div>
              <div className={styles.infoCard}>
                <h3>For riders and drivers</h3>
                <p>
                  Riders request trips in seconds, drivers see incoming requests on
                  their dashboard.
                </p>
              </div>
            </div>
          </section>

          {/* Two-column info */}
          <section className={styles.infoSectionAlt}>
            <div className={styles.infoSplit}>
              <div>
                <h2>Built like a real app</h2>
                <ul>
                  <li>JWT auth with rider / driver roles</li>
                  <li>Live map preview with pickup and drop markers</li>
                  <li>Driver dashboard with incoming ride requests</li>
                </ul>
              </div>
              <div>
                <h2>Coming next</h2>
                <ul>
                  <li>Stripe payments and fare history</li>
                  <li>Better driver assignment logic</li>
                  <li>Push-style real-time updates</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer below hero */}
      <Footer />
    </>
  );
}
