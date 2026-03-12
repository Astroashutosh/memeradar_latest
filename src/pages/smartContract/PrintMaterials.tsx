
import pdf from '/img/pdf.png'
function PrintMaterials() {
  return (
    <>

      <main>
        <div className="container-fluid">
          <div className="SOL-page-title text-center"><span>Print Materials</span></div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <p className="text-center fs-medium"> Download the Print Materials PDF to stay organized and confidently guide
                your team.</p>
            </div>

          </div>

          <div className="row justify-content-center">
            <div className="col-lg-3 mt-3">
              <div className="review-web-list">
                <div className="review-web-icon">
                  <img src={pdf} />
                </div>
                <div className="review-web-details">
                  <div className="review-web-name">My Tree Sheet</div>
                  <div className="mb-2"><a href="#!" className="btn btn-dark"><i className="fa-regular fa-download me-1"></i>
                    Download</a></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

    </>
  )
}

export default PrintMaterials