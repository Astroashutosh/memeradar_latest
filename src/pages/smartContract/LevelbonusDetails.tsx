import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/layout/smartContract/Sidebar";
import { useWallet } from "../../solana/context/WalletContext";
import { getLevelBonusDetails, packages, shorten } from "../../solana/program";
import { useUpgrade } from "../../solana/context/UpgradeContext";
import UpgradeModal from "../../components/modal/UpgradeModal";
import { copyToClipboard } from "../../utils/helpers";

function LevelbonusDetails() {

  const { level } = useParams();
  const navigate = useNavigate();
  const { wallet } = useWallet();

  const { handleUpgrade, upgrading } = useUpgrade();
  const [selectedPackage, setSelectedPackage] = useState<any>(null);

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleOpenUpgrade = (pkg: any) => {
    setSelectedPackage(pkg);
  };

  useEffect(() => {
    if (!wallet || !level) return;

    const loadData = async () => {
      setLoading(true);

      const res = await getLevelBonusDetails(wallet, Number(level));
      setData(res);

      setLoading(false);
    };

    loadData();

  }, [wallet, level]);

  const totalIncome = data.reduce((sum, r) => sum + Number(r.amount || 0), 0);

  return (
    <>
      <main>
        <div className="container-fluid">
          <div className="row">

            <Sidebar onUpgradeClick={handleOpenUpgrade} />

            <div className="col-lg-12 col-xl-9">

              {/* HEADER */}
              <div className="SoLbodyheader mb-3">
                <div 
                  className="backBtn"
                  onClick={() => navigate(-1)}
                >
                  <i className="fa-regular fa-angle-left"></i>
                </div>

                <h4>Level {level}</h4>
              </div>

              {/* TOTAL */}
              <div className="row justify-content-center">
                <div className="col-md-4 col-lg-4 col-12">
                  <div className="sol-point-box mb-2 mt-0">
                    <h4>{totalIncome.toFixed(4)} SOL</h4>
                    <small>Total Income</small>
                  </div>
                </div>
              </div>

              {/* TABLE */}
              <div className="table-responsive table-style">
                <table className="table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>DBO ID</th>
                      <th>Package</th>
                      <th>Address</th>
                      <th>Date</th>
                      <th>Income</th>
                    </tr>
                  </thead>

                  <tbody>

                    {loading ? (
                      <tr>
                        <td colSpan={7} className="text-center">Loading...</td>
                      </tr>
                    ) : data.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center">No Data</td>
                      </tr>
                    ) : (

                      data.map((row, index) => {

                        const pkgName =
                          packages.find(p => p.id === Number(row.package))?.name || "-";

                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>

                            <td>User</td>

                            <td>{row.user_id || "-"}</td>

                            <td>{pkgName}</td>

                            <td className="nowrap">
                              {shorten(row.from)}

                              {/* COPY */}
                              {/* <a
                                href="#!"
                                className="ms-2"
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigator.clipboard.writeText(row.from);
                                }}
                              >
                                <i className="bi bi-copy"></i>
                              </a> */}
<a
  href="#!"
  className="ms-2"
  onClick={(e) => {
    e.preventDefault();
    copyToClipboard(row.from, "Address copied");
  }}
>
  <i className="bi bi-copy"></i>
</a>
                              {/* OPEN */}
                              <a
                                href={`https://solscan.io/account/${row.from}`}
                                target="_blank"
                                className="ms-2"
                              >
                                <i className="bi bi-box-arrow-up-right"></i>
                              </a>
                            </td>

                            <td>{row.datetime}</td>

                            <td>{Number(row.amount).toFixed(4)} SOL</td>
                          </tr>
                        );
                      })

                    )}

                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </main>

      <UpgradeModal
        selectedPackage={selectedPackage}
        onUpgrade={() =>
          handleUpgrade(wallet, selectedPackage, () => {
            window.location.reload();
          })
        }
        upgrading={upgrading}
      />
    </>
  );
}

export default LevelbonusDetails;