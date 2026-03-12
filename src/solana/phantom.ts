import { notifyInfo } from "./context/Notifications";

export const getPhantomProvider = () => {
  const provider = (window as any).solana;

  if (!provider || !provider.isPhantom) {
    notifyInfo("Phantom wallet not installed!")
    return null;
  }

  return provider;
};

export const connectWallet = async () => {
  const provider = getPhantomProvider();
  if (!provider) return null;

  const resp = await provider.connect();
  return resp.publicKey.toString();
};

export const getConnectedWallet = async () => {
  const provider = getPhantomProvider();
  if (!provider) return null;

  try {
    const resp = await provider.connect({ onlyIfTrusted: true });
    return resp.publicKey.toString();
  } catch {
    return null;
  }
};

export const disconnectWallet = async () => {
  const provider = getPhantomProvider();
  if (provider) await provider.disconnect();
};