import { useState } from 'react';
import { loginUser, registerUser } from '../utils/apiUtils';

export default function useAuth() {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    if (data.token) setUser(data); // You may want setUser(data.user) if backend returns user object separately
    return data;
  };

  const register = async (form) => {
    return await registerUser(form);
  };

  return { user, login, register };
}
