import React from 'react';
import { render } from '@testing-library/react';

// Import your MapComponent with SSR disabled for tests
import dynamic from 'next/dynamic';
const MapComponent = dynamic(() => import('../components/MapComponent'), { ssr: false, loading: () => <div>Loading...</div> });

// Basic test to ensure MapComponent renders
describe('MapComponent', () => {
  it('renders without crashing', () => {
    const { container } = render(<MapComponent pickup={[17.385, 78.4867]} dropoff={[17.435, 78.4444]} />);
    expect(container).toBeTruthy();
  });
});
