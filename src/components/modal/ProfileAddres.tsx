// 

function ProfileAddres() {
  return (
    <>
      <div className="modal fade" id="AddAddress" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">

          <div className="modal-content">
            <span className="modalWindow-close" data-bs-dismiss="modal" aria-label="Close"></span>
            <div className="modal-body">
              <div className="sec-divider top"> </div>
              <div className="sec-divider bottom"> </div>
              <div className="text-center">
                <h5 className="text-warning"> Complete Address</h5>
                <p> Enter your full address, including house number, street, city, state, and PIN code, for accurate
                  communication.</p>
                <div className="style-wrapper">
                  <textarea rows={4} className="form-control h-auto mb-3"></textarea>

                  <a href="#!" className="btn btn-primary d-block">Save</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="modal fade" id="Addemail" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">

          <div className="modal-content">
            <span className="modalWindow-close" data-bs-dismiss="modal" aria-label="Close"></span>
            <div className="modal-body">
              <div className="sec-divider top"> </div>
              <div className="sec-divider bottom"> </div>
              <div className="text-center" id="enter-email">
                <h5 className="text-warning"> Email Address</h5>
                <p>We strongly recommend updating your email address. A email is important because it
                  provides to you latest update/news of MemeRadar.</p>
                <div className="style-wrapper">
                  <input className="form-control input-lg text-center mb-3" placeholder="Enter Email Address" />

                  <a href="#!" className="btn btn-primary d-block" id="submitId">Submit</a>
                </div>
              </div>
              <div className="text-center" id="verifyCode" style={{ display: "none" }}>
                <div className="form-group mb-3">
                  <h5 className="text-warning"> Verification Code</h5>
                  <label className="mb-2">Please enter the 4-digit email verification code that was sent to your email
                    address.</label>
                  <input className="form-control input-lg text-center" placeholder="Enter code" />
                </div>
                <a href="#!" className="btn btn-primary d-block" id="verifyBTN">Verify Now</a>
              </div>

              <div className="text-center" id="successMsg" style={{ display: "none" }}>
                <div className="p-4">
                  <img src="/img/animated-check.gif" width="100" className="rounded-circle" />
                  <h5 className="text-warning"> Congratulations!</h5>
                  <p>Your email address has been verified successfully.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




      <div className="modal fade" id="whatsappNumber" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">

          <div className="modal-content">
            <span className="modalWindow-close" data-bs-dismiss="modal" aria-label="Close"></span>
            <div className="modal-body">
              <div className="sec-divider top"> </div>
              <div className="sec-divider bottom"> </div>
              <div className="text-center" id="WT-number">
                <h5 className="text-warning"> Whatsapp Number</h5>
                <p>We strongly recommend updating your Whatsapp numnber. A email is important because it
                  provides to you latest update/news of MemeRadar.</p>
                <div className="style-wrapper">
                  <input className="form-control input-lg text-center mb-3" placeholder="Enter Whatsapp Number" />
                  <a href="#!" className="btn btn-primary d-block" id="WTsubmitId">Submit</a>
                </div>
              </div>
              <div className="text-center" id="WTverifyCode" style={{ display: "none" }}>
                <div className="form-group mb-3">
                  <h5 className="text-warning"> Verification Code</h5>
                  <label className="mb-3">Please enter the 4-digit verification code that was sent to your Whatsapp
                    Number.</label>
                  <input className="form-control input-lg text-center" placeholder="Enter code" />
                </div>
                <a href="#!" className="btn btn-primary d-block" id="WTverifyBTN">Verify Now</a>
              </div>
              <div className="text-center" id="WTsuccessMsg" style={{ display: "none" }}>
                <div className="p-4">
                  <img src="/img/animated-check.gif" width="100" className="rounded-circle" />
                  <h5 className="text-warning"> Congratulations!</h5>
                  <p>Your Whatsapp number has been verified successfully.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="modal fade" id="telegramUsername" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">

          <div className="modal-content">
            <span className="modalWindow-close" data-bs-dismiss="modal" aria-label="Close"></span>
            <div className="modal-body">
              <div className="sec-divider top"> </div>
              <div className="sec-divider bottom"> </div>
              <div className="text-center" id="TL-number">
                <h5 className="text-warning"> Telegram Username</h5>
                <p>To verify your Telegram username, click on the "Start Bot" button.</p>
                <div className="style-wrapper">
                  <a href="#!" className="btn btn-primary d-block" id="TLsubmitId">Start Bot</a>
                </div>
              </div>
              <div className="text-center" id="TLverifyCode" style={{ display: "none" }}>
                <div className="form-group  mb-3">
                  <h5 className="text-warning"> Verification Code</h5>
                  <label className="mb-3">It's important to integrate your Telegram username with us to receive all alerts,
                    notifications, and the
                    latest updates related to your account.</label>
                  <input className="form-control input-lg text-center" placeholder="Enter code" />
                </div>
                <a href="#!" className="btn btn-primary d-block" id="TLverifyBTN">Verify Now</a>
              </div>
              <div className="text-center" id="TLsuccessMsg" style={{ display: "none" }}>
                <div className="p-4">
                  <img src="/img/animated-check.gif" width="100" className="rounded-circle" />
                  <h5 className="text-warning"> Congratulations!</h5>
                  <p>Your Telegram username has been verified successfully.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




      <div className="modal fade" id="x-account-connect" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">

          <div className="modal-content">
            <span className="modalWindow-close" data-bs-dismiss="modal" aria-label="Close"></span>
            <div className="modal-body text-center">
              <div className="sec-divider top"> </div>
              <div className="sec-divider bottom"> </div>
              <div className="img-group-warn">
                <img className="big" alt="" src="/img/x-logo.png" />
                <img className="small" alt="" src="/img/link-white-icon.png" />
                <img className="big" alt="" src="/img/logo/logo-w.png" />
              </div>
              <div className="warn-title mb-2"> Bind Your X Account</div>
              <p>Bind your X account to a Solana wallet of your choice to unlock your dashboard. </p>
              <div className="text-warning mb-3">
                <i className="fa-light fa-triangle-exclamation me-2"></i>Remember: One X account = One wallet. Make sure to
                choose
                the correct wallet before binding.
              </div>
              <div className="row">
                <div className="col-lg-6 mb-2 mb-lg-0">
                  <a href="javascript:void();" className="btn btn-outline-dark d-block closeBTN">Maybe Letter</a>
                </div>
                <div className="col-lg-6">
                  <a href="profile.html" className="btn btn-primary d-block">Bind Now</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default ProfileAddres