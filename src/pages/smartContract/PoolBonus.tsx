import { useState, useEffect } from 'react'
import loading from '/img/green-loading.gif'
import Sidebar from '../../components/layout/smartContract/Sidebar'
import checkIcon from '/img/white-check-icon.png'
import { useWallet } from "../../solana/context/WalletContext";
import { checkUserRegistered, upgradePackage, getUserData } from "../../solana/program";
import { notifySuccess, notifyError } from "../../solana/context/Notifications";
import UpgradeModal from "../../components/modal/UpgradeModal";
function PoolBonus() {
  const { wallet } = useWallet();
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
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

                    <tr className="bg-success">
                      <td>2 </td>
                      <td>Advisor  </td>
                      <td>0</td>
                      <td><img src={checkIcon} width="20" /></td>
                    </tr>
                    <tr>
                      <td>3 </td>
                      <td>Bronze </td>
                      <td>0</td>

                      <td><img src={loading} className="rounded-circle" width="20" /></td>
                    </tr>
                    <tr>
                      <td>4 </td>
                      <td>Silver </td>
                      <td>0 </td>
                      <td><img src={loading} className="rounded-circle" width="20" /></td>
                    </tr>
                    <tr>
                      <td>5 </td>
                      <td>Gold </td>
                      <td>0 </td>
                      <td><img src={loading} className="rounded-circle" width="20" /></td>
                    </tr>

                    <tr>
                      <td>6 </td>
                      <td>Platinum </td>
                      <td>0 </td>
                      <td><img src={loading} className="rounded-circle" width="20" /></td>
                    </tr>

                    <tr>
                      <td>7 </td>
                      <td>Sapphire </td>
                      <td>0 </td>
                      <td> - </td>
                    </tr>

                    <tr>
                      <td>8 </td>
                      <td>Diamond </td>

                      <td>0 </td>
                      <td> - </td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td>Director </td>

                      <td>0 </td>
                      <td> - </td>
                    </tr>
                    <tr>
                      <td>10 </td>
                      <td>President </td>

                      <td>0 </td>
                      <td> - </td>
                    </tr>
                    <tr>
                      <td><strong className="text-warning">Total</strong> </td>
                      <td></td>
                      <td><strong className="text-success">0.00 SOL</strong></td>

                      <td> </td>
                    </tr>
                  </tbody>
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

    </>
  )
}

export default PoolBonus