import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWallet } from "../../solana/context/WalletContext";
import { getPoolUsersByPackage, packages, shorten } from "../../solana/program";
import { copyToClipboard } from "../../utils/helpers";
function MatrixTreeDetails() {

  const { tier } = useParams();
  const navigate = useNavigate();
  const { wallet } = useWallet();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!wallet || !tier) return;

    const loadData = async () => {
      setLoading(true);

      const res = await getPoolUsersByPackage(wallet, Number(tier));
      setData(res);

      setLoading(false);
    };

    loadData();

  }, [wallet, tier]);

  return (
    <>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-xl-12">

              {/* HEADER */}
              <div className="SoLbodyheader mb-3">
                <div 
                  className="backBtn"
                  onClick={() => navigate(-1)}
                >
                  <i className="fa-regular fa-angle-left"></i>
                </div>

                <h4>Tier {tier}</h4>
              </div>

              {/* TABLE */}
              <div className="table-responsive table-style">
                <table className="table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>DBO ID</th>
                      <th>Address</th>
                      <th>Package</th>
                    </tr>
                  </thead>

                  <tbody>

                    {loading ? (
                      <tr>
                        <td colSpan={5} className="text-center">Loading...</td>
                      </tr>
                    ) : data.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center">No Data</td>
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

                            <td className="nowrap">
                              {shorten(row.from)}

                              {/* <a href="#!" className="ms-2">
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
                              <a 
                                href={`https://solscan.io/account/${row.from}`} 
                                target="_blank"
                                className="ms-2"
                              >
                                <i className="bi bi-box-arrow-up-right"></i>
                              </a>
                            </td>

                            <td>{pkgName}</td>
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
    </>
  );
}

export default MatrixTreeDetails;