import { useState, useEffect } from 'react'
import Sidebar from '../../components/layout/smartContract/Sidebar'
import { useWallet } from "../../solana/context/WalletContext";
import { getIncomeEvents, checkUserRegistered, upgradePackage, getUserData, packages, shorten, getUserId } from "../../solana/program";
import { notifySuccess, notifyError } from "../../solana/context/Notifications";
import UpgradeModal from "../../components/modal/UpgradeModal";

function SponsorBonus() {
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
      const data = await getUserData(wallet);
      if (data) {
        setUserData(data);
      }
      setLoading(true);
      const events = await getIncomeEvents();
      const sponsor = events.filter(
        (e: any) =>
          e.incomeType?.sponsor !== undefined &&
          e.user.toBase58() === wallet
      );
      // console.log("sponsor",sponsor);
      const enriched = await Promise.all(
        sponsor.map(async (e: any) => {
          const fromWallet = e.from.toBase58();
          const dboId = await getUserId(fromWallet);

          return {
            ...e,
            dboId,
          };
        })
      );
      setRows(enriched);
      // const data = await getUserData(wallet);
      // if (data) {
      //   setUserData(data);
      // }
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
              <div className="SOL-page-title text-center"><span>Team Sponsor Bonus</span></div>

              <div className="row justify-content-center mb-3">
                <div className="col-md-4 col-lg-4 col-12">
                  <div className="meme-earning-wrapper">
                    <div className="meme-earning-tab"><img src={`${import.meta.env.BASE_URL}img/solana-icon.png`} className="me-1" />Total
                      Income: {userData?.directIncome ?? 0}  SOL</div>
                  </div>
                </div>
              </div>
              <div className="table-responsive table-style">
                <table className="table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>DBO ID</th>
                      <th>Current Rank</th>
                      <th>Address</th>
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
                    ) : (rows.map((row, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{row.dboId}</td>
                        <td>{packages[row.from.package - 1]?.name || "-"}</td>
                        <td className="nowrap">{shorten(row.from.toBase58())}<a href="#!" className="ms-2" title="Copy Address"><i
                          className="bi bi-copy"></i></a><a href="#!" className="ms-2" title="Open Address"><i
                            className="bi bi-box-arrow-up-right"></i></a></td>

                        <td>{row.amount.toNumber() / 1e9} SOL
                          {/* <a href="#!" className="btn btn-primary btn-sm ms-1" data-bs-toggle="modal"
                        data-bs-target="#paydetails">Details</a> */}
                        </td>
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
                Note: A minimum Self same rank or higher rank is required to unlock higher referral bonuses.
              </div>

            </div>
          </div>
        </div>
      </main>
      <UpgradeModal
        selectedPackage={selectedPackage}
        onUpgrade={handleUpgrade}
      />


      <div className="modal fade bd-example-modal-lg" id="paydetails" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered modal-lg">

          <div className="modal-content">
            <div className="modal-body">
              <div className="sec-divider top"> </div>
              <div className="sec-divider bottom"> </div>

              <h5 className="text-center"><small>DBO ID: 111560880142</small> <br /> <span className="text-success">0.65 SOL</span>
              </h5>
              <div className="col-large-five">
                <div className="row ">
                  <div className="col-6 col-lg-3">
                    <div className="pack_amt_details">
                      <h5>Starter</h5>
                      <div className="pack_amt_total">0.25 SOL</div>
                      <small>03-02-2026 15:20</small>
                    </div>
                  </div>
                  <div className="col-6 col-lg-3">
                    <div className="pack_amt_details">
                      <h5>Advisor</h5>
                      <div className="pack_amt_total">-</div>
                      <small>-</small>
                    </div>
                  </div>
                  <div className="col-6 col-lg-3">
                    <div className="pack_amt_details">
                      <h5>Bronze</h5>
                      <div className="pack_amt_total">-</div>
                      <small>-</small>
                    </div>
                  </div>
                  <div className="col-6 col-lg-3">
                    <div className="pack_amt_details">
                      <h5>Silver</h5>
                      <div className="pack_amt_total">-</div>
                      <small>-</small>
                    </div>
                  </div>
                  <div className="col-6 col-lg-3">
                    <div className="pack_amt_details">
                      <h5>Gold</h5>
                      <div className="pack_amt_total">-</div>
                      <small>-</small>
                    </div>
                  </div>

                  <div className="col-6 col-lg-3">
                    <div className="pack_amt_details">
                      <h5>Platinum</h5>
                      <div className="pack_amt_total">-</div>
                      <small>-</small>
                    </div>
                  </div>


                  <div className="col-6 col-lg-3">
                    <div className="pack_amt_details">
                      <h5>Sapphire</h5>
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
                      <h5>Director</h5>
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

export default SponsorBonus