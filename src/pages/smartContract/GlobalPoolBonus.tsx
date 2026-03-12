import { useState, useEffect } from 'react'
import Sidebar from '../../components/layout/smartContract/Sidebar';
import { useWallet } from "../../solana/context/WalletContext";
import { getIncomeEvents, checkUserRegistered, upgradePackage, getUserData } from "../../solana/program";
import { notifySuccess, notifyError } from "../../solana/context/Notifications";
import UpgradeModal from "../../components/modal/UpgradeModal";

function GlobalPoolBonus() {
  const { wallet } = useWallet();
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [rows, setRows] = useState<any[]>([]);
  const handleOpenUpgrade = (pkg: any) => {
    setSelectedPackage(pkg);
  };
  useEffect(() => {
      
    const load = async () => {
      if (!wallet) return;
      setLoading(true);
      const events = await getIncomeEvents();
      const globalPool = events.filter(
        (e: any) =>
          e.incomeType?.silverBonus !== undefined &&
          e.user.toBase58() === wallet
      );
      setRows(globalPool);
      const data = await getUserData(wallet);
      if (data) {
        setUserData(data);
      }
      setLoading(false);
    };
  
    load();
  }, [wallet]);
  
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
   <Sidebar onUpgradeClick={handleOpenUpgrade} />
        <div className="col-lg-12 col-xl-9">
          <div className="SOL-page-title text-center"><span>Global Silver Bonus</span></div>

          <div className="row justify-content-center">
            <div className="col-md-4 col-lg-4 col-12">
              <div className="sol-point-box mb-2  mt-0">
                <h4> {userData?.totalIncome ?? 0} SOL</h4>
                <small> Total Income</small>
              </div>
            </div>
            <div className="col-md-4 col-lg-4 col-12">
              <div className="sol-point-box mb-2 bg-gradient-golden mt-0">
                <h4> {userData?.maxIncome ?? 0} SOLANA</h4>
                <small> Max Income</small>
              </div>
            </div>
          </div>
          <div className="table-responsive table-style">
            <table className="table">
              <thead>
                <tr>
                  <th>S.No</th>
                  {/* <th>Txn Hash</th> */}
                  <th>Date</th>
                  <th>Income</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center">
                      Loading...
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center">
                      No Records Found
                    </td>
                  </tr>
                ) : ( rows.map((row, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  {/* <td className="nowrap">0x3119...C768a<a href="#!" className="ms-2" title="Copy Address"><i
                        className="bi bi-copy"></i></a><a href="#!" className="ms-2" title="Open Address"><i
                        className="bi bi-box-arrow-up-right"></i></a></td> */}
                  <td className="nowrap">{new Date(row.timestamp.toNumber() * 1000).toLocaleString()} </td>
                  <td>{row.amount.toNumber() / 1e9} SOL</td>

                </tr>
                // <tr>
                //   <td>2</td>
                //   <td className="nowrap">0x412w...p6a9X<a href="#!" className="ms-2" title="Copy Address"><i
                //         className="bi bi-copy"></i></a><a href="#!" className="ms-2" title="Open Address"><i
                //         className="bi bi-box-arrow-up-right"></i></a></td>
                //   <td className="nowrap">03-02-2026 12:45 </td>
                //   <td>0.65 SOL</td>
                // </tr>
                ))
                )}
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

          <div className="mt-3 text-muted fw-light"><u>Note:</u> From every upgrade, 9% will be equally distributed every 24 hours among all qualified SILVER who have a minimum of two SILVER in their direct team, until the qualified Silver earn a total of 5 SOLANA.</div>
        </div>
      </div>
    </div>
  </main>

  <UpgradeModal
      selectedPackage={selectedPackage}
      onUpgrade={handleUpgrade}
    />

    </>
  )
}

export default GlobalPoolBonus