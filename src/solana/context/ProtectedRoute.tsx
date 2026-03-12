import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useWallet } from './WalletContext';
import { checkUserRegistered } from '../program';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { wallet } = useWallet();
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState<boolean | null>(null);

  useEffect(() => {
    const verify = async () => {
      if (!wallet) {
        setLoading(false);
        return;
      }

      try {
        const isRegistered = await checkUserRegistered(wallet);
        setRegistered(isRegistered);
      } catch (err) {
        console.error("Error checking registration:", err);
        setRegistered(false);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [wallet]);

  // Still loading
  if (loading) {
    return <div className="centered-page">Loading...</div>;
  }

  // Wallet not connected
  if (!wallet) {
    return <Navigate to="/" replace />;
  }

  // Wallet connected but not registered
  if (registered === false) {
    return <Navigate to="/register" replace />;
  }

  // Wallet connected and registered
  return <>{children}</>;
};

export default ProtectedRoute;