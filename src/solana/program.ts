import { PublicKey, SystemProgram } from "@solana/web3.js";
import { Buffer } from 'buffer';
import * as anchor from '@coral-xyz/anchor';
// import { BN } from '@coral-xyz/anchor';
import { PROGRAM_ID, connection, globalPda, vaultPda, ZERO } from "./constants";
import { getProgram } from "./anchor";
import type { AnchorUserAccount } from "./types";

export const packages = [
  { id: 1, name: "Starter", price: 0.2 },
  { id: 2, name: "Advisor", price: 0.25 },
  { id: 3, name: "Bronze", price: 0.5 }, //green
  { id: 4, name: "Silver", price: 1 },
  { id: 5, name: "Gold", price: 2 },
  { id: 6, name: "Platinum", price: 4 }, //green
  { id: 7, name: "Sapphire", price: 8 }, //red
  { id: 8, name: "Diamond", price: 16 },
  { id: 9, name: "Director", price: 32 }, //red
  { id: 10, name: "President", price: 64 }, //yellow
];

export const shorten = (address: string) => {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};

export const getUserPda = (wallet: string): PublicKey => {
  const walletPubkey = new PublicKey(wallet);
  const [userPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("user"), walletPubkey.toBuffer()],
    PROGRAM_ID
  );
  return userPda;
};

export const checkUserRegistered = async (wallet: string) => {
  try {
    const userPda = getUserPda(wallet);
    const account = await connection.getAccountInfo(userPda);
    return account !== null;

  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getUserId = async (wallet: string) => {
  try {
    const program = getProgram();
    const userPda = getUserPda(wallet);
    const account: any = await program.account.userAccount.fetch(userPda);
    return account.id.toNumber();

  } catch {
    return "-";
  }
};

export const registerUser = async (
  wallet: string,
  sponsorWallet: string
) => {
  const program = getProgram();
  const user = new PublicKey(wallet);
  const userPda = getUserPda(wallet);
  const sponsorPda = getUserPda(sponsorWallet);
  // const sponsorAccount = await program.account.userAccount.fetch(sponsorPda);
  const sponsorAccount =
  (await program.account.userAccount.fetch(sponsorPda)) as unknown as AnchorUserAccount;
  console.log("sponsorAccount",sponsorAccount);
  let remainingAccounts: any[] = [];
  let currentUpline = sponsorAccount.wallet as PublicKey;
  for (let i = 0; i < 10; i++) {
    if (currentUpline.equals(ZERO)) break;

    const uplineUserPda = getUserPda(currentUpline.toString());

    try {
      const upline = (await program.account.userAccount.fetch(uplineUserPda)) as unknown as AnchorUserAccount;;

      remainingAccounts.push({
        pubkey: uplineUserPda,
        isWritable: true,
        isSigner: false,
      });

      console.log("Level", i + 1, upline.wallet.toBase58());

      // move to next upline
      currentUpline = upline.upline as PublicKey;
    } catch {
      break;
    }
  }
  console.log("RemainingAccountsLength:",remainingAccounts.length);
  console.log("RemainingAccounts:",remainingAccounts.map(a => a.pubkey.toBase58()));
  const tx = await program.methods
    .register()
    .accounts({
      signer: user,
      user: userPda,
      sponsorUser: sponsorPda,
      global: globalPda,
      systemProgram: SystemProgram.programId
    })
    .remainingAccounts(remainingAccounts)
    .rpc();

  return tx;
};

export const upgradePackage = async (
  wallet: string,
  newPackage: number
) => {

  const program = getProgram();

  const userPubkey = new PublicKey(wallet);
  const userPda = getUserPda(wallet);

  // -------------------------
  // Fetch User Account
  // -------------------------
  let userAccount: any;

  try {
    userAccount = await program.account.userAccount.fetch(userPda);
  } catch {
    throw new Error("User account not found. Please register first.");
  }

  if (!userAccount.referrer || new PublicKey(userAccount.referrer).equals(PublicKey.default)) {
    throw new Error("Sponsor not found for this user.");
  }

  const sponsorWallet = new PublicKey(userAccount.referrer.toString());
  const sponsorPda = getUserPda(sponsorWallet.toString());

  const globalAccount: any = await program.account.globalState.fetch(globalPda);
  const ownerPubkey = new PublicKey(globalAccount.owner.toString());

  const sponsorUserAccount: any =
  await program.account.userAccount.fetch(sponsorPda);

  const remainingAccounts: any[] = [];

  let currentUpline =
    sponsorUserAccount.referrer &&
    !new PublicKey(sponsorUserAccount.referrer).equals(PublicKey.default)
      ? new PublicKey(sponsorUserAccount.referrer)
      : null;

  const visited = new Set<string>(); // safety to prevent infinite loops

  while (currentUpline) {

    const uplinePda = getUserPda(currentUpline.toString());

    const uplineAccount: any =
      await program.account.userAccount.fetch(uplinePda);

    // stop if circular reference detected
    if (visited.has(currentUpline.toBase58())) {
      break;
    }

    visited.add(currentUpline.toBase58());

    remainingAccounts.push({
      pubkey: uplinePda,
      isWritable: true,
      isSigner: false,
    });

    remainingAccounts.push({
      pubkey: new PublicKey(uplineAccount.wallet),
      isWritable: true,
      isSigner: false,
    });

    currentUpline =
      uplineAccount.referrer &&
      !new PublicKey(uplineAccount.referrer).equals(PublicKey.default)
        ? new PublicKey(uplineAccount.referrer)
        : null;
  }

  console.log(
    "RemainingAccounts:",
    remainingAccounts.map(a => a.pubkey.toBase58())
  );

  // -------------------------
  // Execute Upgrade
  // -------------------------
  const tx = await program.methods
    .upgrade(newPackage)
    .accounts({
      signer: userPubkey,
      user: userPda,
      sponsorUser: sponsorPda,
      sponsorWallet: sponsorWallet,
      global: globalPda,
      vault: vaultPda,
      owner: ownerPubkey,
      systemProgram: SystemProgram.programId,
    })
    .remainingAccounts(remainingAccounts)
    .rpc();

  return tx;
};


export const getUserData = async (wallet: string) => {
  try {
    const program = getProgram();
    const userPda = getUserPda(wallet);
    const account = (await program.account.userAccount.fetch(userPda).catch(() => null)) as AnchorUserAccount | null;
    if (!account) {
      return null;
    }
    const defaultKey = anchor.web3.PublicKey.default.toBase58();
    const sponsorKey = account.referrer.toBase58();
    const uplineKey = account.upline.toBase58();
    const leftKey = account.left.toBase58();
    const rightKey = account.right.toBase58();

    const fetchUserId = async (walletAddress: string) => {

      if (walletAddress === defaultKey) return undefined;

      const [pda] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("user"), new anchor.web3.PublicKey(walletAddress).toBuffer()],
        PROGRAM_ID
      );

      try {
        const acc: any = await program.account.userAccount.fetch(pda);
        return acc.id.toNumber();
      } catch {
        return undefined;
      }

    };

    const sponsorId = await fetchUserId(sponsorKey);
    const uplineId = await fetchUserId(uplineKey);
    const leftPartnerId = await fetchUserId(leftKey);
    const rightPartnerId = await fetchUserId(rightKey);

    return {
      userId: account.id.toNumber(),

      sponsor: sponsorKey === defaultKey ? "Not Assigned" : sponsorKey,
      sponsorId,

      upline: uplineKey === defaultKey ? "Not Assigned" : uplineKey,
      uplineId,

      leftPartner: leftKey === defaultKey ? "Not Assigned" : leftKey,
      leftPartnerId,

      rightPartner: rightKey === defaultKey ? "Not Assigned" : rightKey,
      rightPartnerId,
      totalIncome:
        account.totalIncome.toNumber() / anchor.web3.LAMPORTS_PER_SOL,
      sponsorIncome:
        account.partnerSponsorBonus.toNumber() /
        anchor.web3.LAMPORTS_PER_SOL,
      directIncome:
        account.partnerDirectKickBonus.toNumber() /
        anchor.web3.LAMPORTS_PER_SOL,
      levelIncome:
        account.partnerLevelBonus.toNumber() /
        anchor.web3.LAMPORTS_PER_SOL,
      poolIncome:
        account.poolLevelIncome.toNumber() /
        anchor.web3.LAMPORTS_PER_SOL,
      lapsIncome:
        account.lapsIncome.toNumber() /
        anchor.web3.LAMPORTS_PER_SOL,
      leftVolume:
        account.leftVolume.toNumber() /
        anchor.web3.LAMPORTS_PER_SOL,
      rightVolume:
        account.rightVolume.toNumber() /
        anchor.web3.LAMPORTS_PER_SOL,
      currentPackage: account.currentPackage,
      partnerCount: account.partnerCount,
      totalMatrixTeam: account.totalMatrixTeam,

    };

  } catch (err) {
    console.error(err);
    return null;
  }
};

// const getPrice = (amount : String) => {
//   const lamportsPerSol = new BN(anchor.web3.LAMPORTS_PER_SOL);
//   console.log("amount",amount.toString())
// console.log(lamportsPerSol.toString());
//   return new BN(amount)
//   .div(lamportsPerSol)
//   .toNumber();
// }


// export const getIncomeEvents = async () => {
//   const program = getProgram();

//   let before: string | undefined = undefined;
//   const events: any[] = [];

//   while (events.length < 200) {

//     const signatures = await connection.getSignaturesForAddress(
//       program.programId,
//       { limit: 50, before }
//     );

//     if (signatures.length === 0) break;

//     for (const sig of signatures) {

//       const tx = await connection.getTransaction(sig.signature, {
//         commitment: "confirmed",
//         maxSupportedTransactionVersion: 0
//       });

//       if (!tx?.meta?.logMessages) continue;

//       for (const log of tx.meta.logMessages) {
//         try {
//           const event = program.coder.events.decode(log);
//           if (event?.name === "IncomeEvent") {
//             events.push(event.data);
//           }
//         } catch {}
//       }

//     }

//     before = signatures[signatures.length - 1].signature;

//   }

//   return events;
// };


export const getDirectPartners = async (wallet: string) => {
  try {
    const program = getProgram();
    const userPda = getUserPda(wallet);
    const account = (await program.account.userAccount.fetch(userPda).catch(() => null)) as AnchorUserAccount | null;
    if (!account) return [];

    const defaultKey = PublicKey.default.toBase58();

    // Helper to fetch a partner account
    const fetchPartner = async (partnerWallet: PublicKey) => {
      if (!partnerWallet || partnerWallet.toBase58() === defaultKey) return null;

      const partnerPda = getUserPda(partnerWallet.toBase58());
      try {
        const partnerAccount = await program.account.userAccount.fetch(partnerPda) as unknown as AnchorUserAccount;
        return {
          wallet: partnerAccount.wallet.toBase58(),
          dboId: partnerAccount.id.toNumber(),
          currentPackage: partnerAccount.currentPackage,
          // joinedAt: partnerAccount.joinedAt || "-", // optional timestamp
        };
      } catch {
        return null;
      }
    };

    // Collect all direct partners (example: left and right)
    const directPdas = [account.left, account.right]; // add more if needed
    const directPartners = [];

    for (let pda of directPdas) {
      const partner = await fetchPartner(pda);
      if (partner) directPartners.push(partner);
    }

    return directPartners;

  } catch (err) {
    console.error("Error fetching direct partners:", err);
    return [];
  }
};

export const getLevelPartners = async (
  wallet: string,
  maxLevels = 10
): Promise<any[][]> => {
  try {
    const program = getProgram();
    const userPda = getUserPda(wallet);

    const account: any = await program.account.userAccount.fetch(userPda);
    if (!account) return [];

    const levels: any[][] = [];

    for (let i = 0; i < maxLevels; i++) {
      const levelWallets = account.levelUsers[i] || [];

      const users = await Promise.all(
        levelWallets.map(async (pk: any) => {
          const walletAddr = pk.toBase58 ? pk.toBase58() : pk;

          try {
            const partnerPda = getUserPda(walletAddr);
            const partner: any = await program.account.userAccount.fetch(partnerPda);

            return {
              wallet: walletAddr,
              id: partner.id.toNumber(),
              package: partner.currentPackage,
            };

          } catch {
            return {
              wallet: walletAddr,
              id: "-",
              package: "-",
            };
          }
        })
      );

      levels.push(users);
    }

    return levels;

  } catch (err) {
    console.error("getLevelPartners error:", err);
    return [];
  }
};


export const getIncomeEvents = async () => {
  const program = getProgram();

  let before: string | undefined = undefined;
  const events: any[] = [];

  while (events.length < 200) {
    const signatures = await connection.getSignaturesForAddress(
      program.programId,
      { limit: 50, before }
    );

    if (signatures.length === 0) break;

    for (const sig of signatures) {
      const tx = await connection.getTransaction(sig.signature, {
        commitment: "confirmed",
        maxSupportedTransactionVersion: 0
      });

      if (!tx?.meta?.logMessages) continue;

      for (const log of tx.meta.logMessages) {

        if (log.startsWith("Program data:")) {
          try {
            const base64 = log.replace("Program data: ", "");

            const event = program.coder.events.decode(base64);

            if (event?.name === "IncomeEvent") {
              events.push(event.data);
            }

          } catch (e) {}
        }

      }
    }

    before = signatures[signatures.length - 1].signature;
  }

  return events;
};


const fetchUser = async (walletAddr: string | null) => {
  const program = getProgram();
  if (!walletAddr) return null;

  try {
    const pda = getUserPda(walletAddr);
    const acc: any = await program.account.userAccount.fetch(pda);

    return {
      wallet: walletAddr,
      id: acc.id.toNumber(),
      package: acc.currentPackage,
      left: acc.left?.toBase58(),
      right: acc.right?.toBase58(),
    };
  } catch {
    return null;
  }
};
export const getBinaryTree = async (wallet: string) => {
  try {
    // root
    const root = await fetchUser(wallet);
    if (!root) return null;

    // level 1
    const left = await fetchUser(root.left);
    const right = await fetchUser(root.right);

    // level 2
    const leftLeft = left ? await fetchUser(left.left) : null;
    const leftRight = left ? await fetchUser(left.right) : null;

    const rightLeft = right ? await fetchUser(right.left) : null;
    const rightRight = right ? await fetchUser(right.right) : null;

    return {
      root,
      left,
      right,
      leftLeft,
      leftRight,
      rightLeft,
      rightRight,
    };

  } catch (err) {
    console.error("getBinaryTree error:", err);
    return null;
  }
};