import { Navigate } from "react-router-dom";
import { useWallet } from "./WalletContext";

const GuestRoute = ({ children }: any) => {
  const { wallet, walletReady } = useWallet();

  if (!walletReady) return <div>Loading...</div>;

  if (wallet) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default GuestRoute;