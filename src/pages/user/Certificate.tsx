import { Link } from 'react-router-dom'
// import Sidebar from '../../components/layout/smartContract/Sidebar'
import { useWallet } from '../../solana/context/WalletContext';
import { useEffect, useState } from 'react';
import { getUserData,packages } from '../../solana/program';
import Sidebar from '../../components/layout/smartContract/Sidebar';
import { useUpgrade } from '../../solana/context/UpgradeContext';
import UpgradeModal from '../../components/modal/UpgradeModal';


function Certificate() {
  
const { wallet } = useWallet();
const [userPackage, setUserPackage] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const { handleUpgrade, upgrading } = useUpgrade();
  
  const handleOpenUpgrade = (pkg: any) => {
    setSelectedPackage(pkg);
  };

useEffect(() => {
  const loadUser = async () => {
    if (!wallet) return;

    const data = await getUserData(wallet);
    if (data) {
      setUserPackage(data.currentPackage);
    }
  };

  loadUser();
}, [wallet]);

  return (
    <>
    
    
  <main>
    <div className="container-fluid">
      <div className="row">
                <Sidebar onUpgradeClick={handleOpenUpgrade} />

        <div className="col-lg-12 col-xl-9">
          <div className="SOL-page-title text-center"><span>Rank Certificates</span></div>
          <div className="text-center mb-3">The rank certificate is available exclusively to those with Silver rank or
            above.
            Please upgrade your ID to access and download your certificate.</div>

          <div className="row justify-content-center">
            {/* <div className="col-sm-3 mb-3">
              <div className="style-wrapper text-center ">
                <div className="mb-2">
                  <img src={`${import.meta.env.BASE_URL}img/rank-ribbon.png`}/>
                </div>
                <h4 className="mb-2">Silver Rank </h4>
                <Link to="/certificateDownload" target="_blank" className="btn btn-primary">
                  <i className="fa-regular fa-download me-1"></i>Download Certificate
                </Link>
              </div>
            </div> */}



{packages
  .filter(pkg => pkg.id >= 4) 
  .map((pkg) => (
    <div className="col-sm-3 mb-3" key={pkg.id}>
      <div className="style-wrapper text-center">
        <div className="mb-2">
          <img src={`${import.meta.env.BASE_URL}img/rank-ribbon.png`} />
        </div>

        <h4 className="mb-2">{pkg.name} Rank</h4>

        {userPackage >= pkg.id ? (
          <Link
            to="/certificateDownload"
            target="_blank"
            className="btn btn-primary"
          >
            <i className="fa-regular fa-download me-1"></i>
            Download Certificate
          </Link>
        ) : (
          <button className="btn btn-primary disabled">
            <i className="fa-regular fa-download me-1"></i>
            Locked
          </button>
        )}
      </div>
    </div>
))}


            {/* <div className="col-sm-3 mb-3">
              <div className="style-wrapper text-center ">
                <div className="mb-2">
                  <img src={`${import.meta.env.BASE_URL}img/rank-ribbon.png`}/>
                </div>
                <h4 className="mb-2">Gold Rank </h4>
                <Link to="/certificateDownload" target="_blank" className="btn btn-primary">
                  <i className="fa-regular fa-download me-1"></i>Download Certificate
                </Link>
              </div>
            </div>


            <div className="col-sm-3 mb-3">
              <div className="style-wrapper text-center ">
                <div className="mb-2">
                  <img src={`${import.meta.env.BASE_URL}img/rank-ribbon.png`}/>
                </div>
                <h4 className="mb-2">Platinum Rank </h4>
                <Link to="#1" target="_blank" className="btn btn-primary disabled">
                  <i className="fa-regular fa-download me-1"></i>Download Certificate
                </Link>
              </div>
            </div>
            <div className="col-sm-3 mb-3">
              <div className="style-wrapper text-center ">
                <div className="mb-2">
                  <img src={`${import.meta.env.BASE_URL}img/rank-ribbon.png`}/>
                </div>
                <h4 className="mb-2">Sapphire Rank </h4>
                <Link to="#1" target="_blank" className="btn btn-primary disabled">
                  <i className="fa-regular fa-download me-1"></i>Download Certificate
                </Link>
              </div>
            </div>
            <div className="col-sm-3 mb-3">
              <div className="style-wrapper text-center ">
                <div className="mb-2">
                  <img src={`${import.meta.env.BASE_URL}img/rank-ribbon.png`}/>
                </div>
                <h4 className="mb-2">Diamond Rank </h4>
                <Link to="#1" target="_blank" className="btn btn-primary disabled">
                  <i className="fa-regular fa-download me-1"></i>Download Certificate
                </Link>
              </div>
            </div>
            <div className="col-sm-3 mb-3">
              <div className="style-wrapper text-center ">
                <div className="mb-2">
                  <img src={`${import.meta.env.BASE_URL}img/rank-ribbon.png`}/>
                </div>
                <h4 className="mb-2">Director Rank </h4>
                <Link to="#1" target="_blank" className="btn btn-primary disabled">
                  <i className="fa-regular fa-download me-1"></i>Download Certificate
                </Link>
              </div>
            </div>
            <div className="col-sm-3 mb-3">
              <div className="style-wrapper text-center ">
                <div className="mb-2">
                  <img src={`${import.meta.env.BASE_URL}img/rank-ribbon.png`}/>
                </div>
                <h4 className="mb-2">President Rank </h4>
                <Link to="#1" target="_blank" className="btn btn-primary disabled">
                  <i className="fa-regular fa-download me-1"></i>Download Certificate
                </Link>
              </div>
            </div> */}

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
  )
}

export default Certificate