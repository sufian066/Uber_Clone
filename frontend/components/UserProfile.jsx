import React from 'react';
import styles from './UserProfile.module.css';

export default function UserProfile({ user, activeTab, onTabChange }) {
  return (
    <div>
      <h2>{user.name || user.email}</h2>
      <p>Role: {user.role}</p>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li
          style={{ cursor: 'pointer', fontWeight: activeTab === 'rides' ? 'bold' : 'normal' }}
          onClick={() => onTabChange('rides')}
        >
          My Rides
        </li>
        <li
          style={{ cursor: 'pointer', fontWeight: activeTab === 'payments' ? 'bold' : 'normal' }}
          onClick={() => onTabChange('payments')}
        >
          Payments
        </li>
        <li
          style={{ cursor: 'pointer', fontWeight: activeTab === 'profile' ? 'bold' : 'normal' }}
          onClick={() => onTabChange('profile')}
        >
          Profile
        </li>
        <li
          style={{ cursor: 'pointer', fontWeight: activeTab === 'settings' ? 'bold' : 'normal' }}
          onClick={() => onTabChange('settings')}
        >
          Settings
        </li>
      </ul>
    </div>
  );
}

