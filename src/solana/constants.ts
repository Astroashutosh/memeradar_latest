import { PublicKey, Connection } from '@solana/web3.js';

export const PROGRAM_ID = new PublicKey('DcA18HBQkDMzhtBkzURKXHYtKTqjSZ93ERyFm6UXm7T2');
export const globalPda = new PublicKey('AvEcTgG77yub5wcyQZgvzfVASy8LdNvfUu572ToQDn2C');
export const vaultPda = new PublicKey("GVmocw94r2HLFdpwG5JwEDrCn54JoZGboGYkWoRpPAB5");
export const CLUSTER_URL = 'https://api.devnet.solana.com';
export const connection = new Connection(CLUSTER_URL, "confirmed");
export const ZERO = new PublicKey("11111111111111111111111111111111");