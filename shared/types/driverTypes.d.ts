export interface Driver {
  id: string;
  userId: string;         // Reference to a User (account)
  licenceNumber: string;
  vehicleType: string;
  vehicleNumber: string;
  rating: number;
  isAvailable: boolean;
  updatedAt: string;
}
