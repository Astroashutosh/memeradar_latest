import * as anchor from "@coral-xyz/anchor";
import { PROGRAM_ID, connection } from "./constants";
import idl from "./idl.json";

export const getProvider = () => {
  const provider = (window as any).solana;
  if (!provider || !provider.isPhantom) {
    throw new Error("Phantom wallet not found");
  }
 
  return new anchor.AnchorProvider(
    connection,
    provider,
    anchor.AnchorProvider.defaultOptions()
  );
};

export const getProgram = () => {
  const provider = getProvider();
  return new anchor.Program(
    idl as anchor.Idl,
    PROGRAM_ID,
    provider
  );
};