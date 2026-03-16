import { useState, useEffect } from 'react';
import Header from '../../components/layout/smartContract/Header'
import Sidebar from '../../components/layout/smartContract/Sidebar'
import JoiningSlider from '../../components/dashboard/JoiningSlider'
import { useWallet } from "../../solana/context/WalletContext";

import { useLegacyCountdown } from "../../utils/helpers";
import { notifySuccess, notifyError } from "../../solana/context/Notifications";
import { checkUserRegistered, packages, upgradePackage, getUserData } from "../../solana/program";
import UpgradeModal from "../../components/modal/UpgradeModal";
function SmartContract() {
  const { wallet } = useWallet();
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [userPackage, setUserPackage] = useState<number>(0);
  const { countdown, countdown1 } = useLegacyCountdown();

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
  const handleUpgrade = async () => {

    if (!wallet) return;
    if (!selectedPackage) {
      notifyError("Select package first");
      return;
    }

    try {
      const registered = await checkUserRegistered(wallet);
      console.log("registered", registered);
      if (registered) {
        await upgradePackage(wallet, selectedPackage.id);
        notifySuccess("Package upgraded successfully");
        setUserPackage(selectedPackage.id);
      }

    } catch (err: any) {
      console.error(err);
      notifyError(err.message || "Upgrade failed");
    }

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
                  <a href="sponsor-bonus.html" className="stats-box">
                    <div className="stats-icon">
                      <img src={`${import.meta.env.BASE_URL}img/solana-icon.png`} />
                    </div>
                    <h2 className="title">Team Sponsor Bonus</h2>
                    <h3><span className="partnerSponsorBonus">{userData?.sponsorIncome ?? 0} </span> SOL</h3>
                  </a>
                </div>
                <div className="col-md-6 col-lg-6 mb-3">
                  <a href="direct-bonus.html" className="stats-box">
                    <div className="stats-icon">
                      <img src={`${import.meta.env.BASE_URL}img/solana-icon.png`} />
                    </div>
                    <h2 className="title">Team Starter Bonus</h2>
                    <h3><span className="partnerSponsorBonus">{userData?.directIncome ?? 0} </span> SOL</h3>
                  </a>
                </div>
                <div className="col-md-6 col-lg-6 mb-3">
                  <a href="pool-bonus.html" className="stats-box">
                    <div className="stats-icon">
                      <img src={`${import.meta.env.BASE_URL}img/solana-icon.png`} />
                    </div>
                    <h2 className="title">Team Pool Bonus</h2>
                    <h3><span className="partnerSponsorBonus">{userData?.poolIncome ?? 0} </span> SOL</h3>
                  </a>
                </div>

                <div className="col-md-6 col-lg-6 mb-3">
                  <a href="level-bonus.html" className="stats-box">
                    <div className="stats-icon">
                      <img src={`${import.meta.env.BASE_URL}img/solana-icon.png`} />
                    </div>
                    <h2 className="title">Team Level Bonus</h2>
                    <h3><span className="partnerSponsorBonus">{userData?.levelIncome ?? 0} </span> SOL</h3>
                  </a>
                </div>

                <div className="col-md-6 col-lg-6 mb-3">
                  <div className="stats-box">
                    <div className="stats-icon">
                      <img src={`${import.meta.env.BASE_URL}img/solana-icon.png`} />
                    </div>
                    <h2 className="title">Team Matching Bonus</h2>
                    <a href="team-matching-bonus.html">
                      <h3><span className="partnerSponsorBonus">{userData?.matchingIncome ?? 0} </span> SOL</h3>
                    </a>

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
                          <a href="#!" className="btn btn-primary btn-sm disabled">Claim Now</a>
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
                    <a href="team-matching-bonus.html">
                      <h3><span className="partnerSponsorBonus">{userData?.silverBonus ?? 0} </span> SOL</h3>
                    </a>

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
                          <a href="#!" className="btn btn-primary btn-sm ">Claim Now</a>
                        </div>
                      </div>
                    </div>


                  </div>
                </div>



                <div className="col-md-6 col-lg-3  col-6 mb-3">
                  <a href="network-team.html" className="stats-box">

                    <h2 className="title">Network Team</h2>
                    <h3><span className="partnerSponsorBonus">{userData?.totalMatrixTeam ?? 0}</span></h3>
                  </a>
                </div>
                <div className="col-md-6 col-lg-3  col-6 mb-3">
                  <a href="direct-team.html" className="stats-box">

                    <h2 className="title">Direct Team</h2>
                    <h3><span className="partnerSponsorBonus">{userData?.partnerCount ?? 0}</span></h3>
                  </a>
                </div>
                <div className="col-md-6 col-lg-6 mb-3">
                  <a href="rewardboard.html" className="stats-box">
                    <div className="stats-icon">
                      <img src={`${import.meta.env.BASE_URL}img/xp-point.png`} />
                    </div>
                    <h2 className="title">Total XP Points</h2>
                    <h3><span className="partnerSponsorBonus">{userData?.xpPoints ?? 0}</span></h3>
                  </a>
                </div>

                <div className="col-md-6 col-lg-6 mb-3">
                  <a href="lost-income.html">
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
                  </a>
                </div>
                <div className="col-md-6 col-lg-6 mb-3">
                  <a href="MP-lost-details.html">
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
                  </a>
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
                      <a href="earning-certificate-download.html" target="_blank" className="btn btn-primary btn-sm rounded">
                        <i className="fa-regular fa-download me-1"></i>Download Certificate
                      </a>
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
              <a href="zoom-meeting.html" className="meeting-box">
                <div className="meetingContent">
                  <img src={`${import.meta.env.BASE_URL}img/zoom-meet-logo.png`} /> <br />
                  <span className="btn btn-warning btn-sm mt-2"><i className="fa-regular fa-eye me-1"></i>Upcoming Meetings </span>
                </div>
              </a>
            </div>

            <div className="col-sm-12 col-lg-9 col-xl-9 text-center mt-3 mt-lg-0">
              <a href="lucky-draw.html"> <img src={`${import.meta.env.BASE_URL}img/lucky-draw-status.gif`} className="rounded" /></a>
            </div>

          </div>
        </div >

      </main >
      <UpgradeModal
        selectedPackage={selectedPackage}
        onUpgrade={handleUpgrade}
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

    </>
  )
}

export default SmartContract
