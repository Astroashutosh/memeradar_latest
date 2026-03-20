import { useState, useEffect } from 'react'
import iconGreen from '/img/tree-icon/green.png'
import iconRed from '/img/tree-icon/red.png'
import iconBlack from '/img/tree-icon/blank.png'
import { useWallet } from "../../solana/context/WalletContext";
import { getBinaryTree, packages, getUserData } from "../../solana/program";
import iconGold from '/img/tree-icon/golden.png'
import { getProgram } from '../../solana/anchor';
function TeamTree() {
  const { wallet } = useWallet();
  const [userData, setUserData] = useState<any>(null);
  // const [userData, setUserData] = useState<any>(null);
  const [tree, setTree] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [day, setDay] = useState("2");
  const [month, setMonth] = useState("December");
  const [year, setYear] = useState("2026");

  const leftMP = userData?.leftVolume ?? 0;
  const rightMP = userData?.rightVolume ?? 0;

  const carryLeft = userData?.carryLeft ?? 0;
  const carryRight = userData?.carryRight ?? 0;

  const totalLeftMP = leftMP - carryLeft;
  const totalRightMP = rightMP - carryRight;
const [selectedUser, setSelectedUser] = useState<any>(null);
// const [modalLoading, setModalLoading] = useState(false);
const [searchId, setSearchId] = useState("");

const openUserModal = async (walletAddr: string | null) => {
  if (!walletAddr) return;

  // setModalLoading(true);

  try {
    const data = await getUserData(walletAddr);

    setSelectedUser({
      wallet: walletAddr,
      ...data
    });

    // open modal
    const modal = new window.bootstrap.Modal(
      document.getElementById("treeInformation")
    );
    modal.show();

  } catch (err) {
    console.error("Modal load error:", err);
  }

  // setModalLoading(false);
};

// modal end
  useEffect(() => {

    loadTree();
  }, [wallet]);

// Date filter
useEffect(() => {
  const today = new Date();

  setDay(today.getDate().toString());
  setMonth(today.toLocaleString("default", { month: "long" }));
  setYear(today.getFullYear().toString());
}, []);


const loadTree = async (targetWallet?: string) => {

  const useWalletAddr = targetWallet || wallet;

  if (!useWalletAddr) return;

  setLoading(true);

  try {
    const user = await getUserData(useWalletAddr);
    setUserData(user);

    const treeData = await getBinaryTree(useWalletAddr);
    setTree(treeData);

  } catch (err) {
    console.error("Tree load error:", err);
  }

  setLoading(false);
};

const node = (user?: any) => {

  if (!user || user.id === "-" || user.id === undefined) {
    return {
      icon: iconBlack,
      id: "-",
      rank: "Vacant",
      className: "my-member",
      wallet: null,
      textColor: "#999"
    };
  }

  const pkg = user.package;
  const rankName = packages[pkg - 1]?.name || "No rank";

  // 🟢 Silver+
  if (pkg >= 4) {
    return {
      icon: iconGreen,
      id: user.id,
      rank: rankName,
      className: "my-member green",
      wallet: user.wallet,
      textColor: "#28a745" 
    };
  }

  if (pkg >= 1 && pkg <= 3) {
    return {
      icon: iconGold,
      id: user.id,
      rank: rankName,
      className: "my-member gold",
      wallet: user.wallet,
      textColor: "#f1c40f" // gold
    };
  }

  // 🔴 Free DBO
  return {
    icon: iconRed,
    id: user.id,
    rank: "Free DBO",
    className: "my-member myFreeID",
    wallet: user.wallet,
    textColor: "#dc3545" // red
  };
};



  if (loading) {
    return <div className="text-center p-5">Loading Tree...</div>;
  }

  // const L = node(tree?.left);
  // const R = node(tree?.right);

  // const LL = node(tree?.leftLeft);
  // const LR = node(tree?.leftRight);

  // const RL = node(tree?.rightLeft);
  // const RR = node(tree?.rightRight);
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = ["2026", "2025"];


const handleSearch = async () => {
  if (!searchId) return;

  try {
    const program = getProgram();

    const accounts = await program.account.userAccount.all();

    const found = accounts.find(
      (acc: any) => acc.account.id.toNumber().toString() === searchId
    );

    if (!found) {
      alert("User not found");
      return;
    }

    // const walletAddr = found.account.wallet.toBase58();
const walletAddr = (found.account.wallet as any).toBase58();
    loadTree(walletAddr);

  } catch (err) {
    console.error(err);
  }
};


  return (
    <>

      <main>
        <div className="container-fluid">
          <div className="row">
          

<div className="col-lg-8 col-xl-8">
  <div className="SOL-page-title text-center">
    <span>My Team Tree </span>
  </div>

  <div className="display-wrapper">

    {/* 🔍 SEARCH + BUTTON SAME */}
    <div className="row">
      <div className="col-lg-12 mx-auto">
        <div className="search-container mb-3">
          <div className="row">
            <div className="col-md-8 col-lg-8 col-xl-9 pe-md-0 pe-xl-0 pe-lg-0">
              <div className="search-id-wrapper mb-2 mb-md-0 mb-lg-0">
                {/* <input placeholder="Enter DBO ID" /> */}
                <input
  placeholder="Enter DBO ID"
  value={searchId}
  onChange={(e) => setSearchId(e.target.value)}
/>
                {/* <a className="search-icon"><i className="bi bi-search"></i></a> */}
                <a
  className="search-icon"
  onClick={(e) => {
    e.preventDefault();
    handleSearch();
  }}
>
  <i className="bi bi-search"></i>
</a>
              </div>
            </div>

            <div className="col-md-4 col-lg-4 col-xl-3 text-center">
              <a
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  // loadTree(wallet);
                  if (wallet) {
  loadTree(wallet);
}
                }}

                className="btn btn-outline-dark text-white float-start w-50"
              >
                <i className="bi bi-arrow-90deg-up me-1"></i>TOP
              </a>

              <a href="#!" className="btn btn-outline-dark text-white float-end w-50">
                <i className="bi bi-arrow-bar-up me-1"></i>UPLINE
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* ROOT */}
    <div className="row">
      <div className="col-sm-2 col-4 mx-auto">
        <div className="my-team">
          <div className="center-border"></div>

          {(() => {
            const root = node(tree?.root);
            return (
              <div className={root.className}>
                <a href="#" 
                // onClick={(e) => {
                //   e.preventDefault();
                //   loadTree(root.wallet);
                // }}
               onClick={(e) => {
  e.preventDefault();
  openUserModal(root.wallet);
}}
                >
                  <img src={root.icon} />
                  <span>{root.id}</span>
                  <div className="my-member-rank">{root.rank}</div>
                </a>
              </div>
            );
          })()}

        </div>
      </div>
    </div>

    {/* LEVEL 1 */}
    <div className="row">
      <div className="col-6 col-sm-6">
        <div className="my-team">
          <div className="center-border"></div>
          <div className="right-border"></div>

          {(() => {
            const n = node(tree?.left);
            return (
              <div className={n.className}>
                <a href="#" 
                // onClick={(e) => {
                //   e.preventDefault();
                //   loadTree(n.wallet);
                // }}

                onClick={(e) => {
  e.preventDefault();
  openUserModal(n.wallet);
}}
                >
                  <img src={n.icon} />
                  <span>{n.id}</span>
                  <div className="my-member-rank">{n.rank}</div>
                </a>
              </div>
            );
          })()}

        </div>

        {/* LEFT CHILDREN */}
        <div className="row">
          <div className="col-6 col-sm-6">
            <div className="my-team">
              <div className="right-border"></div>

              {(() => {
                const n = node(tree?.leftLeft);
                return (
                  <div className={n.className}>
                    <a href="#"
                    //  onClick={(e) => {
                    //   e.preventDefault();
                    //   loadTree(n.wallet);
                    // }}
                    onClick={(e) => {
  e.preventDefault();
  openUserModal(n.wallet);
}}
                    >
                      <img src={n.icon} />
                      <span>{n.id}</span>
                      <div className="my-member-rank">{n.rank}</div>
                    </a>
                  </div>
                );
              })()}

            </div>
          </div>

          <div className="col-6 col-sm-6">
            <div className="my-team">
              <div className="my-member-left"></div>

              {(() => {
                const n = node(tree?.leftRight);
                return (
                  <div className={n.className}>
                    <a href="#" 
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   loadTree(n.wallet);
                    // }}
                    onClick={(e) => {
  e.preventDefault();
  openUserModal(n.wallet);
}}
                    >
                      <img src={n.icon} />
                      <span>{n.id}</span>
                      <div className="my-member-rank">{n.rank}</div>
                    </a>
                  </div>
                );
              })()}

            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="col-6 col-sm-6">
        <div className="my-team">
          <div className="center-border"></div>
          <div className="my-member-left"></div>

          {(() => {
            const n = node(tree?.right);
            return (
              <div className={n.className}>
                <a href="#" 
                // onClick={(e) => {
                //   e.preventDefault();
                //   loadTree(n.wallet);
                // }}
                onClick={(e) => {
  e.preventDefault();
  openUserModal(n.wallet);
}}
                >
                  <img src={n.icon} />
                  <span>{n.id}</span>
                  <div className="my-member-rank">{n.rank}</div>
                </a>
              </div>
            );
          })()}

        </div>

        <div className="row">
          <div className="col-6 col-sm-6">
            <div className="my-team">
              <div className="right-border"></div>

              {(() => {
                const n = node(tree?.rightLeft);
                return (
                  <div className={n.className}>
                    <a href="#" 
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   loadTree(n.wallet);
                    // }}

                    onClick={(e) => {
  e.preventDefault();
  openUserModal(n.wallet);
}}

                    >
                      <img src={n.icon} />
                      <span>{n.id}</span>
                      <div className="my-member-rank">{n.rank}</div>
                    </a>
                  </div>
                );
              })()}

            </div>
          </div>

          <div className="col-6 col-sm-6">
            <div className="my-team">
              <div className="my-member-left"></div>

              {(() => {
                const n = node(tree?.rightRight);
                return (
                  <div className={n.className}>
                    <a href="#"
                    //  onClick={(e) => {
                    //   e.preventDefault();
                    //   loadTree(n.wallet);
                    // }}
                    onClick={(e) => {
  e.preventDefault();
  openUserModal(n.wallet);
}}
                    >
                      <img src={n.icon} />
                      <span>{n.id}</span>
                      <div className="my-member-rank">{n.rank}</div>
                    </a>
                  </div>
                );
              })()}

            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

            <div className="col-lg-4 col-xl-4 mt-0 mt-lg-3">
              <div className="style-wrapper mb-3">
                <div className="badgeStyle text-center mb-2">
                  <h5>Matching Bonus details</h5>
                </div>

                <div className="row mt-3">
                  <div className="col-3 col-sm-3 pe-0">
                    <div className="sm-input-group">
                      <select value={day} onChange={(e) => setDay(e.target.value)}>
                        <option disabled>DD</option>
                        {days.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="col-3 col-sm-3 pe-0">
                    <div className="sm-input-group">
                      <select value={month} onChange={(e) => setMonth(e.target.value)}>
                        <option disabled>MM</option>
                        {months.map((m) => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="col-3 col-sm-3 pe-0">
                    <div className="sm-input-group">
                      <select value={year} onChange={(e) => setYear(e.target.value)}>
                        <option disabled>YYYY</option>
                        {years.map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="col-3 col-sm-3">
                    <div className="sm-input-group">
                      <a href="#!" className="btn btn-primary d-block">Search</a>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6 mt-2">
                    <div className="card-body p-2 bg-gradient-violet rounded">
                      <div className="d-flex justify-content-between">
                        <div className="text-white"> Left MP <br />Today's Left MP</div>
                        <div className="text-white  text-end"> {userData?.leftVolume ?? 0} <br />{leftMP}</div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="text-white">Carry Forward </div>
                        <div className="text-white">   +{userData?.carryLeft ?? 0}</div>
                      </div>
                      <div className="d-flex justify-content-between border-top">
                        <div className="text-warning">Total MP </div>
                        <div className="text-warning"> {totalLeftMP}</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 mt-2">
                    <div className="card-body p-2 bg-gradient-violet rounded">
                      <div className="d-flex justify-content-between">
                        <div className="text-white"> Right MP <br /> Today's Right MP</div>

                        <div className="text-white  text-end">{rightMP}<br />{rightMP}</div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="text-white">Carry Forward </div>
                        <div className="text-white"> +{carryRight}</div>
                      </div>
                      <div className="d-flex justify-content-between border-top">
                        <div className="text-warning">Total MP </div>
                        <div className="text-warning"> {totalRightMP}</div>
                      </div>
                    </div>
                  </div>


                </div>
              </div>

              <div className="row">
                <div className="col-lg-6 col-6 mt-2">
                  <div className="style-wrapper p-2 text-center">
                    <img src={iconGreen} className="rounded-circle" width="50" />

                    <div className="mt-2 small">Silver, Gold, Platinum, Sapphire, Diamond, Director, President</div>
                  </div>
                </div>
                <div className="col-lg-6 col-6 mt-2">
                  <div className="style-wrapper p-2 text-center">
                    <img src={`${import.meta.env.BASE_URL}img/tree-icon/golden.png`} className="rounded-circle" width="50" />

                    <div className="mt-2 small">Starter, Advisor, Bronze</div>
                  </div>
                </div>
                <div className="col-lg-6 col-6 mt-2">
                  <div className="style-wrapper p-2 text-center">
                    <img src={iconRed} className="rounded-circle" width="50" />
                    <div className="mt-2 small">Free DBO</div>

                  </div>
                </div>
                <div className="col-lg-6 col-6 mt-2">
                  <div className="style-wrapper p-2 text-center">
                    <img src={iconBlack} className="rounded-circle" width="50" />
                    <div className="mt-2 small">Vacant</div>

                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
{/* {modalLoading ? (
  <div className="text-center p-3">Loading...</div>
) : (
  <> */}
  <div className="modal fade" id="treeInformation" >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <span className="modalWindow-close" data-bs-dismiss="modal" aria-label="Close"></span>

        <div className="modal-body">
          <div className="sec-divider top"> </div>
          <div className="sec-divider bottom"> </div>

          <div className="badgeStyle text-center mb-2">
            <h5>DBO ID: {selectedUser?.userId || "-"}</h5>
          </div>
          <div className="table-responsive table-style mb-2">
            <table className="table">
              <thead>
                <tr>
                  <th> Reg. Date </th>
                  <th> Rank </th>
                  <th> Invited By </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedUser?.joinedAt || "-"} </td>
                  <td>  {packages.find(p => p.id === selectedUser?.currentPackage)?.name || "DBO"}</td>
                  <td>{selectedUser?.sponsorId || "-"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="badgeStyle text-center mb-2">
            <h5 className="bg-gradient-violet">Total Network</h5>
          </div>
          <div className="table-responsive table-style mb-2">
            <table className="table">
              <thead>
                <tr>
                  <th> Activation </th>
                  <th> Left </th>
                  <th> Right </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Active </td>
                  <td>{selectedUser?.leftVolume || 0}</td>
                  <td>{selectedUser?.rightVolume || 0}</td>
                </tr>
                <tr>
                  <td>Free </td>
                  <td>200</td>
                  <td>145 </td>
                </tr>
                <tr>
                  <td>Matching Points </td>
                  <td>652</td>
                  <td>160 </td>
                </tr>
              </tbody>
            </table>
          </div>

<div className="text-center mt-3">
  <button
    className="btn btn-primary"
    onClick={() => {
      if (selectedUser?.wallet) {
        loadTree(selectedUser.wallet);
        
        // close modal
        const modal = window.bootstrap.Modal.getInstance(
          document.getElementById("treeInformation")
        );
        modal.hide();
      }
    }}
  >
    View Downline
  </button>
</div>

        </div>

      </div>
    </div>
  </div> 
  {/* </>
)} */}
    </>
  )
}

export default TeamTree


