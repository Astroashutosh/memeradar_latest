

function PersentationPdf() {
  return (
    <>

      <main>
        <div className="container-fluid">
          <div className="SOL-page-title text-center"><span>Presentation PDF</span></div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <p className="text-center fs-medium"> An easy-to-understand PDF guide explaining MemeRadar and its programs,
                designed for sharing and available in multiple languages.</p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-3 mt-3">
              <div className="review-web-list">
                <div className="review-web-icon">
                  <img src={`${import.meta.env.BASE_URL}img/pdf.png`} />
                </div>
                <div className="review-web-details">
                  <div className="review-web-name">Presentation PDF</div>
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

export default PersentationPdf