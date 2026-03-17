import { useState, useEffect } from 'react'
import iconGreen from '/img/tree-icon/green.png'
import iconRed from '/img/tree-icon/red.png'
import iconBlack from '/img/tree-icon/blank.png'
import { useWallet } from "../../solana/context/WalletContext";
import { getBinaryTree, packages, getUserData } from "../../solana/program";
import iconGold from '/img/tree-icon/golden.png'
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

  useEffect(() => {

    loadTree();
  }, [wallet]);
  // const loadTree = async () => {

  //   if (!wallet) return;

  //   setLoading(true);

  //   try {
  //     const user = await getUserData(wallet);
  //     setUserData(user);
  //     const treeData = await getBinaryTree(wallet);
  //     setTree(treeData);

  //   } catch (err) {
  //     console.error("Tree load error:", err);
  //   }

  //   setLoading(false);

  // };

  // const node = (user?: any) => {
  //   if (!user || user.id === "-" || user.id === undefined) {
  //     return {
  //       icon: iconBlack,
  //       id: "-",
  //       rank: "Vacant"
  //     };
  //   }

  //   return {
  //     icon: iconGreen,
  //     id: user.id,
  //     rank: packages[user.package - 1]?.name || "No rank"
  //   };
  // };


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

  // ❌ Vacant
  if (!user || user.id === "-" || user.id === undefined) {
    return {
      icon: iconBlack,
      id: "-",
      rank: "Vacant",
      className: "my-member",
      wallet: null
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
      wallet: user.wallet
    };
  }

  // 🟡 Starter group
  if (pkg >= 1 && pkg <= 3) {
    return {
      icon: iconGold,
      id: user.id,
      rank: rankName,
      className: "my-member gold",
      wallet: user.wallet
    };
  }

  // 🔴 Free DBO
  return {
    icon: iconRed,
    id: user.id,
    rank: "Free DBO",
    className: "my-member myFreeID",
    wallet: user.wallet
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
  return (
    <>

      <main>
        <div className="container-fluid">
          <div className="row">
            {/* <div className="col-lg-8 col-xl-8">
              <div className="SOL-page-title text-center"><span>My Team Tree </span></div>
              <div className="display-wrapper">
                <div className="row">
                  <div className="col-lg-12 mx-auto">
                    <div className="search-container mb-3">
                      <div className="row">
                        <div className="col-md-8 col-lg-8 col-xl-9 pe-md-0 pe-xl-0 pe-lg-0">
                          <div className="search-id-wrapper mb-2 mb-md-0 mb-lg-0">
                            <input placeholder="Enter DBO ID" className="" />
                            <a className="search-icon"><i className="bi bi-search"></i></a>
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-xl-3 text-center">
                          <a href="#!" className="btn btn-outline-dark text-white float-start w-50"><i
                            className="bi bi-arrow-90deg-up me-1"></i>TOP</a>
                          <a href="#!" className="btn btn-outline-dark text-white float-end w-50"><i
                            className="bi bi-arrow-bar-up me-1"></i>UPLINE</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-2 col-4 mx-auto ">
                    <div className="my-team">
                      <div className="center-border"></div>
                      <div className="my-member gold"> <a href="#" data-bs-toggle="modal" data-bs-target="#treeInformation">
                        <img src={iconGreen} />
                        <span>{tree?.root?.id}</span>
                        <div className="my-member-rank">
                          {packages[tree?.root?.package - 1]?.name}
                        </div>
                      </a>
                      </div>


                    </div>

                  </div>
                </div>
                <div className="row">
                  <div className="col-6 col-sm-6">
                    <div className="my-team">
                      <div className="center-border"></div>
                      <div className="right-border"></div>
                      <div className="my-member green"> <a href="#" data-bs-toggle="modal" data-bs-target="#treeInformation">
                        <img src={L.icon} /> <span>{L.id}</span>
                        <div className="my-member-rank">
                          {L.rank}
                        </div>
                      </a>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 col-sm-6">
                        <div className="my-team">
                          <div className="right-border"></div>
                          <div className="my-member blue"> <a href="#" data-bs-toggle="modal" data-bs-target="#treeInformation">
                            <img src={LL.icon} />
                            <span>{LL.id}</span>
                            <div className="my-member-rank">
                              {LL.rank}
                            </div>
                          </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-6 col-sm-6">
                        <div className="my-team">
                          <div className="my-member-left"></div>
                          <div className="my-member blue"> <a href="#" data-bs-toggle="modal" data-bs-target="#treeInformation">
                            <img src={LR.icon} /> <span>{LR.id}</span>
                            <div className="my-member-rank">
                              {LR.rank}
                            </div>
                          </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-sm-6 ">
                    <div className="my-team">
                      <div className="center-border"></div>
                      <div className="my-member-left"></div>
                      <div className="my-member green"> <a href="#" data-bs-toggle="modal" data-bs-target="#treeInformation">
                        <img src={R.icon} /><span>{R.id}</span>
                        <div className="my-member-rank">
                          {R.rank}
                        </div>
                      </a>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6 col-sm-6">
                        <div className="my-team">

                          <div className="right-border"></div>
                          <div className="my-member myFreeID"> <a href="#" data-bs-toggle="modal"
                            data-bs-target="#treeInformation"> <img src={RL.icon} /><span>{RL.id}</span>
                            <div className="my-member-rank">
                              {RL.rank}
                            </div>
                          </a>
                          </div>
                        </div>

                      </div>
                      <div className="col-6 col-sm-6">
                        <div className="my-team">
                          <div className="my-member-left"></div>
                          <div className="my-member myFreeID"> <a href="#" data-bs-toggle="modal"
                            data-bs-target="#treeInformation"> <img src={RR.icon} />
                            <span>{RR.id}</span>
                            <div className="my-member-rank">
                              {RR.rank}
                            </div>
                          </a>
                          </div>
                        </div>

                      </div>

                    </div>



                  </div>
                </div>
              </div>
            </div> */}


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
                <input placeholder="Enter DBO ID" />
                <a className="search-icon"><i className="bi bi-search"></i></a>
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
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  loadTree(root.wallet);
                }}>
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
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  loadTree(n.wallet);
                }}>
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
                    <a href="#" onClick={(e) => {
                      e.preventDefault();
                      loadTree(n.wallet);
                    }}>
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
                    <a href="#" onClick={(e) => {
                      e.preventDefault();
                      loadTree(n.wallet);
                    }}>
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
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                  loadTree(n.wallet);
                }}>
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
                    <a href="#" onClick={(e) => {
                      e.preventDefault();
                      loadTree(n.wallet);
                    }}>
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
                    <a href="#" onClick={(e) => {
                      e.preventDefault();
                      loadTree(n.wallet);
                    }}>
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

                {/* <div className="row">
              <div className="col-3 col-sm-3 pe-0">
                <div className="sm-input-group">
                  <select>
                    <option>DD</option>
                    <option> 1 </option>
                    <option selected> 2 </option>
                    <option> 3 </option>
                    <option> 4 </option>
                    <option> 5 </option>
                    <option> 6 </option>
                    <option> 7 </option>
                    <option> 8 </option>
                    <option> 9 </option>
                    <option> 10 </option>
                    <option> 11 </option>
                    <option> 12 </option>
                    <option> 13 </option>
                    <option> 14 </option>
                    <option> 15 </option>
                    <option> 16 </option>
                    <option> 17 </option>
                    <option> 18 </option>
                    <option> 19 </option>
                    <option> 20 </option>
                    <option> 21 </option>
                    <option> 22 </option>
                    <option> 23 </option>
                    <option> 24 </option>
                    <option> 25 </option>
                    <option> 26 </option>
                    <option> 27 </option>
                    <option> 28 </option>
                    <option> 29 </option>
                    <option> 30 </option>
                    <option> 31 </option>

                  </select>
                </div>
              </div>
              <div className="col-3 col-sm-3 pe-0">
                <div className="sm-input-group">
                  <select>
                    <option>MM</option>
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                    <option>September</option>
                    <option>October</option>
                    <option>November</option>
                    <option selected="">December</option>
                  </select>
                </div>
              </div>
              <div className="col-3 col-sm-3 pe-0">
                <div className="sm-input-group">
                  <select>
                    <option>YYYY</option>
                    <option selected="">2026</option>
                    <option>2025</option>
                  </select>
                </div>
              </div>
              <div className="col-3 col-sm-3">
                <div className="sm-input-group"><a href="#!" className="btn btn-primary d-block">Search</a></div>
              </div>
            </div> */}

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

    </>
  )
}

export default TeamTree


