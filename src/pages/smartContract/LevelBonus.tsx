import { useState, useEffect } from 'react'
import Sidebar from '../../components/layout/smartContract/Sidebar'
import { useWallet } from "../../solana/context/WalletContext";
import {  getUserData,getLevelPartners,getLevelIncome } from "../../solana/program";
// import { notifySuccess, notifyError } from "../../solana/context/Notifications";
import UpgradeModal from "../../components/modal/UpgradeModal";
import { useUpgrade } from '../../solana/context/UpgradeContext';
import { Link } from 'react-router-dom';


function LevelBonus() {
  const { wallet } = useWallet();
    const { handleUpgrade, upgrading } = useUpgrade();
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [levelCounts, setLevelCounts] = useState<number[]>([]);
const [levelIncome, setLevelIncome] = useState<Record<number, number>>({});
  const handleOpenUpgrade = (pkg: any) => {
    setSelectedPackage(pkg);
  };
  // useEffect(() => {

  //   const load = async () => {
  //     if (!wallet) return;
  //     const data = await getUserData(wallet);
  //     if (data) {
  //       setUserData(data);
  //     }
  //   };

  //   load();
  // }, [wallet]);


useEffect(() => {
  const load = async () => {
    if (!wallet) return;

    const levels = await getLevelPartners(wallet, 10);

    const counts = levels.map((lvl) => lvl.length);
    setLevelCounts(counts);

    let incomeObj: any = {};

    for (let lvl = 2; lvl <= 10; lvl++) {
      const inc = await getLevelIncome(wallet, lvl);
      incomeObj[lvl] = inc;
    }

    setLevelIncome(incomeObj);

    const data = await getUserData(wallet);
    setUserData(data);
  };

  load();
}, [wallet]);



  // const handleUpgrade = async () => {

  //   if (!wallet) return;
  //   if (!selectedPackage) {
  //     notifyError("Select package first");
  //     return;
  //   }

  //   try {
  //     const registered = await checkUserRegistered(wallet);
  //     console.log("registered", registered);
  //     if (registered) {
  //       await upgradePackage(wallet, selectedPackage.id);
  //       notifySuccess("Package upgraded successfully");
  //     }

  //   } catch (err: any) {
  //     console.error(err);
  //     notifyError(err.message || "Upgrade failed");
  //   }

  // };
  return (
    <>
      <main>
        <div className="container-fluid">
          <div className="row">
            <Sidebar onUpgradeClick={handleOpenUpgrade} />
            <div className="col-lg-12 col-xl-9">
              <div className="SOL-page-title text-center"><span>Team Level Bonus</span></div>
              <div className="row justify-content-center mb-3">
                <div className="col-md-4 col-lg-4 col-12">
                  <div className="meme-earning-wrapper">
                    <div className="meme-earning-tab"><img src={`${import.meta.env.BASE_URL}img/solana-icon.png`} className="me-1" />Total
                      Income:
                      {/* {userData?.totalIncome ?? 0}  */}
                      {userData?.directIncome ?? 0}

                      SOL</div>
                  </div>
                </div>
              </div>
              <div className="table-responsive table-style">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Level</th>
                      <th>DBO's</th>
                      <th>Income</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  {/* <tbody>

                    <tr>
                      <td>2 </td>
                      <td>-</td>
                      <td>-</td>
                      <td> <a href="level-bonus-details.html" className="btn btn-primary btn-sm"><i
                        className="fa-regular fa-eye small me-1"></i>View</a>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>-</td>
                      <td>-</td>
                      <td> <a href="level-bonus-details.html" className="btn btn-primary btn-sm"><i
                        className="fa-regular fa-eye small me-1"></i>View</a>
                      </td>
                    </tr>
                    <tr>
                      <td>4 </td>
                      <td>- </td>
                      <td> - </td>
                      <td> <a href="level-bonus-details.html" className="btn btn-primary btn-sm"><i
                        className="fa-regular fa-eye small me-1"></i>View</a>
                      </td>
                    </tr>
                    <tr>
                      <td>5 </td>
                      <td>- </td>
                      <td> - </td>
                      <td> <a href="level-bonus-details.html" className="btn btn-primary btn-sm"><i
                        className="fa-regular fa-eye small me-1"></i>View</a>
                      </td>
                    </tr>
                    <tr>
                      <td>6 </td>
                      <td>- </td>
                      <td> - </td>
                      <td> <a href="level-bonus-details.html" className="btn btn-primary btn-sm"><i
                        className="fa-regular fa-eye small me-1"></i>View</a>
                      </td>
                    </tr>
                    <tr>
                      <td>7 </td>
                      <td>- </td>
                      <td> - </td>
                      <td> <a href="level-bonus-details.html" className="btn btn-primary btn-sm"><i
                        className="fa-regular fa-eye small me-1"></i>View</a>
                      </td>
                    </tr>
                    <tr>
                      <td>8 </td>
                      <td>- </td>
                      <td> - </td>
                      <td> <a href="level-bonus-details.html" className="btn btn-primary btn-sm"><i
                        className="fa-regular fa-eye small me-1"></i>View</a>
                      </td>
                    </tr>
                    <tr>
                      <td>9 </td>
                      <td>- </td>
                      <td> - </td>
                      <td> <a href="level-bonus-details.html" className="btn btn-primary btn-sm"><i
                        className="fa-regular fa-eye small me-1"></i>View</a>
                      </td>
                    </tr>
                    <tr>
                      <td>10 </td>
                      <td>- </td>
                      <td> - </td>
                      <td> <a href="level-bonus-details.html" className="btn btn-primary btn-sm"><i
                        className="fa-regular fa-eye small me-1"></i>View</a>
                      </td>
                    </tr>
                    <tr>
                      <td><strong>Total</strong> </td>
                      <td> </td>
                      <td><strong>0.00 SOL</strong></td>
                      <td> </td>
                    </tr>
                  </tbody> */}

<tbody>
  {Array.from({ length: 9 }, (_, i) => {
    const level = i + 2; // 2 se start
    const count = levelCounts[level - 1] || 0;
    const income = levelIncome[level] || 0;

    return (
      <tr key={level}>
        <td>{level}</td>
        <td>{count}</td>
        <td>{income.toFixed(2)} SOL</td>
        <td>
       <Link 
  to={`/levelbonusDetails/${level}`} 
  className="btn btn-primary btn-sm"
>
  <i className="fa-regular fa-eye small me-1"></i>View
</Link>
        </td>
      </tr>
    );
  })}

  <tr>
    <td><strong>Total</strong></td>
    <td></td>
    <td>
      <strong>
        {Object.values(levelIncome).reduce((a: any, b: any) => a + b, 0).toFixed(2)} SOL
      </strong>
    </td>
    <td></td>
  </tr>
</tbody>


                </table>
              </div>

              <div className="mt-3 text-muted fw-light">
                <u>To qualify for this bonus:</u>
                <ul>
                  <li>You must hold the rank of Advisor or above and have at least two direct referrals.</li>
                  <li> Please note that a minimum self-rank equal to or higher than the required rank is mandatory to unlock
                    the Team Level Bonus.</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </main>
      {/* <UpgradeModal
        selectedPackage={selectedPackage}
        onUpgrade={handleUpgrade}
      /> */}
<UpgradeModal
  selectedPackage={selectedPackage}
  onUpgrade={() =>
    handleUpgrade(wallet, selectedPackage, () => {
      // 🔥 optional refresh
      window.location.reload();
    })
  }
  upgrading={upgrading}
/>

    </>
  )
}

export default LevelBonus