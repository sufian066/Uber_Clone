import { AuthProvider } from '../context/AuthContext';
import { RideProvider } from '../context/RideContext';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}


