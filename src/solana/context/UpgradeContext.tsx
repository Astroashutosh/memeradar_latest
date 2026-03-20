import { createContext, useContext, useState } from "react";
import { checkUserRegistered, upgradePackage } from "../program";
import { notifySuccess, notifyError } from "../context/Notifications";
declare global {
  interface Window {
    bootstrap: any;
  }
}
const UpgradeContext = createContext<any>(null);

export const UpgradeProvider = ({ children }: any) => {
  const [upgrading, setUpgrading] = useState(false);

  const handleUpgrade = async (wallet: any, selectedPackage: any, onSuccess?: Function) => {
    if (!wallet || !selectedPackage) {
      notifyError("Invalid upgrade request");
      return;
    }

    try {
      setUpgrading(true);

      const registered = await checkUserRegistered(wallet);

      if (registered) {
        await upgradePackage(wallet, selectedPackage.id);

        // notifySuccess("Package upgraded successfully");

        // 🔥 modal close
//         const modalEl = document.getElementById("paymentConfirm");
//         if (modalEl) {
//           let modalInstance = window.bootstrap?.Modal.getInstance(modalEl);
//           if (!modalInstance) {
//             modalInstance = new window.bootstrap.Modal(modalEl);
//           }
//           modalInstance.hide();
//         }
// setTimeout(() => {
//   notifySuccess("Package upgraded successfully");
// }, 300);
//         // 🔥 callback (optional)
//         onSuccess && onSuccess();


// 🔥 modal close first
const modalEl = document.getElementById("paymentConfirm");
if (modalEl) {
  let modalInstance = window.bootstrap?.Modal.getInstance(modalEl);
  if (!modalInstance) {
    modalInstance = new window.bootstrap.Modal(modalEl);
  }
  modalInstance.hide();
}

// 🔥 show toast after small delay
setTimeout(() => {
  notifySuccess("Package upgraded successfully");
}, 300);

// 🔥 reload after toast visible
setTimeout(() => {
  onSuccess && onSuccess();
}, 1800);

      }
    } catch (err: any) {
      notifyError(err.message || "Upgrade failed");
    } finally {
      setUpgrading(false);
    }
  };

  return (
    <UpgradeContext.Provider value={{ handleUpgrade, upgrading }}>
      {children}
    </UpgradeContext.Provider>
  );
};

export const useUpgrade = () => useContext(UpgradeContext);