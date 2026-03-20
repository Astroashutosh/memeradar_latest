import { useEffect, useState } from "react";
import { useWallet } from "../../solana/context/WalletContext";
import { getUserData } from "../../solana/program";

function mpLostDetails() {

    const { wallet } = useWallet();
const [userData, setUserData] = useState<any>(null);

useEffect(() => {
  const loadUser = async () => {
    if (!wallet) return;

    const data = await getUserData(wallet);
    setUserData(data);
  };

  loadUser();
}, [wallet]);


  return (
  <>
  
  
  <main>
    <div className="container-fluid">
      <div className="SOL-page-title text-center"><span>MP Lost Report</span></div>
      <div className="row justify-content-center">
        <div className="col-md-3 col-lg-3 col-12">
          <div className="sol-point-box mb-2  mt-0">
            <h4> {userData?.lostLeft ?? 0}</h4>
            <small> Total Left Lost Bonus</small>
          </div>
        </div>
        <div className="col-md-3 col-lg-3 col-12">
          <div className="sol-point-box mb-2  mt-0">
            <h4> {userData?.lostRight ?? 0}</h4>
            <small> Total Right Lost Bonus</small>
          </div>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-9">
          <div className="table-responsive table-style">
            <table className="table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Left MP</th>
                  <th>Right MP</th>
                  <th>Date</th> 
                </tr>
              </thead>
              <tbody>
                             <tr><td colSpan={4}>No Data found</td></tr>

              </tbody>
            </table>
          </div>
          <div className="mt-3">
            <ul className="pagination">
              <li className="page-item"><a className="page-link" href="#">Previous</a></li>
              <li className="page-item active"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item"><a className="page-link" href="#">Next</a></li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  </main>

  
  {/* <!--  Submit --> */}
  <div className="modal fade" id="success-msg" >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <span className="modalWindow-close" data-bs-dismiss="modal" aria-label="Close"></span>
        <div className="modal-body text-center">
            <footer> 
  MemeRadar © 2026. All Rights Reserved.
  </footer>
          <div className="sec-divider top"> </div>
          <div className="sec-divider bottom"> </div>
          <img src={`${import.meta.env.BASE_URL}img/animated-check.gif`} width="100" className="rounded-circle mb-2"/>
          <h3>XP Points Converted</h3>
          <p> Your request has been submitted successfully. Kindly wait while it is being reviewed and approved.</p>
        </div>
      </div>
    </div>
  </div>
   {/* <!-- End Submit--> */}

  </>
  )
}

export default mpLostDetails