import { useEffect, useState } from "react";
import Header from "../../components/layout/user/Header";
import JoiningSlider from "../../components/dashboard/JoiningSlider";
import Footer from "../../components/layout/user/Footer";
// import "../../assets/css/home.css";
import usePageCSS from "../../hooks/usePageCSS";
import ReadyToPump from "../../components/dashboard/ReadyToPump";
import TrendingToken from "../../components/dashboard/TrendingToken";
import { useWallet } from "../../solana/context/WalletContext";
import { packages, getUserData, shorten,getSponsorDetails } from "../../solana/program";
import type { UserData } from "../../solana/types";
import { copyToClipboard } from "../../utils/helpers"
import { Link } from "react-router-dom";
// import UpgradeModal from "../../components/modal/UpgradeModal";
import { useUpgrade } from '../../solana/context/UpgradeContext';
declare global {
  interface Window {
    confetti: any;
  }
}
function Dashboard() {
  usePageCSS("assets/home.css");
  usePageCSS("assets/dex.css");
// const [sponsorData, setSponsorData] = useState(null);
const [sponsorData, setSponsorData] = useState<{
  sponsor?: string;
  sponsor_id?: string;
} | null>(null);
  const { handleUpgrade, upgrading } = useUpgrade();
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { wallet, walletReady } = useWallet();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  useEffect(() => {
    const loadUser = async () => {
      if (!wallet || !walletReady) return;
      const data = await getUserData(wallet);
      console.log(data);

      if (data) {
        setUserData(data);

      }
    };

    loadUser();

    if (!window.Swiper) return;


  }, [wallet, walletReady]);


  useEffect(() => {

    const btn = document.getElementById("x-connect-btn");
    const modal = document.getElementById("x-connect-window");
    const closeBtns = document.querySelectorAll(".closeBTN, .modalWindow-close");




    const openModal = () => {
      if (modal) modal.style.display = "block";
    };

    const closeModal = () => {
      if (modal) modal.style.display = "none";
    };

    // open modal
    btn?.addEventListener("click", openModal);

    // close modal buttons
    closeBtns.forEach(el => {
      el.addEventListener("click", closeModal);
    });

    // click outside modal close
    modal?.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    return () => {
      btn?.removeEventListener("click", openModal);
      closeBtns.forEach(el => {
        el.removeEventListener("click", closeModal);
      });
    };

  }, []);

  const shareContent = () => {

    if (navigator.share) {
      navigator.share({
        title: "MemeRadar",
        text: "Become a MemeRadar DBO and join the fastest growing meme ecosystem.",
        url: "https://www.MemeRadar.com"
      });
    } else {
      alert("Sharing not supported");
    }

  };

  useEffect(() => {
    setShowAlert(true);


  }, []);

  // const userPackage = packages.find(
  //     (p) => p.id === userData?.currentPackage
  //   );

  const nextPackage = packages.find(
    (p) => p.id === (userData?.currentPackage ?? 0) + 1
  );
  const baseUrl =
    typeof window !== "undefined" ? window.location.origin : "";
  const referralLink = wallet ? `${baseUrl}/${shorten(wallet)}` : "";
  const referralLinkCopy = wallet ? `${baseUrl}/${wallet}` : "";


useEffect(() => {
  const loadSponsor = async () => {
    if (!wallet) return;

    const res = await getSponsorDetails(wallet);

    if (res?.status) {
      setSponsorData(res);
    }
  };

  loadSponsor();
}, [wallet]);









// new code of celebration

useEffect(() => {

  // const loadConfetti = () => {
  const loadConfetti = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (window.confetti) return resolve(window.confetti);

      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js";
      script.onload = () => resolve(window.confetti);
      script.onerror = () => reject();
      document.body.appendChild(script);
    });
  };

  const celebration = (volume = 0.11) => {
    if (!window.confetti) return;

    const burst = () => {
      window.confetti({
        particleCount: 50,
        angle: 60,
        spread: 90,
        origin: { x: 0 },
      });

      window.confetti({
        particleCount: 50,
        angle: 120,
        spread: 90,
        origin: { x: 1 },
      });
    };

    // const appcheer = document.getElementById("appcheer");
    const appcheer = document.getElementById("appcheer") as HTMLAudioElement | null;
    if (appcheer) {
      appcheer.volume = volume;
      appcheer.play().catch(() => {});
    }

    setTimeout(burst, 100);
    setTimeout(burst, 200);
    setTimeout(burst, 400);
    setTimeout(burst, 500);
    setTimeout(burst, 700);
  };

  loadConfetti().then(() => {
    celebration(); // ✅ page load

    const btn = document.getElementById("celebrateAction");

    if (btn) {
      btn.addEventListener("click", () => celebration(0.75));
    }
  });

}, []);






  return (
    <>
      <style>
        {`
          .marquee {
            overflow: hidden;
            white-space: nowrap;
            position: relative;
            flex: 1;
          }

          .marquee-content {
            display: inline-block;
            padding-left: 100%;
            animation: scrollText 15s linear infinite;
          }

          @keyframes scrollText {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
      <Header />

      <main>
        <div className="container-fluid mb-3">
          <JoiningSlider />
          <div className="row">
            <div className="col-lg-4 col-xl-3 order-1 order-lg-0 mt-lg-0 mt-3">
              <div className="newstyle-wrapper mb-3">
                <div className="row mb-2">
                  <div className="col-lg-12">
                    <div className="newcoinpump-item-trading">
                      <div className="newcoinpump-item-trading-thumbs">
                        <img src={`${import.meta.env.BASE_URL}img/logo/logo-w.png`} />
                      </div>
                      <div className="newcoinpump-item-trading-details">
                        <div className="newcoinpump-item-trading-head">
                          <div className="newcoinTradeTitle">
                            {wallet ? shorten(wallet) : ""}
                            <a href="#!" onClick={(e) => {
                              e.preventDefault();
                              if (wallet) {
                                copyToClipboard(wallet, "Wallet Address copied");
                              }
                            }}>
                              <i className="fa-regular fa-copy ms-1"></i>
                            </a>
                          </div>

                        </div>

                        <div className="coinpump-wallet-address">
                          <span>DBO ID</span> {userData?.userId}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="rank-wrp mb-2">
                  <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-sm-7 col-7 text-start">
                      <small> Current Rank</small>
                      {/* <h4> {userPackage?.name ?? "No Rank"}</h4> */}
                     <h4>
  {packages.find(p => p.id === userData?.currentPackage)?.name || "DBO"}
</h4>
                    </div>
                    <div className="col-sm-5 col-5 text-end">
                      <Link to="/certificate" className="btn btn-primary btn-sm bg-gradient-golden">
                        <i className="fa-regular fa-download me-1"></i>Certificate
                      </Link>
                    </div>
                  </div>

                  <div className="skStyle-wrapper">
                    <div className="row">
                      <div className="col-sm-6 col-6 text-center">
                        <div style={{ paddingTop: '3px' }}> <img src={`${import.meta.env.BASE_URL}img/target.png`} width="15" className="me-1" />Next Goal
                          <i className="fa fa-long-arrow-right bounceRight float-end mt-1"></i>
                        </div>
                      </div>
                      <div className="col-sm-6  col-6 skstyle"> {nextPackage ? nextPackage.name : "Max Rank Achieved"} </div>
                    </div>
                  </div>
                  {/* <a href="smart-contract.html" className="upgrade_Btn main-div2 mt-1">
                    Upgrade Now
                  </a> */}
                  {/* <a
  href="#"
  className="upgrade_Btn main-div2 mt-1"
  data-bs-toggle="modal"
  data-bs-target="#paymentConfirm"
  onClick={(e) => {
    e.preventDefault();
    if (nextPackage) {
      setSelectedPackage(nextPackage);
    }
  }}
>
  Upgrade Now
</a> */}

<a
  href="#"
  className="upgrade_Btn main-div2 mt-1"
  onClick={(e) => {
    e.preventDefault();
    if (nextPackage) {
      setSelectedPackage(nextPackage);
    }
  }}
>
  Upgrade Now
</a>


                </div>
                <div className="section-head mb-1">
                  <div className="section-title">Referral Link</div>
                </div>
                <div className="item-style-box d-flex justify-content-between align-items-center mb-2">
                  <span>
                    <img src={`${import.meta.env.BASE_URL}img/social-icon/web.png`} width="20"
                      className="me-1 align-bottom" />{referralLink}
                  </span>
                  <span>
                    <a href="#!" className="btn btn-outline-dark btn-sm" title="Copy" onClick={(e) => {
                      e.preventDefault();
                      copyToClipboard(referralLinkCopy, "Referral link copied");
                    }}>
                      <i className="fa-light fa-copy"></i>
                    </a>
                    <a href="#!" onClick={shareContent} className="btn btn-outline-dark btn-sm" title="Share"><i
                      className="fa-light fa-share"></i></a></span>
                </div>
                <div className="section-head mb-1">
                  <div className="section-title"> Social Media</div>
                </div>
                <div className="item-style-box">
                  <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-lg-7 col-8">
                      <div className="social-account-reconnect  d-flex align-items-center">
                        <div className="social-reconnect-icon">
                          <i className="fa-brands fa-x-twitter"></i>
                        </div>
                        <div className="head"> account</div>
                      </div>
                    </div>
                    {/* <div className="col-lg-5 col-4 text-end">
                  <a href="#!" onClick={() => setShowModal(true)} className="btn btn-primary btn-sm"> Connect</a>
                </div> */}
                    {showModal && (
                      <div className="modal">
                        <div className="modal-content">
                          <button onClick={() => setShowModal(false)}>Close</button>
                          <p>Connect your wallet here</p>
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                <div className="section-head mb-1">
                  <div className="section-title"> Platform Fee</div>
                </div>
                <div className="item-style-box d-flex justify-content-between align-items-center mb-0">
                  <span><i className="fa-regular fa-tag me-1"></i>Welcome Offer </span>
                  <span className="text-success"> <span className="text-decoration-line-through text-white"><i
                    className="fa-regular fa-usd me-1"></i>5.00</span> Free </span>
                </div>

<div className="section-head mb-1">
  <div className="section-title">Sponsor</div>
</div>

<div className="item-style-box d-flex justify-content-between align-items-center mb-0">
  <span>
    {sponsorData?.sponsor
      ? shorten(sponsorData.sponsor)
      : "Not Assigned"}
  </span>

  <span className="text-success">
    {sponsorData?.sponsor_id ?? "-"}
  </span>
</div>


              </div>
              <div className="newstyle-wrapper mb-3">
                <div className="row mb-2">
                  <div className="col-lg-8 pe-0 col-7">
                    <div className="newcoinpump-item-trading SOLnewcoin">
                      <div className="newcoinpump-item-trading-thumbs">
                        <img src={`${import.meta.env.BASE_URL}img/FiveDollar-memecoin.png`} />
                      </div>
                      <div className="newcoinpump-item-trading-details">
                        <div className="newcoinpump-item-trading-head">
                          <div className="newcoinTradeTitle">Five Dollar Memecoin</div>
                          <div className="coinTradeName">$Five</div>
                        </div>
                        <div className="newcoinpump-wallet-address">
                          <a href="#!" title="Wallet Address">0x5F0...e24c</a>
                          <a href="#!"><i className="fa-regular fa-copy ms-1"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 ps-0 col-5">
                    <div className="coinpump-item-rate">
                      <h5>10.9393 SOL</h5>
                      <span className="text-success">+63.66%</span>
                    </div>
                  </div>
                </div>

                <div className="row mb-2 align-items-center justify-content-center">
                  <div className="col-lg-5 col-5 pe-0">
                    <a href="#!" className="btn btn-outline-dark btn-sm ps-2 pe-2"><i
                      className="fa-regular fa-arrow-down me-1"></i>Buy</a>
                    <a href="#!" className="btn btn-outline-dark btn-sm ps-2 pe-2"><i
                      className="fa-regular fa-arrow-up me-1"></i>Sell</a>
                  </div>
                  <div className="col-lg-7 col-7 text-end ps-0">
                    <i className="fa-regular fa-wallet me-1"></i>00.00 SOL
                  </div>
                </div>
                <div className="sol-amount-wrapper">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-lg-7 col-7 pe-0">
                      <div className="sol-amount-body">
                        <div className="small">Pay</div>
                        <input maxLength={50} placeholder="0" />
                        <div className="small">$0.00</div>
                      </div>
                    </div>
                    <div className="col-lg-5 col-5 ps-0">
                      <div className="sol-amount-coinLogo">
                        <img src={`${import.meta.env.BASE_URL}img/coin/solana.png`} />
                        SOL
                      </div>
                    </div>
                  </div>
                </div>

                <div className="SOL-changeBTN">
                  <a href="#!"><i className="fa-regular fa-arrow-down-arrow-up"></i></a>
                </div>
                <div className="sol-amount-wrapper">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-lg-7 col-7 pe-0">
                      <div className="sol-amount-body">
                        <div className="small">Receive</div>
                        <input maxLength={50} placeholder="0" />
                        <div className="small">$81,412.29</div>
                      </div>
                    </div>
                    <div className="col-lg-5 col-5 ps-0">
                      <div className="sol-amount-coinLogo">
                        <img src={`${import.meta.env.BASE_URL}img/FiveDollar-memecoin.png`} />
                        $Five
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <a href="#!" className="btn btn-primary d-block">Buy $Five</a>
                </div>
              </div>
            </div >
            <div className="col-lg-8 col-xl-9 order-0">
              <div className="welcome-message mb-2">
                <div className="bullhorn">
                  <i className="fa-light fa-bullhorn"></i>
                </div>
                {/* <marquee behavior="" direction="">
              Welcome back to MemeRadar, home to the smartest and fastest-growing meme community.
            </marquee> */}
                <div className="marquee">
                  <div className="marquee-content">
                    Welcome back to MemeRadar, home to the smartest and fastest-growing meme community.
                  </div>
                </div>
                <div className="celebratebtn" id="celebrateAction" title="Click to Celebrate">
                  <i className="fa-regular fa-face-party" data-string="celebrateAction"></i>
                </div>
              </div>
              <TrendingToken />
              <ReadyToPump />
            </div>
          </div >

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
              <a href="lucky-draw.html"> <img src={`${import.meta.env.BASE_URL}img/lucky-draw-participate.gif`} className="rounded" /></a>
            </div>

          </div>
        </div >
      </main >



      {/* <!-- X Connect  --> */}
      < div className="modal-window" id="x-connect-window" >
        <div className="modal-window-wrapper">
          <div className="modalWindow-close closeBTN"></div>
          <div className="modal-window-body text-center">

            <div className="img-group-warn">
              <img className="big" alt="" src={`${import.meta.env.BASE_URL}img/x-logo.png`} />
              <img className="small" alt="" src={`${import.meta.env.BASE_URL}img/link-white-icon.png`} />
              <img className="big" alt="" src={`${import.meta.env.BASE_URL}img/logo/logo-w.png`} />
            </div>
            <div className="warn-title mb-2"> Bind Your X Account</div>
            <p>Bind your X account to a Solana wallet of your choice to unlock your dashboard. </p>
            <div className="text-warning mb-3">
              <i className="fa-light fa-triangle-exclamation me-2"></i>Remember: One X account = One wallet. Make sure to choose
              the correct wallet before binding.
            </div>
            <div className="row">
              <div className="col-lg-6 mb-2 mb-lg-0">
                <a href="javascript:void();" className="btn btn-outline-dark d-block btn-lg closeBTN">Maybe Letter</a>
              </div>
              <div className="col-lg-6">
                <a href="profile.html" className="btn btn-primary d-block btn-lg">Bind Now</a>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* <!-- End X Connect --> */}


      <audio src="/audio/cheers.mp3" id="appcheer"></audio>

      <Footer />
      {/* <!-- Alert Pop Management --> */}
      {/* <div className="alert-modal-window">
    <div className="alert-modal-window-body">
      <div className="modalWindow-close alertcloseBTN"></div>
      <img src={`${import.meta.env.BASE_URL}img/pop-up-alert.png`}/>
          </div>
        </div> */}

{/* <UpgradeModal
  selectedPackage={selectedPackage}
  onUpgrade={() =>
    handleUpgrade(wallet, selectedPackage, () => {
      // 🔥 optional refresh
      window.location.reload();
    })
  }
  upgrading={upgrading}
/> */}

{selectedPackage && (
  <div
    className="modal fade show"
    style={{ display: "block" }}
  >
    <div
      className="modal-dialog modal-dialog-centered"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="modal-content">

        {/* Close */}
        <span
          className="modalWindow-close"
          onClick={() => setSelectedPackage(null)}
        ></span>

        <div className="modal-body text-center">

          <div className="sec-divider top"></div>
          <div className="sec-divider bottom"></div>

          <img
            src={`${import.meta.env.BASE_URL}img/solana-icon.png`}
            width="80"
          />

          <div className="badgeStyle text-center mb-2">
            <h5>{selectedPackage?.price} SOL</h5>
          </div>

          <h3>
            Package:{" "}
            <span className="text-success">
              {selectedPackage?.name}
            </span>
          </h3>

          <div className="fs-small mb-2">
            To complete your package upgrade, please continue to the payment page.
          </div>

          {/* Upgrade button */}
          <a
            href="#"
            className={`btn btn-primary ms-1 ${upgrading ? "disabled" : ""}`}
            onClick={(e) => {
              e.preventDefault();
              if (!upgrading) {
                handleUpgrade(wallet, selectedPackage, () => {
                  window.location.reload();
                });
              }
            }}
          >
            {upgrading ? "Processing..." : "Proceed to Upgrade"}
          </a>

        </div>
      </div>
    </div>
  </div>
)}



      {showAlert && (
        <div className="alert-modal-window">

          <div className="alert-modal-window-body">

            <div
              className="modalWindow-close alertcloseBTN"
              onClick={() => setShowAlert(false)}
            ></div>

            <img src={`${import.meta.env.BASE_URL}img/pop-up-alert.png`} />

          </div>

        </div>
      )}
      {/* <!-- End Alert Pop Management --> */}

    </>
  );
}

export default Dashboard;