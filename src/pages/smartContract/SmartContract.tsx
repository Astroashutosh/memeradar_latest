import { useState, useEffect } from 'react';
import Header from '../../components/layout/smartContract/Header'
import Sidebar from '../../components/layout/smartContract/Sidebar'
import JoiningSlider from '../../components/dashboard/JoiningSlider'
import { useWallet } from "../../solana/context/WalletContext";
import { useUpgrade } from '../../solana/context/UpgradeContext';

import { useLegacyCountdown } from "../../utils/helpers";
import { notifySuccess, notifyError } from "../../solana/context/Notifications";
import {  packages, getUserData,claimMatchingBonus } from "../../solana/program";
import UpgradeModal from "../../components/modal/UpgradeModal";
import { Link } from 'react-router-dom';
function SmartContract() {
  const { wallet } = useWallet();
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [userPackage, setUserPackage] = useState<number>(0);
  const { countdown, countdown1 } = useLegacyCountdown();
  // const [upgrading, setUpgrading] = useState(false);

const { handleUpgrade, upgrading } = useUpgrade();
// const [showClaimModal, setShowClaimModal] = useState(false);
// const [loading, setLoading] = useState(false);
  const handleSelectPackage = (pkg: any) => {
    if (userPackage >= pkg.id) {
      notifyError("Package already active");
      return;
    }
    setSelectedPackage(pkg);
  };
  useEffect(() => {
    const loadUser = async () => {
      if (!wallet) return;
      const data = await getUserData(wallet);
      if (data) {
        console.log(data);
        setUserData(data);
        setUserPackage(data.currentPackage);
      }

    };

    loadUser();

  }, [wallet]);

  const handleOpenUpgrade = (pkg: any) => {
    setSelectedPackage(pkg);
  };
  // const handleUpgrade = async () => {

  //   if (!wallet) return;
  //   if (!selectedPackage) {
  //     notifyError("Select package first");
  //     return;
  //   }

  //   try {
  //     const registered = await checkUserRegistered(wallet);
  //     console.log("registered", registered);
  //     if (registered) {
  //       await upgradePackage(wallet, selectedPackage.id);
  //       notifySuccess("Package upgraded successfully");
  //       setUserPackage(selectedPackage.id);
  //     }

  //   } catch (err: any) {
  //     console.error(err);
  //     notifyError(err.message || "Upgrade failed");
  //   }

  // };

// const handleUpgrade = async () => {
//   if (!wallet) return;
//   if (!selectedPackage) {
//     notifyError("Select package first");
//     return;
//   }

//   try {
//     setUpgrading(true); // 🔥 start loader

//     const registered = await checkUserRegistered(wallet);

//     if (registered) {
//       await upgradePackage(wallet, selectedPackage.id);

//       setUserPackage(selectedPackage.id);

//       // 🔥 modal close (Bootstrap)
//       const modal = document.getElementById("paymentConfirm");
//       if (modal) {
//         const modalEl = document.getElementById("paymentConfirm");

// if (modalEl) {
//   let modalInstance = window.bootstrap?.Modal.getInstance(modalEl);

//   if (!modalInstance) {
//     modalInstance = new window.bootstrap.Modal(modalEl);
//   }

//   modalInstance.hide();
// }
//       }

//       notifySuccess("Package upgraded successfully"); // ✅ success message
      
// setTimeout(() => {
//   window.location.reload();
// }, 1500);
//     }

//   } catch (err: any) {
//     notifyError(err.message || "Upgrade failed");
//   } finally {
//     setUpgrading(false); // 🔥 stop loader
//   }
// };




// claim now
// const canClaim = () => {
//   if (!userData) return false;

//   return (
//     userData.rank !== "None" &&
//     userData.nextBonus > 0
//   );
// };
const handleClaimMatching = async () => {
  if (!wallet) return;


  // if (userData?.rank === "None") {
  //   notifyError("Upgrade to Silver to claim matching bonus");
  //   return;
  // }


  try {
    // setLoading(true);

   await claimMatchingBonus(wallet);

    notifySuccess("Matching bonus claimed successfully");

    // refresh user data
    const updated = await getUserData(wallet);
    setUserData(updated);

 } catch (err: any) {
  console.error("Full Error:", err);

  let errorMsg = "Claim failed";

  // ✅ Anchor custom error message
  if (err?.error?.errorMessage) {
    errorMsg = err.error.errorMessage;
  }

  // ✅ Anchor error code (fallback)
  else if (err?.error?.errorCode?.code) {
    errorMsg = err.error.errorCode.code;
  }

  // ✅ Logs me se extract (backup method)
  else if (err?.logs) {
    const log = err.logs.find((l: string) =>
      l.includes("Error Message")
    );

    if (log) {
      errorMsg = log.split("Error Message: ")[1];
    }
  }

  // ✅ Normal JS error
  else if (err?.message) {
    errorMsg = err.message;
  }

  notifyError(errorMsg);
}
  //  finally {
  //   setLoading(false);
  //   setShowClaimModal(false);
  // }
};


  return (
    <>
      <Header />
      <main>
        <div className="container-fluid mb-3">

          <JoiningSlider />
          <div className="mb-3">
            <div className="growBusiness text-center"><span>Select Package</span></div>
            <div className="package-list-wrapper">
              <ul>
                {packages.map((pkg) => (
                  <li key={pkg.id}>
                    <div
                      className={`package-item ${userPackage >= pkg.id ? "disabled" : ""}`}
                      onClick={() => {
                        if (userPackage >= pkg.id) return;
                        handleSelectPackage(pkg);
                      }}{...(userPackage < pkg.id && {
                        "data-bs-toggle": "modal",
                        "data-bs-target": "#paymentConfirm"
                      })}
                    >
                      <div className="package-icon">
                        <img src={`${import.meta.env.BASE_URL}img/coin/solana.png`} />
                      </div>

                      <div className="package-content">
                        <div className="package-price">{pkg.price} SOL</div>
                        <div className="package-name">{pkg.name}</div>
                      </div>

                      <div className="selected">
                        <img src={`${import.meta.env.BASE_URL}img/white-check-icon.png`} />
                      </div>
                    </div>
                  </li>
                ))}

              </ul>
            </div>
          </div>


          <div className="row">
            <Sidebar onUpgradeClick={handleOpenUpgrade} />
            <div className="col-lg-12 col-xl-6 order-md-3 order-xl-2 ">
              <div className="row">
                <div className="col-md-6 col-lg-6 mb-3">
                  <Link to="/sponsorBonus" className="stats-box">
                    <div className="stats-icon">
                      <img src={`${import.meta.env.BASE_URL}img/solana-icon.png`} />
                    </div>
                    <h2 className="title">Team Sponsor Bonus</h2>
                    <h3><span className="partnerSponsorBonus">{userData?.sponsorIncome ?? 0} </span> SOL</h3>
                  </Link>
                </div>
                <div className="col-md-6 col-lg-6 mb-3">
                  <Link to="/directBonus" className="stats-box">
                    <div className="stats-icon">
                      <img src={`${import.meta.env.BASE_URL}img/solana-icon.png`} />
                    </div>
                    <h2 className="title">Team Starter Bonus</h2>
                    <h3><span className="partnerSponsorBonus">{userData?.directIncome ?? 0} </span> SOL</h3>
                  </Link>
                </div>
                <div className="col-md-6 col-lg-6 mb-3">
                  <Link to="/poolBonus" className="stats-box">
                    <div className="stats-icon">
                      <img src={`${import.meta.env.BASE_URL}img/solana-icon.png`} />
                    </div>
                    <h2 className="title">Team Pool Bonus</h2>
                    <h3><span className="partnerSponsorBonus">{userData?.poolIncome ?? 0} </span> SOL</h3>
                  </Link>
                </div>

                <div className="col-md-6 col-lg-6 mb-3">
                  <Link to="/levelBonus" className="stats-box">
                    <div className="stats-icon">
                      <img src={`${import.meta.env.BASE_URL}img/solana-icon.png`} />
                    </div>
                    <h2 className="title">Team Level Bonus</h2>
                    <h3><span className="partnerSponsorBonus">{userData?.levelIncome ?? 0} </span> SOL</h3>
                  </Link>
                </div>

                <div className="col-md-6 col-lg-6 mb-3">
                  <div className="stats-box">
                    <div className="stats-icon">
                      <img src={`${import.meta.env.BASE_URL}img/solana-icon.png`} />
                    </div>
                    <h2 className="title">Team Matching Bonus</h2>
                    <Link to="/matchingBonus">
                      <h3><span className="partnerSponsorBonus">{userData?.matchingIncome ?? 0} </span> SOL</h3>
                    </Link>

                    <div className="item-style-box mt-2 bg-gradient-golden">
                      <div className="row align-items-center justify-content-center">
                        <div className="col-lg-8 col-8">
                          <div className="social-account-connect ps-0">
                            <div className="head">Next bonus unlock after</div>
                            <div className="account-handle">
                              <div id="countdown">{countdown}</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-4 text-end ps-0">
                          {userData?.nextBonus ?? 0} SOL
                          {/* <Link to="#!" className="btn btn-primary btn-sm disabled">Claim Now</Link> */}
                         <button
  className="btn btn-primary btn-sm"
  data-bs-toggle="modal"
  data-bs-target="#claimConfirm"
  // disabled={!userData?.nextBonus || userData?.nextBonus <= 0}
  // disabled={!canClaim()}
>
  Claim Now
</button>

                        </div>
                      </div>
                    </div>


                  </div>
                </div>
                <div className="col-md-6 col-lg-6 mb-3">
                  <div className="stats-box">
                    <div className="stats-icon">
                      <img src={`${import.meta.env.BASE_URL}img/solana-icon.png`} />
                    </div>
                    <h2 className="title">Global Silver Bonus</h2>
                    <Link to="/globalPoolBonus">
                      <h3><span className="partnerSponsorBonus">{userData?.silverBonus ?? 0} </span> SOL</h3>
                    </Link>

                    <div className="item-style-box mt-2 bg-gradient-golden">
                      <div className="row align-items-center justify-content-center">
                        <div className="col-lg-8 col-8">
                          <div className="social-account-connect ps-0">
                            <div className="head">Next bonus unlock after</div>
                            <div className="account-handle">
                              <div id="countdown1">{countdown1}</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-4 text-end ps-0">
                          <Link to="#!" className="btn btn-primary btn-sm ">Claim Now</Link>
                        </div>
                      </div>
                    </div>


                  </div>
                </div>



                <div className="col-md-6 col-lg-3  col-6 mb-3">
                  <Link to="/networkTeam" className="stats-box">

                    <h2 className="title">Network Team</h2>
                    <h3><span className="partnerSponsorBonus">{userData?.totalMatrixTeam ?? 0}</span></h3>
                  </Link>
                </div>
                <div className="col-md-6 col-lg-3  col-6 mb-3">
                  <Link to="/directTeam" className="stats-box">

                    <h2 className="title">Direct Team</h2>
                    <h3><span className="partnerSponsorBonus">{userData?.partnerCount ?? 0}</span></h3>
                  </Link>
                </div>
                <div className="col-md-6 col-lg-6 mb-3">
                  <Link to="/rewardboard" className="stats-box">
                    <div className="stats-icon">
                      <img src={`${import.meta.env.BASE_URL}img/xp-point.png`} />
                    </div>
                    <h2 className="title">Total XP Points</h2>
                    <h3><span className="partnerSponsorBonus">{userData?.xpPoints ?? 0}</span></h3>
                  </Link>
                </div>

                <div className="col-md-6 col-lg-6 mb-3">
                  <Link to="/lostIncome">
                    <div className="stats-box bg-gradient-violet" style={{ lineHeight: "0.3" }}>
                      <div className="stats-icon">
                        <img src={`${import.meta.env.BASE_URL}img/solana-icon.png`} />
                      </div>
                      <h2 className="title mb-0 fxs-small" style={{ opacity: "initial" }}><i
                        className="bi bi-exclamation-triangle-fill"></i>
                        Total Lost
                        Bonus </h2>
                      <h3 className="totallapsIncome">{userData?.lapsIncome ?? 0} SOL</h3>
                      <div style={{ fontSize: "10px", marginTop: "5px" }}>Take action now to keep your bonus!</div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-6 col-lg-6 mb-3">
                  <Link to="/mpLostDetails">
                    <div className="stats-box bg-gradient-green" style={{ lineHeight: "0.3" }}>
                      <div className="row">
                        <div className="col-lg-6 col-6">
                          <h2 className="title mb-0 fxs-small" style={{ opacity: "initial" }}><i
                            className="bi bi-exclamation-triangle-fill"></i> Total Lost Left MP</h2>
                          <h3 className="totallapsIncome">{userData?.lostLeft ?? 0}</h3>
                        </div>
                        <div className="col-lg-6 col-6 text-end">
                          <h2 className="title mb-0 fxs-small" style={{ opacity: "initial" }}><i
                            className="bi bi-exclamation-triangle-fill"></i> Total Lost Right MP</h2>
                          <h3 className="totallapsIncome">{userData?.lostRight ?? 0}</h3>
                        </div>
                      </div>
                      <div style={{ fontSize: "10px", marginTop: "5px" }}>Take action now to keep your Matching Bonus!</div>
                    </div>
                  </Link>
                </div>



              </div>
            </div>
            <div className="col-lg-6 col-xl-3 col-md-6 order-lg-2 order-md-2">
              <div className="row">
                <div className="col-lg-12 mb-3">
                  <div className="border-box-style mt-4">
                    <div className="border-box-style-body earning_details">
                      <div className="sol_earning_amount mb-2">
                        <h4> {userData?.totalIncome ?? 0} SOL </h4>
                        <small> Total Earning</small>
                      </div>
                      <table className="table">
                        <tbody>
                          <tr>
                            <td className="text-start">Team Sponsor Bonus</td>
                            <td className="">{userData?.sponsorIncome ?? 0} SOL</td>
                          </tr>
                          <tr>
                            <td className="text-start">Team Starter Bonus</td>
                            <td className="">{userData?.directIncome ?? 0} SOL</td>
                          </tr>
                          <tr>
                            <td className="text-start">Team Pool Bonus</td>
                            <td className="">{userData?.poolIncome ?? 0} SOL</td>
                          </tr>
                          <tr>
                            <td className="text-start">Team Matching Bonus</td>
                            <td className="">{userData?.matchingIncome ?? 0} SOL</td>
                          </tr>
                          <tr>
                            <td className="text-start">Team Level Bonus</td>
                            <td className="">{userData?.levelIncome ?? 0} SOL</td>
                          </tr>
                          <tr>
                            <td className="text-start">Global Silver Bonus </td>
                            <td className="">{userData?.silverBonus ?? 0} SOL</td>
                          </tr>

                        </tbody>
                      </table>
                      <Link to="/earningCertificate" target="_blank" className="btn btn-primary btn-sm rounded">
                        <i className="fa-regular fa-download me-1"></i>Download Certificate
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="border-box-style mt-3 bg-gradient-blue">
                    <div className="border-box-style-body earning_details">
                      <div className="sol_earning_amount mb-2 bg-gradient-golden">
                        <h4> {userData?.totalIncome ?? 0} SOL</h4>
                        <small> Today Earning</small>
                      </div>
                      <table className="table">
                        <tbody>
                          <tr>
                            <td className="text-start">Team Sponsor Bonus</td>
                            <td className="">{userData?.sponsorIncome ?? 0} SOL</td>
                          </tr>
                          <tr>
                            <td className="text-start">Team Starter Bonus</td>
                            <td className="">{userData?.directIncome ?? 0} SOL</td>
                          </tr>
                          <tr>
                            <td className="text-start">Team Pool Bonus</td>
                            <td className="">{userData?.poolIncome ?? 0} SOL</td>
                          </tr>
                          <tr>
                            <td className="text-start">Team Matching Bonus</td>
                            <td className="">{userData?.matchingIncome ?? 0} SOL</td>
                          </tr>
                          <tr>
                            <td className="text-start">Team Level Bonus</td>
                            <td className="">{userData?.levelIncome ?? 0} SOL</td>
                          </tr>
                          <tr>
                            <td className="text-start">Global Silver Bonus </td>
                            <td className="">{userData?.silverBonus ?? 0} SOL</td>
                          </tr>

                        </tbody>
                      </table>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-lg-3 col-xl-3 mt-3 mt-lg-0">
              <Link to="zoom-meeting.html" className="meeting-box">
                <div className="meetingContent">
                  <img src={`${import.meta.env.BASE_URL}img/zoom-meet-logo.png`} /> <br />
                  <span className="btn btn-warning btn-sm mt-2"><i className="fa-regular fa-eye me-1"></i>Upcoming Meetings </span>
                </div>
              </Link>
            </div>

            <div className="col-sm-12 col-lg-9 col-xl-9 text-center mt-3 mt-lg-0">
              <Link to="lucky-draw.html"> <img src={`${import.meta.env.BASE_URL}img/lucky-draw-status.gif`} className="rounded" /></Link>
            </div>

          </div>
        </div >

      </main >
      {/* <UpgradeModal
        selectedPackage={selectedPackage}
        onUpgrade={handleUpgrade}
         upgrading={upgrading} 
      /> */}

<UpgradeModal
  selectedPackage={selectedPackage}
  onUpgrade={() =>
    handleUpgrade(wallet, selectedPackage, () => {
      window.location.reload();
    })
  }
  upgrading={upgrading}
/>

      {/* <!--  Recovery Phrase--> */}
      <div className="modal fade" id="RecoveryPhrase" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <span className="modalWindow-close" data-bs-dismiss="modal" aria-label="Close"></span>
            <div className="modal-body text-center">
              <div className="sec-divider top"> </div>
              <div className="sec-divider bottom"> </div>
              <h3> Upgrade your package with <span className="text-warning">Platinum</span> & above and Unlock your wallet
                address Secret Recovery Phrase.</h3>
            </div>
          </div>
        </div>
      </div>


{/* claim now modal */}

 <div className="modal fade" id="claimConfirm" tabIndex={-1}>
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">

      <span
        className="modalWindow-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></span>

      <div className="modal-body text-center">
        <div className="sec-divider top"></div>
        <div className="sec-divider bottom"></div>

        {/* ICON */}
        <img
          src={`${import.meta.env.BASE_URL}img/solana-icon.png`}
          width="80"
        />

        {/* BONUS AMOUNT */}
        {/* <div className="badgeStyle text-center mb-2">
          <h5>{userData?.nextBonus ?? 0} SOL</h5>
        </div> */}

        {/* TITLE */}
        <h3>
          Claim Your{" "}
          <span className="text-success">
            Matching Bonus
          </span>
        </h3>

        {/* DESCRIPTION */}
        <div className="fs-small mb-2">
          Are you sure you want to claim your matching bonus now?
        </div>

        {/* BUTTON */}
        <Link
          to="#"
          className="btn btn-primary ms-1"
          onClick={(e) => {
            e.preventDefault();
            handleClaimMatching();
          }}
        >
          Confirm Claim
          <i className="fa-regular fa-arrow-right ms-1"></i>
        </Link>

      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default SmartContract
