import React, { createContext, useContext, useState } from 'react';

const RideContext = createContext();

export function RideProvider({ children }) {
  const [rides, setRides] = useState([]); // User's ride history
  const [currentRide, setCurrentRide] = useState(null);

  const addRide = (ride) => {
    setCurrentRide(ride);
    setRides((prev) => [ride, ...prev]);
  };

  const updateRideStatus = (rideId, status) => {
    setRides((prev) =>
      prev.map((ride) =>
        ride._id === rideId ? { ...ride, status } : ride
      )
    );
    if (currentRide && currentRide._id === rideId) {
      setCurrentRide({ ...currentRide, status });
    }
  };

  return (
    <RideContext.Provider value={{ rides, setRides, currentRide, setCurrentRide, addRide, updateRideStatus }}>
      {children}
    </RideContext.Provider>
  );
}

export const useRide = () => useContext(RideContext);
