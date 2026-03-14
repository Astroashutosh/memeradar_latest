import { Link, useNavigate } from 'react-router-dom';
import logo from '/assets/images/logo.png';
import { useWallet } from "../../../solana/context/WalletContext";
import { shorten } from "../../../solana/program";

function Header() {
  const { wallet, disconnect } = useWallet();
  const navigate = useNavigate();

  
  // const handleDisconnect = () => {
  //   disconnect();
  //   navigate("/");
  // };


const handleDisconnect = async () => {

  await disconnect()

  localStorage.removeItem("wallet_login")

  navigate("/", { replace: true })

}

  return (
    <>

 {/* <div className="wsmobileheader">
        <a id="wsnavtoggle" className="wsanimated-arrow">
          <span></span>
        </a>
      </div> */}

      <header className="navbar x-header navbar-expand-lg">
        <div className="m-header">
          <Link to="./" className="b-brand"><img src={logo} alt="" /></Link>
        </div>
        <div className="navbar-collapse">
          <ul className="navbar-nav order-lg-2">
            <li>
              <Link to="javascript:" className="drp-user">
               <div className="avatar">
  <svg width="30"
    height="30"
    viewBox="0 0 128 128"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="phantomGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#AB9FF2"/>
        <stop offset="100%" stopColor="#6C5DD3"/>
      </linearGradient>
    </defs>

    <circle cx="64" cy="64" r="64" fill="url(#phantomGradient)" />

    {/* Ghost shape */}
    <path
      d="M64 32c-17 0-30 13-30 30v20c0 4 3 7 7 7 2 0 4-1 5-2l6-6 6 6c2 2 6 2 8 0l6-6 6 6c2 2 6 2 8 0l6-6 6 6c1 1 3 2 5 2 4 0 7-3 7-7V62c0-17-13-30-30-30z"
      fill="white"
    />

    {/* Eyes */}
    <circle cx="50" cy="60" r="5" fill="#6C5DD3"/>
    <circle cx="78" cy="60" r="5" fill="#6C5DD3"/>
  </svg>
</div>
                <span className="small ms-2">{wallet ? shorten(wallet) : ""}</span>
              </Link>
            </li>
            <li className="Wb-logout">
              <a href="#" onClick={(e) =>{e.preventDefault(); handleDisconnect();}}><i className="fa fa-power-off"></i><span className="d-block">Logout</span></a>
            </li>
          </ul>
          <div className="wsmain order-lg-1">
            <div className="wsmainfull menu clearfix">
              <div className="wsmainwp clearfix">

                <nav className="wsmenu clearfix">
                  <ul className="wsmenu-list">
                    <li><Link to="/dashboard"><i className="fa-regular fa-home"></i><span
                      className="ms-1 d-inline d-lg-none">Home</span></Link></li>
                    <li><Link to="/smartContract">Dashboard</Link></li>
                    <li><Link to="/profile">My Profile</Link></li>
                    <li aria-haspopup="true"><Link to="javascript:void();">Smart Contract<span className="wsarrow"></span></Link>
                      <div className="wsmegamenu clearfix">
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-lg-4 col-md-12">
                              <ul className="wstliststy01 clearfix">
                                <li className="wstheading clearfix">My Team</li>
                                <li><Link to="/directTeam">My Direct Team </Link></li>
                                <li><Link to="/networkTeam">My Network Team </Link></li>
                                <li><Link to="/teamTree">My Team Tree </Link></li>
                                <li><Link to="/matrixTree">My Matrix Tree </Link></li>
                              </ul>
                            </div>
                            <div className="col-lg-4 col-md-12">
                              <ul className="wstliststy01 clearfix">
                                <li className="wstheading clearfix">My Income</li>
                                <li><Link to="/sponsorBonus"> Team Sponsor Bonus </Link></li>
                                <li><Link to="/directBonus"> Team Starter Bonus </Link></li>
                                <li><Link to="/levelBonus"> Team Level Bonus </Link></li>
                                <li><Link to="/poolBonus"> Team Pool Bonus </Link></li>
                                <li><Link to="/matchingBonus"> Team Matching Bonus </Link></li>
                                <li><Link to="/globalPoolBonus"> Global Silver Bonus </Link></li>
                              </ul>
                            </div>
                        
                            <div className="col-lg-4 col-md-12">
                              <ul className="wstliststy01 clearfix">
                                <li className="wstheading clearfix">My Tools</li>
                                <li><Link to="/calculator"> Calculator </Link></li>
                                <li><Link to="/persentationPdf"> Presentation PDF </Link></li>
                                <li><Link to="/webBanner"> Web Banners </Link></li>
                                <li><Link to="/promotionBanner"> Promotion Banners </Link></li>
                                <li><Link to="/printMaterials"> Print Materials </Link></li>
                              </ul>
                            </div>


                          </div>
                        </div>
                      </div>
                    </li>

                    <li><Link to="rewardboard.html">Earn Reward <span className="wsarrow"></span></Link>
                      <ul className="sub-menu">
                        <li><Link to="rewardboard.html"><i className="fa-light fa-laptop"></i>Earn Reward Dashboard</Link></li>
                        <li><Link to="platform-login.html"><i className="fa-light fa-arrow-right-to-bracket"></i>Platform Login
                        </Link></li>
                        <li><Link to="profile-xp.html"><i className="fa-light fa-user"></i>Profile Activity</Link></li>
                        <li><Link to="x-twitter-board.html"><i className="fa-brands fa-x-twitter"></i>X (Twitter) </Link></li>
                        <li><Link to="facebook-board.html"><i className="fa-brands fa-facebook"></i>Facebook </Link></li>
                        <li><Link to="youtube-video-list.html"><i className="fa-brands fa-youtube"></i>Youtube </Link></li>
                        <li><Link to="review-board.html"><i className="fa-light fa-star"></i>Write Review </Link></li>
                        <li><Link to="telegram-campaign.html"><i className="fa-brands fa-telegram"></i>Telegram </Link></li>
                        <li><Link to="email-marketing.html"><i className="fa-light fa-envelope"></i>Email Marketing </Link></li>
                        <li><Link to="redeem-XP.html"><i className="fa-light fa-money-bill-transfer"></i>Redeem XP Points </Link>
                        </li>
                      </ul>
                    </li>

                    <li><Link to="/memecoin">MemeRadar</Link></li>
                    <li><Link to="/fiveDollar">$Five</Link></li>
                    <li><Link to="/memeKols">MemeKOLs</Link></li>
                    <li><Link to="/support">Support</Link></li>
                  </ul>
                </nav>

              </div>
            </div>
          </div>
        </div>
      </header>


    </>
  )
}

export default Header