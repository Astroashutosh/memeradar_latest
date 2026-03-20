import { useState, useEffect } from 'react'
import loading from '/img/green-loading.gif'
import Sidebar from '../../components/layout/smartContract/Sidebar'
import checkIcon from '/img/white-check-icon.png'
import { useWallet } from "../../solana/context/WalletContext";
import { getUserData,getPoolIncome ,packages } from "../../solana/program";
// import { notifySuccess, notifyError } from "../../solana/context/Notifications";
import UpgradeModal from "../../components/modal/UpgradeModal";
import { useUpgrade } from '../../solana/context/UpgradeContext';
function PoolBonus() {
  const { wallet } = useWallet();
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [poolData, setPoolData] = useState<Record<number, any>>({});
    const { handleUpgrade, upgrading } = useUpgrade();
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

    const user = await getUserData(wallet);
    setUserData(user);

    const pool = await getPoolIncome(wallet);

    let dataObj: any = {};

    for (let pkg = 2; pkg <= 10; pkg++) {
      dataObj[pkg] = {
        income: pool[pkg]?.total || 0,
        count: pool[pkg]?.count || 0
      };
    }

    setPoolData(dataObj);
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
              <div className="SOL-page-title text-center"><span>Team Pool Bonus</span></div>
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
                      <th>Level</th>
                      <th>Ranks</th>
                      <th>Income</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                 

<tbody>
  {Array.from({ length: 9 }, (_, i) => {
    const level = i + 2;
    const pkg = level;

    const row = poolData[pkg] || { income: 0, count: 0 };

    // const required = pkg * 4; 
    const required = (pkg - 1) * 4;

    const isUnlocked = row.count >= required;

    return (
      <tr key={level} className={isUnlocked ? "bg-success" : ""}>
        <td>{level}</td>
        <td>{packages[pkg - 1]?.name}</td>

    <td>{Number(row.income || 0).toFixed(2)} SOL</td>

        <td>
          {isUnlocked ? (
            <img src={checkIcon} width="20" />
          ) : (
            <img src={loading} width="20" />
          )}
        </td>
      </tr>
    );
  })}

  {/* TOTAL */}
  <tr>
    <td><strong className="text-warning">Total</strong></td>
    <td></td>
    <td>
      <strong className="text-success">
        {Object.values(poolData)
      .reduce((sum: number, r: any) => sum + Number(r.income || 0), 0)
          .toFixed(2)} SOL
      </strong>
    </td>
    <td></td>
  </tr>
</tbody>


                </table>
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

export default PoolBonus