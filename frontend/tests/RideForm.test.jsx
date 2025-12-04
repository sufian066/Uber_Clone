import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RideForm from '../components/RideForm';

describe('RideForm', () => {
  it('calls onRequestRide with correct values on submit', () => {
    const mockRequestRide = jest.fn();
    const { getByPlaceholderText, getByRole } = render(<RideForm onRequestRide={mockRequestRide} />);
    
    fireEvent.change(getByPlaceholderText(/Pickup location/i), { target: { value: 'Hitech City' } });
    fireEvent.change(getByPlaceholderText(/Drop-off location/i), { target: { value: 'Miyapur' } });
    fireEvent.click(getByRole('button', { name: 'Request Ride' }));

    expect(mockRequestRide).toHaveBeenCalledWith({ pickup: 'Hitech City', dropoff: 'Miyapur' });
  });
});
