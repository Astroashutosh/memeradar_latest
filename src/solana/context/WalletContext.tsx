import { createContext, useContext, useEffect, useState } from "react";
import { connectWallet, getConnectedWallet, disconnectWallet, getPhantomProvider } from "../phantom";
import { PublicKey } from "@solana/web3.js";

interface WalletContextType {
  wallet: string | null;
  connect: () => Promise<string | null>;
  disconnect: () => Promise<void>;
  walletReady: boolean;
}

const WalletContext = createContext<WalletContextType | null>(null);

export const WalletProvider = ({ children }: any) => {

  const [wallet, setWallet] = useState<string | null>(null);
  const [walletReady, setWalletReady] = useState(false);

  const connect = async () => {
    const w = await connectWallet();
    if (w) setWallet(w);
    return w;
  };

  const disconnect = async () => {
    await disconnectWallet();
    setWallet(null);
  };

  useEffect(() => {
    const autoConnect = async () => {
      const w = await getConnectedWallet();
      if (w) setWallet(w);
      setWalletReady(true);
    };

    autoConnect();

    const provider = getPhantomProvider();
    provider.on("accountChanged", (publicKey: PublicKey | null) => {
      if (publicKey) {
        setWallet(publicKey.toString());
      } else {
        setWallet(null);
      }
    });
  }, []);
  

  

  return (
    <WalletContext.Provider value={{ wallet, connect, disconnect, walletReady }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("WalletContext missing");
  return ctx;
};




