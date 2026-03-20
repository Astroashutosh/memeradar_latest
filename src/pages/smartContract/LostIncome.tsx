import { useEffect, useState } from "react";
import { useWallet } from "../../solana/context/WalletContext";
import { getUserData } from "../../solana/program";

function LostIncome() {

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
      <div className="SOL-page-title text-center"><span>Lost Bonus Report</span></div>
      <div className="row justify-content-center">
        <div className="col-md-4 col-lg-4 col-12">
          <div className="sol-point-box mb-2  mt-0">
            <h4> {userData?.lapsIncome ?? 0} SOL</h4>
            <small> Total Lost Bonus</small>
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
                  <th>DBO ID</th>
                  <th>Address</th>
                  <th>Date</th>
                  <th>Package</th>
                  <th>Income</th>
                  <th>Income Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>111560880142</td>
                  <td className="nowrap">0x3119...C768a<a href="#!" className="ms-2" title="Copy Address"><i
                        className="bi bi-copy"></i></a><a href="#!" className="ms-2" title="Open Address"><i
                        className="bi bi-box-arrow-up-right"></i></a></td>
                  <td className="nowrap">03-02-2025 </td>
                  <td>Gold</td>
                  <td>0.25 SOL</td>
                  <td>Team Sponsor Bonus</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>11156041753</td>
                  <td className="nowrap">0x3119...C768a<a href="#!" className="ms-2" title="Copy Address"><i
                        className="bi bi-copy"></i></a><a href="#!" className="ms-2" title="Open Address"><i
                        className="bi bi-box-arrow-up-right"></i></a></td>
                  <td className="nowrap">03-02-2025 </td>
                  <td>Gold</td>
                  <td>0.25 SOL</td>
                  <td>Team Pool Bonus</td>
                </tr>
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

    
    </>
  )
}

export default LostIncome