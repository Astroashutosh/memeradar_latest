import { useEffect } from 'react'

function TrendingToken() {

    useEffect(() => {

    if (!window.Swiper) return;

       // Trending Token
    new window.Swiper(".mySwiper", {
      spaceBetween: 15,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: ".Snext",
        prevEl: ".Sprev"
      },
      breakpoints: {
        350: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1200: { slidesPerView: 3.5 }
      }
    });


  }, []);
   


    
  return (
    <>
      <section className="mb-3">

            <div className="section-head d-flex justify-content-between align-items-center">
              <div className="section-title">Trending Token</div>
              <div className="swiper-arrow">
                <div className="swiper-button-prev Sprev"></div>
                <div className="swiper-button-next Snext"></div>
              </div>
            </div>
            <div className="swiper mySwiper">
              
              <div className="swiper-wrapper">
                
                <div className="swiper-slide">
                  <div className="new-trending-item">
                    <div className="d-flex">
                      <a href="trade.html" className="new-trending-item-thumbnail active">
                        <img src="/img/coin/2.jpg" />
                      </a>
                      <div className="new-trending-item-content">
                        <div className="new-trending-item-title">
                          Trencher Co <span>(TBC)</span>
                        </div>
                        <div className="new-trending-item-cap">
                          market cap: $357.7K
                        </div>
                        <div className="item-list-view">
                          <ul>
                            <li>
                              <a href="#!"><i className="fa-brands fa-x-twitter"></i></a>
                            </li>
                            <li>
                              <a href="#!"><i className="fa-regular fa-globe"></i></a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="token_code">
                        <span>SS285</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-9 col-9">
                        <div className="new-trending-item-short-des">
                          Apple AirPod's Real-Time Translation Inspires New Meme
                        </div>
                      </div>
                      <div className="col-lg-3 col-3 text-end">
                        <a href="trade.html" className="btn btn-success btn-sm text-white">Buy</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="new-trending-item">
                    <div className="d-flex">
                      <a href="trade.html" className="new-trending-item-thumbnail active">
                        <img src="/img/coin/3.jpg" />
                      </a>
                      <div className="new-trending-item-content">
                        <div className="new-trending-item-title">
                          Justice for Iryna <span>(IRYNA)</span>
                        </div>
                        <div className="new-trending-item-cap">
                          market cap: $5.9M
                        </div>
                        <div className="item-list-view">
                          <ul>
                            <li>
                              <a href="#!"><i className="fa-brands fa-x-twitter"></i></a>
                            </li>
                            <li>
                              <a href="#!"><i className="fa-regular fa-globe"></i></a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="token_code">
                        <span>SS206</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-9 col-9">
                        <div className="new-trending-item-short-des">
                          Apple AirPod's Real-Time Translation Inspires New Meme
                        </div>
                      </div>
                      <div className="col-lg-3 col-3 text-end">
                        <a href="trade.html" className="btn btn-success btn-sm text-white">Buy</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="swiper-slide">
                  <div className="new-trending-item">
                    <div className="d-flex">
                      <a href="trade.html" className="new-trending-item-thumbnail">
                        <img src="/img/coin/tbc.jpg" />
                      </a>
                      <div className="new-trending-item-content">
                        <div className="new-trending-item-title">
                          Lenny <span>(Lenny)</span>
                        </div>
                        <div className="new-trending-item-cap">
                          market cap: $357.7K
                        </div>
                        <div className="item-list-view">
                          <ul>
                            <li>
                              <a href="#!"><i className="fa-brands fa-x-twitter"></i></a>
                            </li>
                            <li>
                              <a href="#!"><i className="fa-regular fa-globe"></i></a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="token_code">
                        <span>TF303</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-9 col-9">
                        <div className="new-trending-item-short-des">
                          Apple AirPod's Real-Time Translation Inspires New Meme
                        </div>
                      </div>
                      <div className="col-lg-3 col-3 text-end">
                        <a href="trade.html" className="btn btn-success btn-sm text-white">Buy</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="swiper-slide">
                  <div className="new-trending-item">
                    <div className="d-flex">
                      <a href="trade.html" className="new-trending-item-thumbnail active">
                        <img src="/img/coin/4.jpg" />
                      </a>
                      <div className="new-trending-item-content">
                        <div className="new-trending-item-title">
                          KindnessCoin <span>(KIND)</span>
                        </div>
                        <div className="new-trending-item-cap">
                          market cap: $45.7K
                        </div>
                        <div className="item-list-view">
                          <ul>
                            <li>
                              <a href="#!"><i className="fa-brands fa-x-twitter"></i></a>
                            </li>
                            <li>
                              <a href="#!"><i className="fa-regular fa-globe"></i></a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="token_code">
                        <span>SS250</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-9 col-9">
                        <div className="new-trending-item-short-des">
                          Apple AirPod's Real-Time Translation Inspires New Meme
                        </div>
                      </div>
                      <div className="col-lg-3 col-3 text-end">
                        <a href="trade.html" className="btn btn-success btn-sm text-white">Buy</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="new-trending-item">
                    <div className="d-flex">
                      <a href="trade.html" className="new-trending-item-thumbnail">
                        <img src="/img/coin/5.jpg" />
                      </a>
                      <div className="new-trending-item-content">
                        <div className="new-trending-item-title">
                          KindnessCoin <span>(KIND)</span>
                        </div>
                        <div className="new-trending-item-cap">
                          market cap: $45.7K
                        </div>
                        <div className="item-list-view">
                          <ul>
                            <li>
                              <a href="#!"><i className="fa-brands fa-x-twitter"></i></a>
                            </li>
                            <li>
                              <a href="#!"><i className="fa-regular fa-globe"></i></a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="token_code">
                        <span>TF452</span>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-9 col-9">
                        <div className="new-trending-item-short-des">
                          Apple AirPod's Real-Time Translation Inspires New Meme
                        </div>
                      </div>
                      <div className="col-lg-3 col-3 text-end">
                        <a href="trade.html" className="btn btn-success btn-sm text-white">Buy</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </section>
    </>
  )
}

export default TrendingToken
