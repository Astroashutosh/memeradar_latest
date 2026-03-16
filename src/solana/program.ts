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
  { id: 3, name: "Bronze", price: 0.5 },
  { id: 4, name: "Silver", price: 1 },
  { id: 5, name: "Gold", price: 2 },
  { id: 6, name: "Platinum", price: 4 },
  { id: 7, name: "Sapphire", price: 8 },
  { id: 8, name: "Diamond", price: 16 },
  { id: 9, name: "Director", price: 32 },
  { id: 10, name: "President", price: 64 },
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



// api call function start 


export const handleProgramEvents = async (tx: string, program: any) => {

  await connection.confirmTransaction(tx, "confirmed");

  const txInfo = await connection.getTransaction(tx, {
    commitment: "confirmed",
    maxSupportedTransactionVersion: 0
  });

  if (!txInfo?.meta?.logMessages) return;

  for (const log of txInfo.meta.logMessages) {

    if (!log.startsWith("Program data:")) continue;

    try {

      const base64 = log.replace("Program data: ", "");

      const event = program.coder.events.decode(base64);

      if (!event) continue;

      const data = event.data;

      // ---------------- REGISTER EVENT ----------------

      if (event.name === "RegisterEvent") {

        await fetch(
          "https://demo.dsvinfosolutions.com/bullbnb-solana-design/report_api/api.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
              table: "register",
              action: "insert",
              user: data.user.toBase58(),
              referrer: data.referrer.toBase58(),
              user_id: data.userId.toString()
            })
          }
        );

      }

      // ---------------- UPGRADE EVENT ----------------

      if (event.name === "UpgradeEvent") {

        await fetch(
          "https://demo.dsvinfosolutions.com/bullbnb-solana-design/report_api/api.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
              table: "upgrade",
              action: "insert",
              user: data.user.toBase58(),
              package: data.package.toString(),
              amount: data.amount.toString()
            })
          }
        );

      }

      // ---------------- INCOME EVENT ----------------

      if (event.name === "IncomeEvent") {

        const type = Object.keys(data.incomeType)[0];

        await fetch(
          "https://demo.dsvinfosolutions.com/bullbnb-solana-design/report_api/api.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
              table: "reports",
              action: "insert",
              user: data.user.toBase58(),
              from: data.from.toBase58(),
              income_type: type,
              amount: data.amount.toString(),
              package: data.package.toString(),
              addon: data.addon.toString()
            })
          }
        );

      }

    } catch (err) {
      console.log("Event decode error:", err);
    }

  }

};

// api call end 





export const registerUser = async (
  wallet: PublicKey,
  sponsorWallet: PublicKey
) => {

  const program = getProgram();

  const userPda = getUserPda(wallet.toBase58());
  const sponsorPda = getUserPda(sponsorWallet.toBase58());

  console.log("User PDA:", userPda.toBase58());
  console.log("Sponsor PDA:", sponsorPda.toBase58());

  const sponsorUser: any =
    await program.account.userAccount.fetch(sponsorPda);

  if (!sponsorUser.exists) {
    throw new Error("Invalid Sponsor");
  }

  const ZERO = PublicKey.default;

  // -----------------------------
  // BFS MATRIX SEARCH
  // -----------------------------

  const queue: PublicKey[] = [sponsorWallet];

  let uplineWallet: PublicKey | null = null;
  let isLeft = true;

  while (queue.length > 0) {

    const current = queue.shift()!;

    const currentPda = getUserPda(current.toBase58());

    const userData: any =
      await program.account.userAccount.fetch(currentPda);

    const left = userData.left;
    const right = userData.right;

    if (left.equals(ZERO)) {

      uplineWallet = current;
      isLeft = true;
      break;

    }

    if (right.equals(ZERO)) {

      uplineWallet = current;
      isLeft = false;
      break;

    }

    queue.push(left);
    queue.push(right);

  }

  if (!uplineWallet) {
    throw new Error("Matrix full");
  }

  const uplinePda = getUserPda(uplineWallet.toBase58());

  console.log("Chosen Upline:", uplineWallet.toBase58());
  console.log("Position:", isLeft ? "LEFT" : "RIGHT");

  // -----------------------------
  // BUILD REMAINING ACCOUNTS
  // -----------------------------

  const remainingAccounts: any[] = [];

  let currentUpline = uplineWallet;

  for (let i = 0; i < 10; i++) {

    if (currentUpline.equals(ZERO)) break;

    const uplineUserPda =
      getUserPda(currentUpline.toBase58());

    try {

      const upline: any =
        await program.account.userAccount.fetch(uplineUserPda);

      remainingAccounts.push({
        pubkey: uplineUserPda,
        isWritable: true,
        isSigner: false,
      });

      currentUpline = upline.upline;

    } catch {

      break;

    }

  }

  // -----------------------------
  // SEND TRANSACTION
  // -----------------------------

  const tx = await program.methods
    .register(isLeft)
    .accounts({
      signer: wallet,
      user: userPda,
      sponsorUser: sponsorPda,
      uplineUser: uplinePda,
      global: globalPda,
      systemProgram: SystemProgram.programId
    })
    .remainingAccounts(remainingAccounts)
    .rpc();

  console.log("Register TX:", tx);

  await handleProgramEvents(tx, program);
  
  return tx;

};





// export const registerUser = async (
//   wallet: PublicKey,
//   sponsorWallet: PublicKey
// ) => {

//   const program = getProgram();

//   const userPda = getUserPda(wallet.toBase58());
//   const sponsorPda = getUserPda(sponsorWallet.toBase58());

//   const sponsorUser: any =
//     await program.account.userAccount.fetch(sponsorPda);

//   if (!sponsorUser.exists) {
//     throw new Error("Invalid Sponsor");
//   }

//   const ZERO = PublicKey.default;

//   // -----------------------------
//   // BFS MATRIX SEARCH
//   // -----------------------------

//   const queue: PublicKey[] = [sponsorWallet];

//   let uplineWallet: PublicKey | null = null;
//   let isLeft = true;

//   while (queue.length > 0) {

//     const current = queue.shift()!;

//     const currentPda = getUserPda(current.toBase58());

//     const userData: any =
//       await program.account.userAccount.fetch(currentPda);

//     const left = userData.left;
//     const right = userData.right;

//     if (left.equals(ZERO)) {
//       uplineWallet = current;
//       isLeft = true;
//       break;
//     }

//     if (right.equals(ZERO)) {
//       uplineWallet = current;
//       isLeft = false;
//       break;
//     }

//     queue.push(left);
//     queue.push(right);

//   }

//   if (!uplineWallet) {
//     throw new Error("Matrix full");
//   }

//   const uplinePda = getUserPda(uplineWallet.toBase58());

//   // -----------------------------
//   // BUILD REMAINING ACCOUNTS
//   // -----------------------------

//   const remainingAccounts: any[] = [];

//   let currentUpline = uplineWallet;

//   for (let i = 0; i < 10; i++) {

//     if (currentUpline.equals(ZERO)) break;

//     const uplineUserPda =
//       getUserPda(currentUpline.toBase58());

//     try {

//       const upline: any =
//         await program.account.userAccount.fetch(uplineUserPda);

//       remainingAccounts.push({
//         pubkey: uplineUserPda,
//         isWritable: true,
//         isSigner: false,
//       });

//       currentUpline = upline.upline;

//     } catch {
//       break;
//     }

//   }

//   // -----------------------------
//   // SEND TRANSACTION
//   // -----------------------------

//   const tx = await program.methods
//     .register(isLeft)
//     .accounts({
//       signer: wallet,
//       user: userPda,
//       sponsorUser: sponsorPda,
//       uplineUser: uplinePda,
//       global: globalPda,
//       systemProgram: SystemProgram.programId
//     })
//     .remainingAccounts(remainingAccounts)
//     .rpc();

//   console.log("Register TX:", tx);

//   // ✅ WAIT FOR CONFIRMATION
//   await connection.confirmTransaction(tx, "confirmed");

//   // -----------------------------
//   // FETCH TX
//   // -----------------------------

//   const txInfo = await connection.getTransaction(tx, {
//     commitment: "confirmed",
//     maxSupportedTransactionVersion: 0
//   });

//   if (!txInfo?.meta?.logMessages) return tx;

//   // -----------------------------
//   // DECODE EVENTS
//   // -----------------------------

//   for (const log of txInfo.meta.logMessages) {

//     if (!log.startsWith("Program data:")) continue;

//     try {

//       const base64 = log.replace("Program data: ", "");

//       const event = program.coder.events.decode(base64);

//       if (event?.name === "RegisterEvent") {

//         const data = event.data;

//         console.log("Register Event:", data);

//         await fetch(
//           "https://demo.dsvinfosolutions.com/bullbnb-solana-design/report_api/api.php",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/x-www-form-urlencoded"
//             },
//             body: new URLSearchParams({
//               table: "register",
//               action: "insert",
//               user: data.user.toBase58(),
//               referrer: data.referrer.toBase58(),
//               user_id: data.userId.toString()
//             })
//           }
//         );

//       }

//     } catch (err) {
//       console.log("Event decode error", err);
//     }

//   }

//   return tx;

// };








// export const upgradePackage = async (
//   wallet: string,
//   newPackage: number
// ) => {

//   const program = getProgram();

//   const userPubkey = new PublicKey(wallet);
//   const userPda = getUserPda(wallet);

//   // -------------------------
//   // Fetch User Account
//   // -------------------------
//   let userAccount: any;

//   try {
//     userAccount = await program.account.userAccount.fetch(userPda);
//   } catch {
//     throw new Error("User account not found. Please register first.");
//   }

//   if (!userAccount.referrer || new PublicKey(userAccount.referrer).equals(PublicKey.default)) {
//     throw new Error("Sponsor not found for this user.");
//   }

//   const sponsorWallet = new PublicKey(userAccount.referrer.toString());
//   const sponsorPda = getUserPda(sponsorWallet.toString());

//   const globalAccount: any = await program.account.globalState.fetch(globalPda);
//   const ownerPubkey = new PublicKey(globalAccount.owner.toString());

//   const sponsorUserAccount: any =
//     await program.account.userAccount.fetch(sponsorPda);

//   const remainingAccounts: any[] = [];

//   let currentUpline =
//     sponsorUserAccount.referrer &&
//       !new PublicKey(sponsorUserAccount.referrer).equals(PublicKey.default)
//       ? new PublicKey(sponsorUserAccount.referrer)
//       : null;

//   const visited = new Set<string>(); // safety to prevent infinite loops

//   while (currentUpline) {

//     const uplinePda = getUserPda(currentUpline.toString());

//     const uplineAccount: any =
//       await program.account.userAccount.fetch(uplinePda);

//     // stop if circular reference detected
//     if (visited.has(currentUpline.toBase58())) {
//       break;
//     }

//     visited.add(currentUpline.toBase58());

//     remainingAccounts.push({
//       pubkey: uplinePda,
//       isWritable: true,
//       isSigner: false,
//     });

//     remainingAccounts.push({
//       pubkey: new PublicKey(uplineAccount.wallet),
//       isWritable: true,
//       isSigner: false,
//     });

//     currentUpline =
//       uplineAccount.referrer &&
//         !new PublicKey(uplineAccount.referrer).equals(PublicKey.default)
//         ? new PublicKey(uplineAccount.referrer)
//         : null;
//   }

//   console.log(
//     "RemainingAccounts:",
//     remainingAccounts.map(a => a.pubkey.toBase58())
//   );

//   // -------------------------
//   // Execute Upgrade
//   // -------------------------
//   const tx = await program.methods
//     .upgrade(newPackage)
//     .accounts({
//       signer: userPubkey,
//       user: userPda,
//       sponsorUser: sponsorPda,
//       sponsorWallet: sponsorWallet,
//       global: globalPda,
//       vault: vaultPda,
//       owner: ownerPubkey,
//       systemProgram: SystemProgram.programId,
//     })
//     .remainingAccounts(remainingAccounts)
//     .rpc();

//   return tx;
// };


// current rank


export const upgradePackage = async (wallet: string, newPackage: number) => {
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

  const sponsorWallet = new PublicKey(userAccount.referrer);
  const sponsorPda = getUserPda(sponsorWallet.toBase58());

  const sponsorUserAccount: any = await program.account.userAccount.fetch(sponsorPda);

  const globalAccount: any = await program.account.globalState.fetch(globalPda);
  const ownerPubkey = new PublicKey(globalAccount.owner.toString());

  // =============================
  // REFERRER ACCOUNTS
  // =============================
  const MAX_LEVELS = 10;
  let referrerAccounts: any[] = [];
  let uplineAccounts: any[] = [];

  // -------------------------
  // Referrer chain
  // -------------------------
  let currentReferrer = sponsorWallet;
  for (let i = 0; i < MAX_LEVELS; i++) {
    if (currentReferrer.equals(ZERO)) break;

    const refUserPda = getUserPda(currentReferrer.toBase58());
    try {
      const refUser = await program.account.userAccount.fetch(refUserPda) as unknown as AnchorUserAccount;

      referrerAccounts.push(
        { pubkey: refUserPda, isWritable: true, isSigner: false },
        { pubkey: new PublicKey(refUser.wallet), isWritable: true, isSigner: false }
      );

      currentReferrer = new PublicKey(refUser.referrer);
    } catch {
      break;
    }
  }

  // -------------------------
  // Upline chain
  // -------------------------
  let currentUpline = sponsorUserAccount.referrer
    ? new PublicKey(sponsorUserAccount.referrer)
    : ZERO;

  const visited = new Set<string>();
  for (let i = 0; i < MAX_LEVELS; i++) {
    if (currentUpline.equals(ZERO)) break;
    if (visited.has(currentUpline.toBase58())) break;

    const upUserPda = getUserPda(currentUpline.toBase58());
    try {
      const upUser = await program.account.userAccount.fetch(upUserPda) as unknown as AnchorUserAccount;

      uplineAccounts.push(
        { pubkey: upUserPda, isWritable: true, isSigner: false },
        { pubkey: new PublicKey(upUser.wallet), isWritable: true, isSigner: false }
      );

      visited.add(currentUpline.toBase58());
      currentUpline = upUser.referrer ? new PublicKey(upUser.referrer) : ZERO;
    } catch {
      break;
    }
  }

  console.log("Referrer Accounts:", referrerAccounts.map(a => a.pubkey.toBase58()));
  console.log("Upline Accounts:", uplineAccounts.map(a => a.pubkey.toBase58()));

  const referrerLevelCount = referrerAccounts.length / 2;
  const uplineLevelCount = uplineAccounts.length / 2;

  // -------------------------
  // Execute Upgrade
  // -------------------------
  const tx = await program.methods
    .upgrade(newPackage, referrerLevelCount, uplineLevelCount)
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
    .remainingAccounts([...referrerAccounts, ...uplineAccounts])
    .rpc();

  console.log("✅ Upgrade successful");

// Save Data in db
await handleProgramEvents(tx, program);


  return tx;
};




export const RANK_NAMES: Record<number, string> = {
  0: "None",
  1: "Silver",
  2: "Gold",
  3: "Platinum",
  4: "Sapphire",
  5: "Diamond",
};


export const getUserData = async (wallet: string) => {
  try {
    const program = getProgram();
    const userPda = getUserPda(wallet);
    const account = (await program.account.userAccount.fetch(userPda).catch(() => null)) as AnchorUserAccount | null;
    console.log("userdata is :", account);
    if (!account) {
      return null;
    }

    // console.log(account);

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
        // console.log(acc);
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
      rank: RANK_NAMES[account.rank] ?? "None",
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

      carryLeft:
        account.carryLeft.toNumber() / anchor.web3.LAMPORTS_PER_SOL,

      carryRight:
        account.carryRight.toNumber() / anchor.web3.LAMPORTS_PER_SOL,

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

    const account: any = await program.account.userAccount.fetch(userPda);
    if (!account) return [];

    const directs = account.directUsers || [];

    const partners = await Promise.all(
      directs.map(async (partnerPda: PublicKey) => {
        // const walletAddr = pk.toBase58();

        try {
          // const partnerPda = getUserPda(walletAddr);
          const partner: any = await program.account.userAccount.fetch(partnerPda);

          return {
            wallet: partner.wallet.toBase58(),
            dboId: partner.id.toNumber(),
            currentPackage: partner.currentPackage,
          };
        } catch {
          return {
            wallet: "-",
            dboId: "-",
            currentPackage: "-",
          };
        }
      })
    );

    return partners;

  } catch (err) {
    console.error("Error fetching direct partners:", err);
    return [];
  }
};



// export const getDirectPartners = async (wallet: string) => {
//   try {
//     const program = getProgram();
//     const userPda = getUserPda(wallet);

//     const account: any = await program.account.userAccount.fetch(userPda);
//     if (!account) return [];

//     const level1 = account.levelUsers?.[0] || [];

//     const partners = await Promise.all(
//       level1.map(async (pk: PublicKey) => {
//         const walletAddr = pk.toBase58();

//         try {
//           const partnerPda = getUserPda(walletAddr);
//           const partner: any = await program.account.userAccount.fetch(partnerPda);

//           return {
//             wallet: walletAddr,
//             dboId: partner.id.toNumber(),
//             currentPackage: partner.currentPackage,
//           };
//         } catch {
//           return {
//             wallet: walletAddr,
//             dboId: "-",
//             currentPackage: "-",
//           };
//         }
//       })
//     );

//     return partners;

//   } catch (err) {
//     console.error("Error fetching direct partners:", err);
//     return [];
//   }
// };



export const getDirectPartnersold = async (wallet: string) => {
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

// export const getLevelPartners = async (
//   wallet: string,
//   maxLevels = 10
// ): Promise<any[][]> => {
//   try {
//     const program = getProgram();
//     const userPda = getUserPda(wallet);

//     const account: any = await program.account.userAccount.fetch(userPda);
//     if (!account) return [];

//     const levels: any[][] = [];

//     for (let i = 0; i < maxLevels; i++) {
//       const levelWallets = account.levelUsers[i] || [];

//       const users = await Promise.all(
//         levelWallets.map(async (pk: any) => {
//           const walletAddr = pk.toBase58 ? pk.toBase58() : pk;

//           try {
//             const partnerPda = getUserPda(walletAddr);
//             const partner: any = await program.account.userAccount.fetch(partnerPda);

//             return {
//               wallet: walletAddr,
//               id: partner.id.toNumber(),
//               package: partner.currentPackage,
//             };

//           } catch {
//             return {
//               wallet: walletAddr,
//               id: "-",
//               package: "-",
//             };
//           }
//         })
//       );

//       levels.push(users);
//     }

//     return levels;

//   } catch (err) {
//     console.error("getLevelPartners error:", err);
//     return [];
//   }
// };


export const getLevelPartners = async (
  wallet: string,
  maxLevels = 10
): Promise<any[][]> => {

  try {

    const program = getProgram();

    const levels: any[][] = [];

    // first PDA
    let currentLevelPdas: PublicKey[] = [getUserPda(wallet)];

    for (let level = 0; level < maxLevels; level++) {

      const nextLevelPdas: PublicKey[] = [];
      const levelUsers: any[] = [];

      for (const pda of currentLevelPdas) {

        try {

          const account: any =
            await program.account.userAccount.fetch(pda);

          const directs = account.directUsers || [];

          for (const pk of directs) {

            const walletAddr = pk.toBase58();

            try {

              const partnerPda = walletAddr;

              const partner: any =
                await program.account.userAccount.fetch(partnerPda);

              levelUsers.push({
                wallet: partner.wallet.toBase58(),
                id: partner.id.toNumber(),
                package: partner.currentPackage,
              });

              nextLevelPdas.push(partnerPda);

            } catch {

              levelUsers.push({
                wallet: walletAddr,
                id: "-",
                package: "-",
              });

            }

          }

        } catch (e) {
          console.log("Level fetch error:", e);
        }

      }

      if (levelUsers.length === 0) break;

      levels.push(levelUsers);

      currentLevelPdas = nextLevelPdas;

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

          } catch (e) { }
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



// new code

// type ReferralNode = {
//   wallet: string;
//   id: number;
//   package: number;
//   children: ReferralNode[];
// };

// export const getAllUsers = async () => {

//   try {

//     const program = getProgram();

//     const accounts = await program.account.userAccount.all();

//     return accounts.map((acc: any) => ({
//       wallet: acc.account.wallet.toBase58(),
//       id: acc.account.id.toNumber(),
//       referrer: acc.account.referrer.toBase58(),
//       package: acc.account.currentPackage,
//     }));

//   } catch (err) {

//     console.error("getAllUsers error:", err);

//     return [];

//   }

// };




// export const getReferralTree = async (wallet: string): Promise<ReferralNode[]> => {

//   const users = await getAllUsers();

//   const buildTree = (parentWallet: string): ReferralNode[] => {

//     const directs = users.filter(
//       (u) => u.referrer === parentWallet
//     );

//     return directs.map((user) => ({
//       wallet: user.wallet,
//       id: user.id,
//       package: user.package,
//       children: buildTree(user.wallet)
//     }));

//   };

//   return buildTree(wallet);

// };






