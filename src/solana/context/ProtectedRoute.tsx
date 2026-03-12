import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useWallet } from "./WalletContext";
import { checkUserRegistered } from "../program";

const ProtectedRoute = ({ children }: any) => {

  const { wallet, walletReady } = useWallet();

  const [registered, setRegistered] = useState<boolean | null>(null);

  // localStorage login flag
  const isLoggedIn = localStorage.getItem("wallet_login");

  useEffect(() => {

    if (!walletReady) return;

    const verify = async () => {

      if (!wallet || !isLoggedIn) {
        setRegistered(false);
        return;
      }

      try {

        const isRegistered = await checkUserRegistered(wallet);

        setRegistered(isRegistered);

      } catch (err) {

        console.error(err);
        setRegistered(false);

      }

    };

    verify();

  }, [wallet, walletReady, isLoggedIn]);

  // wait wallet init
  if (!walletReady) {
    return <div>Loading...</div>;
  }

  // not logged in
  if (!wallet || !isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // wait registration check
  if (registered === null) {
    return <div>Loading...</div>;
  }

  // wallet connected but not registered
  if (!registered) {
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default ProtectedRoute;