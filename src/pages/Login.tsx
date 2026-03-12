import { Link, useNavigate } from "react-router-dom";
// import { useEffect } from "react";
import logo from "/assets/images/logo-center.png";

import { useWallet } from "../solana/context/WalletContext";
import { notifySuccess, notifyInfo, notifyError } from "../solana/context/Notifications";
import { checkUserRegistered } from "../solana/program";


function Login() {
const { connect } = useWallet();
const navigate = useNavigate();

  const handleConnect = async () => {
   
    try {
      const connectedWallet = await connect();
      if (!connectedWallet) {
        notifyError("Wallet not connected");
        return;
      }
      
      const registered = await checkUserRegistered(connectedWallet);

      if (registered) {
        localStorage.setItem("wallet_login", "true");
        notifySuccess("Wallet already registered! Redirecting to dashboard...");

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        notifyInfo("Wallet not registered! Redirecting to register page...");

        setTimeout(() => {
          navigate("/register");
        }, 2000);
      }

    } catch (err) {
      notifyError("Something went wrong.");
      console.error(err);
    }
  };

  return (
    <div>
      <div className="login">
        <div className="container">
          <section className="login-wrapper">
            <div className="login-form">
              <div className="logo">
                <img src={logo} alt="MemeRadar" />
              </div>

              <div className="login-form-header border-0 mb-0  text-white">
                <h1>Welcome Back!</h1>
                <p>Log in with your wallet to access all features of your personal account.</p>
              </div>
              <div className="login-form-body">
                <div className="mb-3">
                  
                  <a href="#" className="btn btn-primary d-block"  onClick={(e) => {
                    e.preventDefault();
                    handleConnect();
                  }}>
                    Connect Wallet
                  </a>
                </div>
                <div className="text-center  text-white">
                  Don't have a account? 
                  <Link to="/register" className="text-underline text-white">
                    Register Now
                  </Link>
                </div>
              </div>

            </div>



          </section>
          <div className="copyRight">
            MemeRadar © 2026. All Rights Reserved.
          </div>

        </div>
      </div>

    </div>
  )
}

export default Login
