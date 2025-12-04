import { useEffect, useState } from 'react';

export default function RideHistory({ token }) {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchRides = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/rides', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setRides(data);
        } else {
          console.error('Ride history error:', data);
        }
      } catch (err) {
        console.error('Ride history fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, [token]);

  if (loading) return <p>Loading rides...</p>;

  return (
    <div>
      <h2>My Rides</h2>
      {rides.length === 0 && <p>No rides yet.</p>}
      {rides.map((ride) => (
        <div key={ride._id} style={{ border: '1px solid #ddd', margin: 8, padding: 8 }}>
          <p><b>Pickup:</b> {ride.pickup}</p>
          <p><b>Dropoff:</b> {ride.dropoff}</p>
          <p><b>Status:</b> {ride.status}</p>
        </div>
      ))}
    </div>
  );
}
