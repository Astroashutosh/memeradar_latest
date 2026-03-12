import { useState, useEffect } from 'react'
import { useWallet } from "../../solana/context/WalletContext";
import { getLevelPartners, packages, shorten } from "../../solana/program";

function NetworkTeam() {
  const { wallet } = useWallet();
  const [levelPartners, setLevelPartners] = useState<any[][]>([]);
  const [selectedLevel, setSelectedLevel] = useState(1);
  useEffect(() => {
  const loadLevels = async () => {
    if (!wallet) return;
    const levels = await getLevelPartners(wallet, 5);
    console.log(levels);
    setLevelPartners(levels);
  };

  loadLevels();
}, [wallet]);
const users = levelPartners[selectedLevel - 1] || [];
  return (
    <>
    
      <main>
    <div className="container-fluid">
      <div className="row">

        <div className="col-lg-12 col-xl-12">
          <div className="SOL-page-title text-center"><span>My Network Team</span></div>
          <div className="row justify-content-between mb-3">
            <div className="col-lg-3 col-6">
              <label>Select Level</label>
              <select value={selectedLevel} onChange={(e) => setSelectedLevel(Number(e.target.value))}>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i+1} value={i+1}>
                    {i+1}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-lg-3 col-6 text-end"> Total DBO's: {users.length}
            </div>
          </div>
          <div className="table-responsive table-style">
            <table className="table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>DBO ID</th>
                  <th>Wallet Address</th>
                  <th>Registration Date</th>
                  <th>Package</th>
                  <th>Level</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center">No Users</td>
                  </tr>
                ) : (
                  users.map((user: any, index: number) => (
                    <tr key={user.wallet}>
                      <td>{index + 1}</td>
                      <td>-</td>
                      <td>{user.id}</td>
                      <td>
                        <a href="#!">{shorten(user.wallet)}</a>
                      </td>
                      <td>-</td>
                      <td>{packages[user.package - 1]?.name || "-"}</td>
                      <td>{selectedLevel}</td>
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

        </div>
      </div>
    </div>
  </main>
    
    </>
  )
}

export default NetworkTeam