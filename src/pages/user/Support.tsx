import {useState} from 'react'
import Sidebar from '../../components/layout/smartContract/Sidebar'
import { useWallet } from "../../solana/context/WalletContext";
import { checkUserRegistered, upgradePackage } from "../../solana/program";
import { notifySuccess, notifyError } from "../../solana/context/Notifications";
import UpgradeModal from "../../components/modal/UpgradeModal";

function Support() {
  const { wallet } = useWallet();
    const [selectedPackage, setSelectedPackage] = useState<any>(null);
    const [subject, setSubject] = useState<number | null>(null);
    const [showOther, setShowOther] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = parseInt(e.target.value); // convert string to number
      setSubject(value);
      setShowOther(value === 1); // show input only if "Others" selected
    };
    const handleOpenUpgrade = (pkg: any) => {
        setSelectedPackage(pkg);
      };
    const handleUpgrade = async () => {
      if (!wallet) return;
      if (!selectedPackage) {
        notifyError("Select package first");
        return;
      }
  
      try {
        const registered = await checkUserRegistered(wallet);
        console.log("registered",registered);
        if (registered) {
          await upgradePackage(wallet, selectedPackage.id);
          notifySuccess("Package upgraded successfully");
        }
  
      } catch (err:any) {
        console.error(err);
        notifyError(err.message || "Upgrade failed");
      }
  
    };
  return (
  <>
  
   <main>
    <div className="container-fluid">
      <div className="row">
     <Sidebar onUpgradeClick={handleOpenUpgrade}/>
        <div className="col-lg-12 col-xl-9">
          <div className="SOL-page-title text-center"><span>Support</span></div>

          <div className="row">
            <div className="col-lg-7 mx-auto">
              <div className="card pumpCard p-lg-5 p-3 text-center text-white" id="ticket-created" style={{display: "none"}}>
                Your ticket has been successfully created. An email has been sent to your address with the ticket
                information. If you would like to view this ticket now you can do so.
                <div className="row">
                  <div className="col-lg-6 mt-3"> <a href="support.html" className="btn btn-primary   d-block"><i
                        className="fa-regular fa-circle-plus me-1"></i>Open New Ticket</a></div>
                  <div className="col-lg-6 mt-3"> <a href="ticket-list.html" className="btn btn-outline-dark   d-block"><i
                        className="fa-regular fa-list me-1"></i> Tickets List</a> </div>
                </div>
              </div>
              <div id="ticket-open">
                <div className="subNav mb-2">
                  <ul>
                    <li><a href="support.html" className="active">Open Ticket</a></li>
                    <li><a href="ticket-list.html">Ticket History</a></li>
                  </ul>
                </div>

                <div className="row">
                  <div className="col-lg-12 mb-3">
                    <div className="form-group">
                      <div className="mb-3">
                        <label>Subject</label>
                        <select className="form-control" value={subject ?? ""} onChange={handleChange}>
                          <option value="">Select</option>
                          <option value={0}>Smart Contract Related</option>
                          <option value={0}>Bonus Related</option>
                          <option value={0}>Reward Points Related</option>
                          <option value={1}>Others</option>
                        </select>

                        {showOther && (
                          <div id="otherInput" className="mt-2">
                            <input type="text" className="form-control" placeholder="Specify other subject" />
                          </div>
                        )}
                        {/* <div id="otherInput" style={{display:"none"}} className="mt-2">
                          <input type="text" className="form-control"/>
                        </div> */}
                      </div>

                      <div className="mb-3">
                        <label>Message</label>
                        <textarea rows={4}></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group  mb-3">
                      <label>Attachment</label>
                      <input type="file" className="form-control"/>
                      <div className="small text-muted mt-1"> Allowed File Extensions: .jpg, .JPG, .jpeg, .png, .pdf (Max
                        file
                        size: 200MB)</div>
                    </div>

                  </div>
                  <div className="col-lg-12">
                    <a href="#" className="btn btn-primary d-block  " id="ticketBtn">Submit</a>
                  </div>
                </div>
              </div>
            </div>
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

export default Support