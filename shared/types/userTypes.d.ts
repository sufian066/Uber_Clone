export type UserRole = 'rider' | 'driver' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password?: string;     // For backend only, not sent to frontend
  createdAt?: string;
}
