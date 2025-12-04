import { useState } from 'react';

export default function useMap() {
  const [coords, setCoords] = useState(null);

  // Simple geocoding: turn address into [lat, lng]
  async function geocode(address) {
    try {
      const resp = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=YOUR_GEOAPIFY_API_KEY`);
      const data = await resp.json();
      if (data && data.features && data.features.length) {
        const { lat, lon } = data.features[0].properties;
        setCoords([lat, lon]);
        return [lat, lon];
      }
    } catch {
      setCoords(null);
      return null;
    }
  }

  return {
    coords,
    geocode,
    setCoords
  };
}
