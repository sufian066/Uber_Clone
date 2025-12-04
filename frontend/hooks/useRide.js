import { useContext } from 'react';
import { RideContext } from '../context/RideContext';

export default function useRide() {
  return useContext(RideContext);
}
