import { useState, useEffect } from 'react';
import loading from '/img/green-loading.gif';
import CheckIcon from '/img/check-icon.png';
import { useWallet } from "../../solana/context/WalletContext";
import {getUserData, packages } from "../../solana/program";
function MatrixTree() {
  const { wallet } = useWallet();
  const [levelCounts, setLevelCounts] = useState<number[]>([]);
  const [loadingLevels, setLoadingLevels] = useState(true);
  // useEffect(() => {
  //   if (!wallet) return;
  //   const fetchMatrix = async () => {
  //     setLoadingLevels(true);
  //     const levels = await getLevelPartners(wallet, packages.length);
  //     const counts = levels.map((lvl) => lvl.length);
  //     setLevelCounts(counts);
  //     setLoadingLevels(false);
  //   };

  //   fetchMatrix();
  // }, [wallet]);


useEffect(() => {
  if (!wallet) return;

  const fetchMatrix = async () => {
    setLoadingLevels(true);

    const user = await getUserData(wallet);

    if (user) {
      const totalUsers = user.totalMatrixTeam || 0;

      let counts = [];
      let remaining = totalUsers;

      for (let i = 1; i <= packages.length; i++) {
        const maxAtLevel = Math.pow(2, i);

        const levelCount = Math.min(remaining, maxAtLevel);
        counts.push(levelCount);

        remaining -= levelCount;
        if (remaining <= 0) break;
      }

      setLevelCounts(counts);
    }

    setLoadingLevels(false);
  };

  fetchMatrix();
}, [wallet]);

  return (
    <>
    
     <main>
    <div className="container-fluid">
      <div className="row">
         
        <div className="col-lg-12 col-xl-12">
          <div className="SOL-page-title text-center"><span>My  Matrix Tree</span></div> 
          <div className="table-responsive table-style">
            <table className="table">
            <thead>
              <tr>
                <th style={{ width: "25%" }}>Tier</th>
                <th style={{ width: "25%" }}>Matrix Tree</th>
                <th style={{ width: "26%" }} colSpan={2}>Matrix Status</th>
                <th style={{ width: "24%" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg, idx) => {
                const userCount = levelCounts[idx] ?? 0;
                // const maxUsers = Math.pow(2, pkg.id);
                const maxUsers = Math.pow(2, pkg.id);
                let statusIcon;
                // if (userCount === 0) {
                //   statusIcon = "-";
                // } else if (userCount === maxUsers) {
                //   statusIcon = <img src={CheckIcon} width="20" />;
                // } else {
                //   statusIcon = <img src={loading} width="20" />;
                // }

if (userCount === 0) {
  statusIcon = "-";
} else if (userCount === maxUsers) {
  statusIcon = <img src={CheckIcon} width="20" />;
} else {
  statusIcon = <img src={loading} width="20" />;
}

                return (
                  <tr key={pkg.id}>
                    <td>{pkg.id}</td>
                    <td>{maxUsers}</td>
                    <td width="13%">{userCount}</td>
                    <td width="13%">{loadingLevels ? <img src={loading} width="20" /> : statusIcon}</td>
                    <td>
                      {userCount > 0 ? (
                        <a href="matrix-tree-details.html" className="btn btn-primary btn-sm">View</a>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                );
              })}
              
              
            </tbody>
          </table>
          </div> 

        </div>
      </div>
    </div>
  </main>

    
    </>
  )
}

export default MatrixTree