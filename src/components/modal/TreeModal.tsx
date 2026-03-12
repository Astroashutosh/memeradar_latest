// 

function TreeModal() {
  return (
    <>

      <div className="modal fade bd-example-modal-lg" id="paydetails" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered modal-lg">

          <div className="modal-content">
            <footer>
              MemeRadar © 2026. All Rights Reserved.
            </footer>
            <div className="sec-divider top"> </div>
            <div className="sec-divider bottom"> </div>

            <div className="modal-body">
              <h5 className="text-center"><small>DBO ID: 111560880142</small> <br /> <span className="text-success">0.65 SOL</span>
              </h5>
              <div className="row">
                <div className="col-6 col-lg-3">
                  <div className="pack_amt_details">
                    <h5>Starter</h5>
                    <div className="pack_amt_total">0.25 SOL</div>
                    <small>03-02-2026 15:20</small>
                  </div>
                </div>
                <div className="col-6 col-lg-3">
                  <div className="pack_amt_details">
                    <h5>Executive</h5>
                    <div className="pack_amt_total">-</div>
                    <small>-</small>
                  </div>
                </div>
                <div className="col-6 col-lg-3">
                  <div className="pack_amt_details">
                    <h5>Star</h5>
                    <div className="pack_amt_total">-</div>
                    <small>-</small>
                  </div>
                </div>
                <div className="col-6 col-lg-3">
                  <div className="pack_amt_details">
                    <h5>Pioneer</h5>
                    <div className="pack_amt_total">-</div>
                    <small>-</small>
                  </div>
                </div>
                <div className="col-6 col-lg-3">
                  <div className="pack_amt_details">
                    <h5>Director</h5>
                    <div className="pack_amt_total">-</div>
                    <small>-</small>
                  </div>
                </div>

                <div className="col-6 col-lg-3">
                  <div className="pack_amt_details">
                    <h5>Champion</h5>
                    <div className="pack_amt_total">-</div>
                    <small>-</small>
                  </div>
                </div>


                <div className="col-6 col-lg-3">
                  <div className="pack_amt_details">
                    <h5>Diamond</h5>
                    <div className="pack_amt_total">-</div>
                    <small>-</small>
                  </div>
                </div>

                <div className="col-6 col-lg-3">
                  <div className="pack_amt_details">
                    <h5>President</h5>
                    <div className="pack_amt_total">-</div>
                    <small>-</small>
                  </div>
                </div>
              </div>
              <div className="text-center mt-3">
                <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal" aria-label="Close"><i
                  className="fa-regular fa-close me-1"></i>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default TreeModal