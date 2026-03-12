import { useState } from 'react'
import ProfileAddres from '../../components/modal/ProfileAddres'
import Sidebar from '../../components/layout/smartContract/Sidebar'
import { useWallet } from "../../solana/context/WalletContext";
import { checkUserRegistered, upgradePackage } from "../../solana/program";
import { notifySuccess, notifyError } from "../../solana/context/Notifications";
import UpgradeModal from "../../components/modal/UpgradeModal";

function Profile() {
  const { wallet } = useWallet();
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
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
      console.log("registered",registered);
      if (registered) {
        await upgradePackage(wallet, selectedPackage.id);
        notifySuccess("Package upgraded successfully");
      }

    } catch (err:any) {
      console.error(err);
      notifyError(err.message || "Upgrade failed");
    }

  };
  return (
   <>
   
     <main>
    <div className="container-fluid">
      <div className="row">
     <Sidebar onUpgradeClick={handleOpenUpgrade}/>
        <div className="col-lg-12 col-xl-9">
          <div className="row">
            <div className="col-lg-6">
              <div className="style-wrapper">
                <div className="SOL-page-title text-center"><span>My Profile</span></div>
                <div className="row">
                  <div className="col-sm-12">
                    <div className="mb-2">
                      <label className="mb-1">Your Name</label>
                      <input type="text" className="form-control" value="George william ⚡️🐑" disabled/>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="mb-2">
                      <label className="mb-1">Email Address</label>
                      <div className="input-style-box">
                        <a href="#!" data-bs-toggle="modal" data-bs-target="#Addemail" className="btn btn-warning btn-sm"><i
                            className="fa-regular fa-plus-circle me-1"></i>Add</a>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-12">
                    <div className="mb-2">
                      <label className="mb-1">Whatsapp Number</label>
                      <div className="input-style-box">
                        <a href="#!" data-bs-toggle="modal" data-bs-target="#whatsappNumber"
                          className="btn btn-warning btn-sm"><i className="fa-brands fa-whatsapp me-1"></i>Add</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="mb-2">
                      <label className="mb-1">Telegram Username</label>
                      <div className="input-style-box">
                        <a href="#!" data-bs-toggle="modal" data-bs-target="#telegramUsername"
                          className="btn btn-warning btn-sm"><i className="fa-brands fa-telegram me-1"></i>Start</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12">
                    <div className="mb-2">
                      <label className="mb-1">Complete Address</label>
                      <div className="input-style-box">
                        <a href="#!" data-bs-toggle="modal" data-bs-target="#AddAddress"
                          className="btn btn-warning btn-sm"><i className="fa-regular fa-plus-circle me-1"></i>Add</a>
                      </div>
                    </div>
                  </div>


                  <div className="col-sm-12">
                    <div className="mb-2">
                      <label className="mb-1">Country</label>
                      <input type="text" className="form-control" value="Antigua And Barbuda" disabled/>
                    </div>
                  </div>

                </div>
            
              </div>
            </div>
            <div className="col-lg-6">
              <div className="style-wrapper">
                <div className="SOL-page-title text-center"><span>Social Media</span></div>
                <div className="item-style-box">
                  <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-lg-7 col-8">
                      <div className="social-account-reconnect  d-flex align-items-center">
                        <div className="social-reconnect-icon">
                          <i className="fa-brands fa-x-twitter"></i>
                        </div>
                        <div className="head"> Account</div>
                      </div>
                    </div>
                    <div className="col-lg-5 col-4 text-end">
                      <a href="javascript:void();" data-bs-toggle="modal" data-bs-target="#x-account-connect"
                        className="btn btn-primary btn-sm"> Connect</a>
                    </div>
                  </div>
                </div>


                <div className="item-style-box">
                  <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-lg-7 col-8">
                      <div className="social-account-reconnect  d-flex align-items-center">
                        <div className="social-reconnect-icon">
                          <i className="fa-brands fa-facebook"></i>
                        </div>
                        <div className="head">Facebook</div>
                      </div>
                    </div>
                    <div className="col-lg-5 col-4 text-end">
                      <a href="javascript:void();"   className="btn btn-primary btn-sm"> Connect</a>
                    </div>
                  </div>
                </div>

                <div className="item-style-box">
                  <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-lg-7 col-8">
                      <div className="social-account-reconnect  d-flex align-items-center">
                        <div className="social-reconnect-icon">
                          <i className="fa-brands fa-instagram"></i>
                        </div>
                        <div className="head">Instagram</div>
                      </div>
                    </div>
                    <div className="col-lg-5 col-4 text-end">
                       <a href="javascript:void();"   className="btn btn-primary btn-sm"> Connect</a>
                    </div>
                  </div>
                </div>


                <div className="item-style-box">
                  <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-lg-7 col-8">
                      <div className="social-account-reconnect  d-flex align-items-center">
                        <div className="social-reconnect-icon">
                          <i className="fa-brands fa-youtube"></i>
                        </div>
                        <div className="head">Youtube</div>
                      </div>
                    </div>
                    <div className="col-lg-5 col-4 text-end">
                      <a href="javascript:void();"   className="btn btn-primary btn-sm"> Connect</a>
                    </div>
                  </div>
                </div>





              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </main>
  <UpgradeModal
      selectedPackage={selectedPackage}
      onUpgrade={handleUpgrade}
    />

{/* Modal */}

<ProfileAddres/>
   
   </>
  )
}

export default Profile