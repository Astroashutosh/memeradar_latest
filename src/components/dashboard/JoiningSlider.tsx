import { useEffect } from 'react'

function JoiningSlider() {

  useEffect(() => {

    if (!window.Swiper) return;

    // Joining Slider
    new window.Swiper(".JoiningSwiper", {
      spaceBetween: 10,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false
      },
      breakpoints: {
        350: { slidesPerView: 2.3 },
        768: { slidesPerView: 5 },
        1024: { slidesPerView: 6 },
        1200: { slidesPerView: 8.5 }
      }
    });

  }, []);


  return (
    <>
      <>

        <div className="SOL-page-title fs-small text-center"><span> A Rapidly Growing Global Meme Community</span></div>
        <div className="swiper JoiningSwiper  mb-3">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="joining-quick-bx">
                <div className="joining-quick-by">
                  <img src={`${import.meta.env.BASE_URL}img/flag/AG.jpg`} />
                  <a href="#!">0x4S3......2s85d</a>
                  <h5>United State</h5>
                  <div className="d-flex justify-content-between align-items-center mt-1">
                    <h6 className="text-muted">2 min ago</h6>
                    <h6 className="flash">Upgrade</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="joining-quick-bx">
                <div className="joining-quick-by">
                  <img src={`${import.meta.env.BASE_URL}img/flag/UGA.jpg`} />
                  <a href="#!">0x4S3......2s85d</a>
                  <h5>United State</h5>
                  <div className="d-flex justify-content-between align-items-center mt-1">
                    <h6 className="text-muted">2 min ago</h6>
                    <h6 className="flash new">New</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="joining-quick-bx">
                <div className="joining-quick-by">
                  <img src={`${import.meta.env.BASE_URL}img/flag/UK.jpg`} />
                  <a href="#!">0x4S3......2s85d</a>
                  <h5>United State</h5>
                  <div className="d-flex justify-content-between align-items-center mt-1">
                    <h6 className="text-muted">2 min ago</h6>
                    <h6 className="flash">Upgrade</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="joining-quick-bx">
                <div className="joining-quick-by">
                  <img src={`${import.meta.env.BASE_URL}img/flag/DR.jpg`} />
                  <a href="#!">0x4S3......2s85d</a>
                  <h5>United State</h5>
                  <div className="d-flex justify-content-between align-items-center mt-1">
                    <h6 className="text-muted">2 min ago</h6>
                    <h6 className="flash new">New</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="joining-quick-bx">
                <div className="joining-quick-by">
                  <img src={`${import.meta.env.BASE_URL}img/flag/SN.jpg`} />
                  <a href="#!">0x4S3......2s85d</a>
                  <h5>United State</h5>
                  <div className="d-flex justify-content-between align-items-center mt-1">
                    <h6 className="text-muted">2 min ago</h6>
                    <h6 className="flash">Upgrade</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="joining-quick-bx">
                <div className="joining-quick-by">
                  <img src={`${import.meta.env.BASE_URL}img/flag/VEN.jpg`} />
                  <a href="#!">0x4S3......2s85d</a>
                  <h5>United State</h5>
                  <div className="d-flex justify-content-between align-items-center mt-1">
                    <h6 className="text-muted">2 min ago</h6>
                    <h6 className="flash new">New</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="joining-quick-bx">
                <div className="joining-quick-by">
                  <img src={`${import.meta.env.BASE_URL}img/flag/GM.jpg`} />
                  <a href="#!">0x4S3......2s85d</a>
                  <h5>United State</h5>
                  <div className="d-flex justify-content-between align-items-center mt-1">
                    <h6 className="text-muted">2 min ago</h6>
                    <h6 className="flash">Upgrade</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-slide">
              <div className="joining-quick-bx">
                <div className="joining-quick-by">
                  <img src={`${import.meta.env.BASE_URL}img/flag/MD.jpg`} />
                  <a href="#!">0x4S3......2s85d</a>
                  <h5>United State</h5>
                  <div className="d-flex justify-content-between align-items-center mt-1">
                    <h6 className="text-muted">2 min ago</h6>
                    <h6 className="flash new">New</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </>
    </>
  )
}

export default JoiningSlider
