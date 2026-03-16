import logo from '/assets/images/logo.png'
import { Link, useNavigate } from 'react-router-dom'
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
      {/* 
   <div className="wsmobileheader">
        <a id="wsnavtoggle" className="wsanimated-arrow">
          <span></span>
        </a>
      </div> */}

      {/* <img className="bg-shade" src={`${import.meta.env.BASE_URL}img/bg.webp" alt="" /> */}
      <header className="navbar x-header navbar-expand-lg">
        <div className="m-header">
          <Link to="./" className="b-brand"><img src={logo} alt="" /></Link>
        </div>
        <ul className="navbar-nav order-lg-2">
          <li>
            <Link to="javascript:" className="drp-user">
              <div className="avatar">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 128 128"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="phantomGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#AB9FF2" />
                      <stop offset="100%" stopColor="#6C5DD3" />
                    </linearGradient>
                  </defs>

                  <circle cx="64" cy="64" r="64" fill="url(#phantomGradient)" />

                  {/* Ghost shape */}
                  <path
                    d="M64 32c-17 0-30 13-30 30v20c0 4 3 7 7 7 2 0 4-1 5-2l6-6 6 6c2 2 6 2 8 0l6-6 6 6c2 2 6 2 8 0l6-6 6 6c1 1 3 2 5 2 4 0 7-3 7-7V62c0-17-13-30-30-30z"
                    fill="white"
                  />

                  {/* Eyes */}
                  <circle cx="50" cy="60" r="5" fill="#6C5DD3" />
                  <circle cx="78" cy="60" r="5" fill="#6C5DD3" />
                </svg>
              </div>
              <span className="small ms-2">{wallet ? shorten(wallet) : ""}</span>
            </Link>
          </li>
          <li className="Wb-logout">
            <a href="#" onClick={(e) => { e.preventDefault(); handleDisconnect(); }}><i className="fa fa-power-off"></i><span className="d-block">Logout</span></a>
          </li>
        </ul>
        <div className="navbar-collapse">
          <div className="wsmain order-lg-1">
            <div className="wsmainfull menu clearfix">
              <div className="wsmainwp clearfix">
                <nav className="wsmenu clearfix">
                  <ul className="wsmenu-list">
                    <li><Link to="/dashboard" className="active"><i className="fa-regular fa-home"></i></Link></li>
                    <li><Link to="/smartContract">Smart Contract</Link></li>
                    <li><Link to="/">Earn Reward</Link></li>
                    <li><Link to="/memecoin">MemeRadar</Link></li>
                    <li><Link to="/fiveDollar">$Five</Link></li>
                    <li><Link to="/memeKols">MemeKOLs</Link></li>
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
