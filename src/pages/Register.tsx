import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useWallet } from "../solana/context/WalletContext";
import logo from "/assets/images/logo-center.png";
import { notifySuccess, notifyError } from "../solana/context/Notifications";
import { checkUserRegistered, registerUser } from "../solana/program";
import { PublicKey } from "@solana/web3.js";
import { getNames } from "country-list";
function Register() {
  const { wallet, connect } = useWallet();
  const { ref } = useParams();
  const [country, setCountry] = useState("");
  // const countries = getNames();
  const countries: string[] = getNames();
  // console.log("wallet1",wallet);
  const navigate = useNavigate();
  const [sponsor, setSponsor] = useState('');
  useEffect(() => {
    if (ref) {
      setSponsor(ref);
    }
  }, [ref]);

  //   const handleRegister = async () => {

  //     if (!wallet) {
  //       notifyError("Wallet not connected");
  //       return;
  //     }
  //   let connectedWallet = wallet;


  //   if (!connectedWallet) {

  //     try {
  //       connectedWallet = await connect();

  //       if (!connectedWallet) {
  //         notifyError("Wallet not connected");
  //         return;
  //       }

  //     } catch (err) {
  //       notifyError("Wallet connection failed");
  //       return;
  //     }

  //   }


  //     if (!sponsor || sponsor.trim() === "") {
  //       notifyError("Invitation Code is required");
  //       return;
  //     }

  //     const confirmRegister = window.confirm(
  //       `You are about to register with invitation code: ${sponsor}. Continue?`
  //     );

  //     if (!confirmRegister) return;
  //     try {
  //       const registered = await checkUserRegistered(wallet);
  //       if (registered) {
  //         notifySuccess("Wallet already registered!");
  // localStorage.setItem("wallet_login", "true");
  //         setTimeout(() => navigate("/dashboard"), 1500);
  //         return;
  //       }

  //       await registerUser(wallet, sponsor);
  //       notifySuccess("Registration successful!");
  //       setTimeout(() => navigate("/dashboard"), 1500);

  //     } catch (err) {
  //       console.error(err);
  //       notifyError("Registration failed");
  //     }

  //   };


  // const handleRegister = async () => {

  //   let connectedWallet = wallet;


  //   if (!connectedWallet) {

  //     try {
  //       connectedWallet = await connect();

  //       if (!connectedWallet) {
  //         notifyError("Wallet not connected");
  //         return;
  //       }

  //     } catch (err) {
  //       notifyError("Wallet connection failed");
  //       return;
  //     }

  //   }

  //   if (!sponsor || sponsor.trim() === "") {
  //     notifyError("Invitation Code is required");
  //     return;
  //   }

  //   const confirmRegister = window.confirm(
  //     `You are about to register with invitation code: ${sponsor}. Continue?`
  //   );

  //   if (!confirmRegister) return;

  //   try {

  //     const registered = await checkUserRegistered(connectedWallet);

  //     if (registered) {

  //       notifySuccess("Wallet already registered!");

  //       localStorage.setItem("wallet_login", "true");

  //       setTimeout(() => navigate("/dashboard"), 1500);

  //       return;
  //     }

  //     await registerUser(connectedWallet, sponsor);

  //     notifySuccess("Registration successful!");
  //       localStorage.setItem("wallet_login", "true");
  //     setTimeout(() => navigate("/dashboard"), 1500);

  //   } catch (err) {

  //     console.error(err);

  //     notifyError("Registration failed");

  //   }

  // };



  // const handleRegister = async () => {

  //   let connectedWallet = wallet;

  //   if (!connectedWallet) {

  //     try {
  //       connectedWallet = await connect();
  //     } catch {
  //       notifyError("Wallet connection failed");
  //       return;
  //     }

  //   }

  //   if (!connectedWallet) {
  //     notifyError("Wallet not connected");
  //     return;
  //   }

  //   if (!sponsor || sponsor.trim() === "") {
  //     notifyError("Invitation Code is required");
  //     return;
  //   }

  //   try {

  //     const registered = await checkUserRegistered(connectedWallet);

  //     if (registered) {

  //       notifySuccess("Wallet already registered!");

  //       localStorage.setItem("wallet_login", "true");

  //       setTimeout(() => navigate("/dashboard"), 1500);

  //       return;
  //     }

  //     await registerUser(connectedWallet, sponsor, true); // LEFT

  //     notifySuccess("Registration successful!");
  //       // localStorage.setItem("wallet_login", "true");

  //     setTimeout(() => navigate("/dashboard"), 1500);

  //   } catch (err) {

  //     console.error(err);

  //     notifyError("Registration failed");

  //   }

  // };



  const handleRegister = async () => {
console.log("Selected country:", country);
    try {

      let connectedWallet = wallet;

      if (!connectedWallet) {
        connectedWallet = await connect();
      }

      if (!connectedWallet) {
        notifyError("Wallet not connected");
        return;
      }

      if (!sponsor || sponsor.trim() === "") {
        notifyError("Invitation Code required");
        return;
      }

      // check registration
      const registered = await checkUserRegistered(connectedWallet);

      if (registered) {

        notifySuccess("Wallet already registered");

        localStorage.setItem("wallet_login", "true");

        navigate("/dashboard");

        return;

      }

      await registerUser(
        new PublicKey(connectedWallet),
        new PublicKey(sponsor)
      );
localStorage.setItem("country", country);
      notifySuccess("Registration successful");

      localStorage.setItem("wallet_login", "true");

      setTimeout(() => navigate("/dashboard"), 1500);

    } catch (err: any) {

      console.error(err);

      notifyError(err.message || "Registration failed");

    }

  };
  return (
    <>

      <div className="container">
        <section className="login-wrapper">
          <div className="login-form">
            <div className="logo">
              <img src={logo} alt="MemeRadar" />
            </div>

            <div className="login-form-header border-0 mb-0  text-white">
              <h1>Get Started</h1>
              <p>Create a secure account with your Solana Wallet address.</p>
            </div>
            <div className="login-form-body">
              <div className="mb-3 text-center">
                <label className="text-warning">Invitation Code</label>
                <input type="text" className="form-control text-center" placeholder="" value={sponsor}
                  onChange={(e) => {
                    setSponsor(e.target.value)
                  }} />
              </div>
              <div className="mb-3 text-center">
                <label className="text-warning">Select Country</label>
                {/* <select className="form-control" > */}
      <select
  className="form-control"
  value={country}
  onChange={(e) => {
    const selected = e.target.value;
    setCountry(selected);
    localStorage.setItem("country", selected); 
  }}
>
  <option value="">Select Country</option>

  {countries.map((c: string) => (
    <option key={c} value={c}>
      {c}
    </option>
  ))}
</select>
                <div id="otherInput" style={{ display: "none" }} className="mt-2">
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="mb-3">
                {/* <a href="#" className="btn btn-primary d-block" onClick={(e) => {
                  e.preventDefault();
                  handleRegister();
                }}>
                  Register Now
                </a> */}

                <a
                  href="#"
                  className="btn btn-primary d-block"
                  onClick={(e) => {
                    e.preventDefault();
                    handleRegister();
                  }}
                >
                  Register Now
                </a>

              </div>
              <div className="text-center  text-white">
                Already have an account? <Link to="/" className="text-underline text-white">Login</Link>
              </div>
            </div>
          </div>
        </section>
        <div className="copyRight">
          MemeRadar © 2026. All Rights Reserved.
        </div>

      </div>

    </>
  )
}

export default Register