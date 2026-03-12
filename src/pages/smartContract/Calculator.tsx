

function Calculator() {
  return (
    <>
      <main>
        <div className="container-fluid">
          <div className="SOL-page-title text-center"><span>Calculator</span></div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <p className="text-center fs-medium">Estimate your potential earnings from participating in MemeRadar by selecting the levels
                you wish to activate
                below. The results are based on the Team Pool Bonus of all selected levels. Please note that all calculations are
                for informational purposes only and do not constitute a public offer.</p>

              <div className="calculate_select_pack mb-3">
                <ul>
                  <li className="selected"> Advisor</li>
                  <li>Bronze</li>
                  <li>Silver</li>
                  <li>Gold</li>
                  <li>Platinum</li>
                  <li>Sapphire</li>
                  <li>Diamond</li>
                  <li>Director</li>
                  <li>President</li>
                </ul>
              </div>
              <div className="style-wrapper">
                <div className="row align-items-center mb-4">
                  <div className="col-lg-3">
                    <div className="selected-level-title">
                      President
                    </div>
                  </div>
                  <div className="col-lg-9 text-center text-lg-start">
                    <div className="fs-small"> An exclusive program offering unparalleled opportunities for teamwork and growth.</div>

                  </div>
                </div>
                <hr />
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <div className="select-level">
                      <ul>

                        <li className="selected">2 </li>
                        <li className="selected">3 </li>
                        <li className="selected">4 </li>
                        <li className="selected">5 </li>
                        <li className="">6 </li>
                        <li className="">7 </li>
                        <li className="">8 </li>
                        <li className="">9 </li>
                        <li className="">10 </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-6 text-center text-lg-start">
                    <div className="calc-summary">
                      <div className="mt-3 mb-3">
                        Cost of all selected package
                        <h4 className="text-warning"> <strong>0.253 SOL</strong></h4>
                      </div>
                      <div className="mt-3 mb-3">
                        Results in Team Pool Bonus
                        <h4 className="text-warning"> <strong>0.253 SOL</strong></h4>
                      </div>
                    </div>
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

export default Calculator