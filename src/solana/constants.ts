import { PublicKey, Connection } from '@solana/web3.js';

export const PROGRAM_ID = new PublicKey('2BeffbNsCspUKr15Rcnz5N2mNqrxbvMrKC2fGES2NPAC');
export const globalPda = new PublicKey('CPVMZh57xAWqgN3DmjC3nhkaKoywqnfXU3jyBU8b2FUL');
export const vaultPda = new PublicKey("7S2AwHoPCcQ5G2R1yNkuTMPFicWUw7G42pP3VbPjvPaU");
export const CLUSTER_URL = 'https://api.devnet.solana.com';
export const connection = new Connection(CLUSTER_URL, "confirmed");
export const ZERO = new PublicKey("11111111111111111111111111111111");