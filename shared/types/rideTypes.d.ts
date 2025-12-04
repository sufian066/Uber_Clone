export interface Rider {
  id: string;
  userId: string;         // Reference to a User (account)
  paymentMethods?: string[];  // Array of tokenized payment methods (optional)
  ridesTaken?: number;        // Optional: total rides the rider has taken
}
