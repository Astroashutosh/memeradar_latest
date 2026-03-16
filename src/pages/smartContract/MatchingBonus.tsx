import { useState, useEffect } from 'react'
import Sidebar from '../../components/layout/smartContract/Sidebar'
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import { useWallet } from "../../solana/context/WalletContext";
import { checkUserRegistered, upgradePackage, getUserData } from "../../solana/program";
import { notifySuccess, notifyError } from "../../solana/context/Notifications";
import UpgradeModal from "../../components/modal/UpgradeModal";

function MatchingBonus() {
  const { wallet } = useWallet();
  // const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  // const [rows, setRows] = useState<any[]>([]);
  const handleOpenUpgrade = (pkg: any) => {
    setSelectedPackage(pkg);
  };

  useEffect(() => {

    const load = async () => {
      if (!wallet) return;
      // setLoading(true);
      // const events = await getIncomeEvents();
      // const sponsor = events.filter(
      //   (e: any) =>
      //     e.incomeType?.sponsor !== undefined &&
      //     e.user.toBase58() === wallet
      // );
      // console.log("sponsor",sponsor);
      // const enriched = await Promise.all(
      //   sponsor.map(async (e: any) => {
      //     const fromWallet = e.from.toBase58();
      //     const dboId = await getUserId(fromWallet);

      //     return {
      //       ...e,
      //       dboId,
      //     };
      //   })
      // );
      // setRows(enriched);
      const data = await getUserData(wallet);
      if (data) {
        setUserData(data);
      }
      // setLoading(false);
    };

    load();

    const table = ($('#example') as any).DataTable({
      lengthMenu: [
        [10, 30, 50, 100, 200, -1],
        [10, 30, 50, 100, 200, "All"]
      ],
      pageLength: 10
    });

    return () => {
      if ($.fn.DataTable.isDataTable('#example')) {
        table.destroy();
      }
    };

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
              <div className="SOL-page-title text-center">
                <span> Team Matching Bonus</span>
              </div>

              <div className="row justify-content-center mb-3">
                <div className="col-md-4 col-lg-4 col-12">
                  <div className="meme-earning-wrapper">
                    <div className="meme-earning-tab">
                      <img src={`${import.meta.env.BASE_URL}img/solana-icon.png`} className="me-1" />
                      Total Income: {userData?.directIncome ?? 0} SOL
                    </div>
                  </div>
                </div>
              </div>

              <div className="table-responsive table-style">
                <table className="table" id="example">
                  <thead>
                    <tr>
                      <th>Rank Name</th>
                      <th>Matching Pair</th>
                      <th>Matching Bonus</th>
                      <th>Date</th>
                      <th>Release Date</th>
                    </tr>
                  </thead>
                </table>
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
      <div className="modal fade bd-example-modal-lg" id="paydetails" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">

            <footer>
              MemeRadar © 2026. All Rights Reserved.
            </footer>

            <div className="sec-divider top"></div>
            <div className="sec-divider bottom"></div>

            {/* Modal body same */}

          </div>
        </div>
      </div>


    </>
  )
}

export default MatchingBonus