import { useState, useEffect } from 'react'
import checkIcon from '/img/check-icon.png';
import { useWallet } from "../../solana/context/WalletContext";
import { getDirectPartners, packages, shorten } from "../../solana/program";
function DirectTeam() {
  const { wallet } = useWallet();
  const [directPartners, setDirectPartners] = useState<any[]>([]);

  useEffect(() => {
    const loadPartners = async () => {
      if (!wallet) return;
      const partners = await getDirectPartners(wallet);
      console.log("all parteners data ",partners);
      setDirectPartners(partners);
    };

    loadPartners();
  }, [wallet]);
  return (
    <>

      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-xl-12">
              <div className="SOL-page-title text-center"><span>My Direct Team</span></div>
              <div className="table-responsive table-style">
                <table className="table">

                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Date</th>
                      <th>Name</th>
                      <th>DBO ID</th>
                      <th>Contact</th>
                      <th>Address</th>
                      {/* <th>Starter</th>
                  <th>Advisor</th>
                  <th>Bronze</th>
                  <th>Silver</th>
                  <th>Gold</th>
                  <th>Platinum</th>
                  <th>Sapphire</th>
                  <th>Diamond</th>
                  <th>Director</th>
                  <th>President</th> */}
                      {packages.map((pkg) => (
                        <th key={pkg.id}>{pkg.name}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>

                    {directPartners.length === 0 ? (
                      <tr>
                        <td colSpan={4 + packages.length} className="text-center">
                          No direct partners found
                        </td>
                      </tr>
                    ) : (
                      directPartners.map((partner, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{partner.joinedAt || "-"}</td>
                          <td>{"-"}</td>
                          <td>{partner.dboId}</td>
                          <td>{"-"}</td>
                          <td>{shorten(partner.wallet)}</td>

                          {packages.map((pkg) => (
                            <td key={pkg.id}>
                              {partner.currentPackage >= pkg.id ? (
                                <img src={checkIcon} alt="check" width="20" />
                              ) : (
                                "-"
                              )}
                            </td>
                          ))}
                        </tr>
                      ))
                    )}
                  </tbody>

                </table>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <ul className="pagination">
              <li className="page-item"><a className="page-link" href="#">Previous</a></li>
              <li className="page-item active"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item"><a className="page-link" href="#">Next</a></li>
            </ul>
          </div>
        </div>
      </main>





      <div className="modal fade" id="contactDetails" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <span className="modalWindow-close" data-bs-dismiss="modal" aria-label="Close"></span>
            <div className="modal-body">
              <div className="sec-divider top"> </div>
              <div className="sec-divider bottom"> </div>
              <div className="badgeStyle text-center mb-2">
                <h5>DBO ID: 111560880142</h5>
              </div>
              <div className="item-style-box mb-2">
                <div className="social-account-connect">
                  <div className="social-account-icon">
                    <i className="fa-brands fa-whatsapp"></i>
                  </div>
                  <div className="head">Whatsapp</div>
                  <div className="account-handle"><a href="tel:8954575695" target="_blank">8954575695</a></div>
                </div>
              </div>
              <div className="item-style-box mb-2">
                <div className="social-account-connect">
                  <div className="social-account-icon">
                    <i className="fa-brands fa-telegram"></i>
                  </div>
                  <div className="head">Telegram</div>
                  <div className="account-handle"><a href="https://t.me/8954575695" target="_blank">8954575695</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default DirectTeam