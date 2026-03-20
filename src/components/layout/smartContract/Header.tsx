import { Link, useNavigate } from "react-router-dom";
import logo from "/assets/images/logo.png";
import { useWallet } from "../../../solana/context/WalletContext";
import { shorten } from "../../../solana/program";
import { useState, useEffect } from "react";

function Header() {

  const { wallet, disconnect } = useWallet();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  // const [openSubMenu, setOpenSubMenu] = useState(null);

  // const toggleMenu = () => {
  //   setMenuOpen(!menuOpen);
  // };

  // const toggleSubMenu = (menu) => {
  //   setOpenSubMenu(openSubMenu === menu ? null : menu);
  // };

const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

// const toggleMenu = () => {
//   setMenuOpen(!menuOpen);
// };
const toggleMenu = () => {
  setMenuOpen(prev => !prev);
};
const toggleSubMenu = (menu: string) => {
  setOpenSubMenu(openSubMenu === menu ? null : menu);
};
  
  const handleDisconnect = async () => {
    await disconnect();
    localStorage.removeItem("wallet_login");
    navigate("/", { replace: true });
  };

useEffect(() => {
  if (menuOpen) {
    document.body.classList.add("wsactive");
  } else {
    document.body.classList.remove("wsactive");
  }
}, [menuOpen]);

const handleMenuClick = () => {
  setMenuOpen(false);
  setOpenSubMenu(null);
};
  return (
    <>

{menuOpen && (
  <div
    className="overlapblackbg"
    onClick={() => setMenuOpen(false)}
  ></div>
)}


      {/* MOBILE HEADER */}
      <div className="wsmobileheader">
        <a
          id="wsnavtoggle"
          className={`wsanimated-arrow ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
        </a>
      </div>

      <header className="navbar x-header navbar-expand-lg">

        <div className="m-header">
          <Link to="/" className="b-brand">
            <img src={logo} alt="" />
          </Link>
        </div>

        <div className="navbar-collapse">

          {/* USER */}
          <ul className="navbar-nav order-lg-2">
            <li>
              <div className="drp-user">
                <div className="avatar">
                <svg
  width="30"
  height="30"
  viewBox="0 0 128 128"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <linearGradient id="phantomGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#AB9FF2"/>
      <stop offset="100%" stop-color="#6C5DD3"/>
    </linearGradient>
  </defs>

  <circle cx="64" cy="64" r="64" fill="url(#phantomGradient)" />

  <path
    d="M64 34
       c-16 0-28 12-28 28
       v20
       c0 4 3 6 6 6
       c2 0 4-1 5-2
       l5-5 5 5
       c2 2 5 2 7 0
       l5-5 5 5
       c2 2 5 2 7 0
       l5-5 5 5
       c1 1 3 2 5 2
       c3 0 6-2 6-6
       V62
       c0-16-12-28-28-28z"
    fill="#ffffff"
  />
  <circle cx="50" cy="60" r="5" fill="#6C5DD3"/>
  <circle cx="78" cy="60" r="5" fill="#6C5DD3"/>
</svg>
                </div>
                <span className="small ms-2">
                  {wallet ? shorten(wallet) : ""}
                </span>
              </div>
            </li>

            <li className="Wb-logout">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleDisconnect();
                }}
              >
                <i className="fa fa-power-off"></i>
                <span className="d-block">Logout</span>
              </a>
            </li>
          </ul>

          {/* MENU */}
          <div className={`wsmain order-lg-1 ${menuOpen ? "wsactive" : ""}`}>
            <div className="wsmainfull menu clearfix">
              <div className="wsmainwp clearfix">

                <nav className="wsmenu clearfix">

                  <ul className="wsmenu-list">

                    <li>
                      <Link to="/dashboard" onClick={handleMenuClick}>
                        <i className="fa-regular fa-home"></i>
                        <span className="ms-1 d-inline d-lg-none">Home</span>
                      </Link>
                    </li>

                    <li>
                      <Link to="/smartContract" onClick={handleMenuClick}>Dashboard</Link>
                    </li>

                    <li>
                      <Link to="/profile" onClick={handleMenuClick}>My Profile</Link>
                    </li>

                    {/* SMART CONTRACT MEGA MENU */}

                    <li className={openSubMenu === "smart" ? "open" : ""}>

                      <a className="toggleMenu"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleSubMenu("smart");
                        }}
                      >
                        Smart Contract <span className="wsarrow"></span>
                      </a>

                      <div
                        className="wsmegamenu clearfix"
                        style={{
                          display: openSubMenu === "smart" ? "block" : ""
                        }}
                      >

                        <div className="container-fluid">
                          <div className="row">

                            <div className="col-lg-4 col-md-12">

                              <ul className="wstliststy01 clearfix">

                                <li className="wstheading clearfix">
                                  My Team
                                </li>

                                <li>
                                  <Link onClick={handleMenuClick} to="/directTeam" >
                                    My Direct Team
                                  </Link>
                                </li>

                                <li>
                                  <Link onClick={handleMenuClick} to="/networkTeam">
                                    My Network Team
                                  </Link>
                                </li>

                                <li>
                                  <Link onClick={handleMenuClick} to="/teamTree">
                                    My Team Tree
                                  </Link>
                                </li>

                                <li>
                                  <Link onClick={handleMenuClick} to="/matrixTree">
                                    My Matrix Tree
                                  </Link>
                                </li>

                              </ul>

                            </div>

                            <div className="col-lg-4 col-md-12">

                              <ul className="wstliststy01 clearfix">

                                <li className="wstheading clearfix">
                                  My Income
                                </li>

                                <li>
                                  <Link onClick={handleMenuClick} to="/sponsorBonus">
                                    Team Sponsor Bonus
                                  </Link>
                                </li>

                                <li>
                                  <Link onClick={handleMenuClick} to="/directBonus">
                                    Team Starter Bonus
                                  </Link>
                                </li>

                                <li>
                                  <Link onClick={handleMenuClick} to="/levelBonus">
                                    Team Level Bonus
                                  </Link>
                                </li>

                                <li>
                                  <Link onClick={handleMenuClick} to="/poolBonus">
                                    Team Pool Bonus
                                  </Link>
                                </li>

                                <li>
                                  <Link onClick={handleMenuClick} to="/matchingBonus">
                                    Team Matching Bonus
                                  </Link>
                                </li>

                                <li>
                                  <Link onClick={handleMenuClick} to="/globalPoolBonus">
                                    Global Silver Bonus
                                  </Link>
                                </li>

                              </ul>

                            </div>

                            <div className="col-lg-4 col-md-12">

                              <ul className="wstliststy01 clearfix">

                                <li className="wstheading clearfix">
                                  My Tools
                                </li>

                                <li>
                                  <Link onClick={handleMenuClick} to="/calculator">
                                    Calculator
                                  </Link>
                                </li>

                                <li>
                                  <Link onClick={handleMenuClick} to="/persentationPdf">
                                    Presentation PDF
                                  </Link>
                                </li>

                                <li>
                                  <Link onClick={handleMenuClick} to="/webBanner">
                                    Web Banners
                                  </Link>
                                </li>

                                <li>
                                  <Link onClick={handleMenuClick} to="/promotionBanner">
                                    Promotion Banners
                                  </Link>
                                </li>

                                <li>
                                  <Link onClick={handleMenuClick} to="/printMaterials">
                                    Print Materials
                                  </Link>
                                </li>

                              </ul>

                            </div>

                          </div>
                        </div>

                      </div>

                    </li>

                    {/* EARN REWARD */}

                    <li className={openSubMenu === "reward" ? "open" : ""}>

                      <a className="toggleMenu"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleSubMenu("reward");
                        }}
                      >
                        Earn Reward <span className="wsarrow"></span>
                      </a>

                      <ul
                        className="sub-menu"
                        style={{
                          display: openSubMenu === "reward" ? "block" : ""
                        }}
                      >

                        <li>
                          <Link onClick={handleMenuClick} to="#">Earn Reward Dashboard</Link>
                        </li>

                        <li>
                          <Link onClick={handleMenuClick} to="#">Platform Login</Link>
                        </li>

                        <li>
                          <Link onClick={handleMenuClick} to="#">Profile Activity</Link>
                        </li>

                        <li>
                          <Link onClick={handleMenuClick} to="#">X (Twitter)</Link>
                        </li>

                        <li>
                          <Link onClick={handleMenuClick} to="#">Facebook</Link>
                        </li>

                        <li>
                          <Link onClick={handleMenuClick} to="#">Youtube</Link>
                        </li>

                        <li>
                          <Link onClick={handleMenuClick} to="#">Write Review</Link>
                        </li>

                        <li>
                          <Link onClick={handleMenuClick} to="#">Telegram</Link>
                        </li>

                        <li>
                          <Link onClick={handleMenuClick} to="#">Email Marketing</Link>
                        </li>

                        <li>
                          <Link onClick={handleMenuClick} to="#">Redeem XP Points</Link>
                        </li>

                      </ul>

                    </li>

                    <li>
                      <Link onClick={handleMenuClick} to="/memecoin">MemeRadar</Link>
                    </li>

                    <li>
                      <Link onClick={handleMenuClick} to="/fiveDollar">$Five</Link>
                    </li>

                    <li>
                      <Link onClick={handleMenuClick} to="/memeKols">MemeKOLs</Link>
                    </li>

                    <li>
                      <Link onClick={handleMenuClick} to="/support">Support</Link>
                    </li>

                  </ul>

                </nav>

              </div>
            </div>
          </div>

        </div>
      </header>
    </>
  );
}

export default Header;