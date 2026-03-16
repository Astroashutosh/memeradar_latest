interface UpgradeModalProps {
  selectedPackage: any;
  onUpgrade: () => void;
}

function UpgradeModal({ selectedPackage, onUpgrade }: UpgradeModalProps) {
  return (
    <div className="modal fade" id="paymentConfirm" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <span
            className="modalWindow-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></span>

          <div className="modal-body text-center">
            <div className="sec-divider top"></div>
            <div className="sec-divider bottom"></div>

            <img src={`${import.meta.env.BASE_URL}img/solana-icon.png`} width="80" />

            <div className="badgeStyle text-center mb-2">
              <h5>{selectedPackage?.price} SOL</h5>
            </div>

            <h3>
              Package:{" "}
              <span className="text-success">
                {selectedPackage?.name}
              </span>
            </h3>

            <div className="fs-small mb-2">
              To complete your package upgrade, please continue to the payment
              page.
            </div>

            <a
              href="#"
              className="btn btn-primary ms-1"
              onClick={(e) => {
                e.preventDefault();
                onUpgrade();
              }}
            >
              Proceed to Upgrade
              <i className="fa-regular fa-arrow-right ms-1"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpgradeModal;