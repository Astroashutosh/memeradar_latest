import { Link, useNavigate } from 'react-router-dom';
import logo from '/assets/images/logo.png';
import { useWallet } from "../../../solana/context/WalletContext";
import { shorten } from "../../../solana/program";

function Header() {
  const { wallet, disconnect } = useWallet();
  const navigate = useNavigate();
  const handleDisconnect = () => {
    disconnect();
    navigate("/");
  };
  return (
    <>
      <header className="navbar x-header navbar-expand-lg">
        <div className="m-header">
          <Link to="./" className="b-brand"><img src={logo} alt="" /></Link>
        </div>
        <div className="navbar-collapse">
          <ul className="navbar-nav order-lg-2">
            <li>
              <Link to="javascript:" className="drp-user">
                <div className="avatar"> <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjIzIiBoZWlnaHQ9IjIzIiB4PSIzLjUiIHk9IjMuNSIgdmlld0JveD0iMCAwIDE0MS41MSAxMzYuNDIiPjxwYXRoIGZpbGw9IiNGRjVDMTYiIGQ9Im0xMzIuMjQgMTMxLjc1LTMwLjQ4LTkuMDctMjIuOTkgMTMuNzQtMTYuMDMtLjAxLTIzLTEzLjc0LTMwLjQ3IDkuMDhMMCAxMDAuNDdsOS4yNy0zNC43M0wwIDM2LjQgOS4yNyAwbDQ3LjYgMjguNDRoMjcuNzZMMTMyLjI0IDBsOS4yNyAzNi4zOC05LjI3IDI5LjM2IDkuMjcgMzQuNzItOS4yNyAzMS4zWiIvPjxwYXRoIGZpbGw9IiNGRjVDMTYiIGQ9Im05LjI3IDAgNDcuNjEgMjguNDZMNTQuOTggNDggOS4yOSAwWm0zMC40NyAxMDAuNDggMjAuOTUgMTUuOTUtMjAuOTUgNi4yNHYtMjIuMlpNNTkuMDEgNzQuMSA1NSA0OCAyOS4yMiA2NS43NWgtLjAybC4wOCAxOC4yNyAxMC40NS05LjkyaDE5LjI5Wk0xMzIuMjUgMGwtNDcuNiAyOC40Nkw4Ni41MSA0OGw0NS43Mi00OFptLTMwLjQ3IDEwMC40OC0yMC45NCAxNS45NSAyMC45NCA2LjI0di0yMi4yWm0xMC41My0zNC43M0w4Ni41MyA0OCA4Mi41IDc0LjFoMTkuMjdsMTAuNDYgOS45LjA3LTE4LjI2WiIvPjxwYXRoIGZpbGw9IiNFMzQ4MDciIGQ9Im0zOS43MyAxMjIuNjctMzAuNDYgOS4wOEwwIDEwMC40OGgzOS43M3YyMi4yWk01OS4wMiA3NC4xbDUuODIgMzcuNzEtOC4wNy0yMC45Ny0yNy40OS02LjgyIDEwLjQ2LTkuOTJINTlabTQyLjc2IDQ4LjU5IDMwLjQ3IDkuMDcgOS4yNy0zMS4yN2gtMzkuNzR6TTgyLjUgNzQuMDlsLTUuODIgMzcuNzEgOC4wNi0yMC45NyAyNy41LTYuODItMTAuNDctOS45MnoiLz48cGF0aCBmaWxsPSIjRkY4RDVEIiBkPSJtMCAxMDAuNDcgOS4yNy0zNC43M0gyOS4ybC4wNyAxOC4yNyAyNy41IDYuODIgOC4wNiAyMC45Ny00LjE1IDQuNjItMjAuOTQtMTUuOTZIMFptMTQxLjUgMC05LjI2LTM0LjczaC0xOS45M2wtLjA3IDE4LjI3LTI3LjUgNi44Mi04LjA2IDIwLjk3IDQuMTUgNC42MiAyMC45NC0xNS45NmgzOS43NFpNODQuNjQgMjguNDRINTYuODhsLTEuODkgMTkuNTQgOS44NCA2My44aDExLjg1bDkuODUtNjMuOC0xLjktMTkuNTRaIi8+PHBhdGggZmlsbD0iIzY2MTgwMCIgZD0iTTkuMjcgMCAwIDM2LjM4bDkuMjcgMjkuMzZIMjkuMkw1NC45OCA0OHptNDMuOTggODEuNjdoLTkuMDNsLTQuOTIgNC44MSAxNy40NyA0LjMzLTMuNTItOS4xNVpNMTMyLjI0IDBsOS4yNyAzNi4zOC05LjI3IDI5LjM2aC0xOS45M0w4Ni41MyA0OHpNODguMjcgODEuNjdoOS4wNGw0LjkyIDQuODItMTcuNDkgNC4zNCAzLjUzLTkuMTdabS05LjUgNDIuMyAyLjA2LTcuNTQtNC4xNS00LjYySDY0LjgybC00LjE0IDQuNjIgMi4wNSA3LjU0Ii8+PHBhdGggZmlsbD0iI0MwQzRDRCIgZD0iTTc4Ljc3IDEyMy45N3YxMi40NUg2Mi43NHYtMTIuNDVoMTYuMDJaIi8+PHBhdGggZmlsbD0iI0U3RUJGNiIgZD0ibTM5Ljc0IDEyMi42NiAyMyAxMy43NnYtMTIuNDZsLTIuMDUtNy41NHptNjIuMDMgMC0yMyAxMy43NnYtMTIuNDZsMi4wNi03LjU0eiIvPjwvc3ZnPjwvc3ZnPg=="
                  alt="MetaMask icon" />
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