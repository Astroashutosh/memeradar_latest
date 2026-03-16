import * as anchor from "@coral-xyz/anchor";

export interface UserData {
  userId: number;
  rank: string;
  upline: string;
  uplineId?: number;
  sponsor: string;
  sponsorId?: number;
  totalIncome: number;
  sponsorIncome: number;
  directIncome: number;
  levelIncome: number;
  poolIncome: number;
  lapsIncome: number;
  leftPartner: string;
  rightPartner: string;
  leftPartnerId?: number;
  rightPartnerId?: number;
  leftVolume: number;
  rightVolume: number;
  currentPackage: number;
    carryLeft: number;
  carryRight: number;
}

export interface AnchorUserAccount {
  wallet: anchor.web3.PublicKey;
  id: anchor.BN;
  referrer: anchor.web3.PublicKey;
  upline: anchor.web3.PublicKey;
  left: anchor.web3.PublicKey;
  right: anchor.web3.PublicKey;
  leftVolume: anchor.BN;
  rightVolume: anchor.BN;
  carryLeft: anchor.BN;
  carryRight: anchor.BN;
  rank: number;
  dailyMatchingIncome: anchor.BN;
  lastMatchingDay: anchor.BN;
  currentPackage: number;
  partnerCount: number;
  totalMatrixTeam: number;
  exists: boolean;
  totalIncome: anchor.BN;
  partnerSponsorBonus: anchor.BN;
  partnerDirectKickBonus: anchor.BN;
  partnerLevelBonus: anchor.BN;
  poolLevelIncome: anchor.BN;
  lapsIncome: anchor.BN;
  bump: number;
}