import { useState, useEffect } from 'react'
import Sidebar from '../../components/layout/smartContract/Sidebar';
import { useWallet } from "../../solana/context/WalletContext";
import { checkUserRegistered, upgradePackage, getUserData, shorten,getReports  } from "../../solana/program";
import { notifySuccess, notifyError } from "../../solana/context/Notifications";
import UpgradeModal from "../../components/modal/UpgradeModal";

function DirectBonus() {
  const { wallet } = useWallet();
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [rows, setRows] = useState<any[]>([]);
  const handleOpenUpgrade = (pkg: any) => {
    setSelectedPackage(pkg);
  };

  // useEffect(() => {

  //   const load = async () => {

  //     if (!wallet) return;

  //     const data = await getUserData(wallet);
  //     console.log("fdsfsfsdfs", data);
  //     if (data) {
  //       setUserData(data);
  //     }

  //     setLoading(true);
  //     const events = await getIncomeEvents();
  //     console.log("events", events);
  //     console.log("fdsfsfsdfs");

  //     // 
  //     const direct = events.filter(
  //       (e: any) =>
  //         e.incomeType?.directKick !== undefined &&
  //         e.user.toBase58() === wallet
  //     );
  //     console.log("direct", direct);
  //     const enriched = await Promise.all(
  //       direct.map(async (e: any) => {
  //         const fromWallet = e.from.toBase58();
  //         const dboId = await getUserId(fromWallet);

  //         return {
  //           ...e,
  //           dboId,
  //         };
  //       })
  //     );
  //     setRows(enriched);

  //     // const data = await getUserData(wallet);
  //     // console.log("fdsfsfsdfs",data);
  //     // if (data) {
  //     //   setUserData(data);
  //     // }
  //     setLoading(false);
  //   };





  //   load();
  // }, [wallet]);


useEffect(() => {
  const load = async () => {
    if (!wallet) return;

    setLoading(true);

    const data = await getUserData(wallet);
    if (data) setUserData(data);

    // 🔥 directKick only
    const reports = await getReports(wallet, "directKick");

    setRows(reports);

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
      console.log("registered", registered);
      if (registered) {
        await upgradePackage(wallet, selectedPackage.id);
        notifySuccess("Package upgraded successfully");
      }

    } catch (err: any) {
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
              <div className="SOL-page-title text-center"><span>Team Starter Bonus</span></div>

              <div className="row justify-content-center mb-3">
                <div className="col-md-4 col-lg-4 col-12">
                  <div className="meme-earning-wrapper">
                    <div className="meme-earning-tab"><img src={`${import.meta.env.BASE_URL}img/solana-icon.png`} className="me-1" />Total
                      Income:
                      {/* {userData?.totalIncome ?? 0} */}
                      {userData?.directIncome ?? 0}
                      SOL</div>
                  </div>
                </div>
              </div>
              <div className="table-responsive table-style">
                <table className="table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>DBO ID</th>
                      <th>Address</th>
                      <th>Date</th>
                      <th>Total Income</th>

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
                    ) : (
                      rows.map((row, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>

                          <td>{row.user_id ?? "-"}</td>

                          <td>{shorten(row.from)}</td>

                          <td>{new Date(row.timestamp * 1000).toLocaleString()}</td>

                          <td>{row.amount}  SOL</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {/* <div className="mt-3">
            <ul className="pagination">
              <li className="page-item"><a className="page-link" href="#">Previous</a></li>
              <li className="page-item active"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item"><a className="page-link" href="#">Next</a></li>
            </ul>
          </div> */}

              <div className="mt-3 text-muted fw-light">
                For every successful referral, you'll earn a bonus of 0.08 SOL on partner's starter package value only.
              </div>

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

export default DirectBonus