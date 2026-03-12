import { useEffect } from 'react'

function ReadyToPump() {

    useEffect(() => {

    if (!window.Swiper) return;

     // Ready To Pump
  new window.Swiper(".VerticalSwiper", {
    direction: "vertical",
    spaceBetween: 10,
    loop: true,
    navigation: {
      nextEl: ".Vnext",
      prevEl: ".Vprev"
    },
    breakpoints: {
      350: { slidesPerView: 1.2 },
      768: { slidesPerView: 1.4 },
      1024: { slidesPerView: 1.2 },
      1320: { slidesPerView: 3.7 }
    }
  });

  // Dex Listed
  new window.Swiper(".DexSwiper", {
    direction: "vertical",
    spaceBetween: 10,
    loop: true,
    navigation: {
      nextEl: ".DexN",
      prevEl: ".DexP"
    },
    breakpoints: {
      350: { slidesPerView: 1.1 },
      768: { slidesPerView: 1.8 },
      1024: { slidesPerView: 2 },
      1320: { slidesPerView: 4.7 }
    }
  });


  }, []);
 


  return (
    <>
      <section>
        <div className="row">
          <div className="col-sm-6 mb-lg-0 mb-3">
            <div className="newstyle-wrapper">
              <div className="section-head d-flex justify-content-between align-items-center">
                <div className="section-title">Ready to Pump</div>
                <div className="swiper-arrow">
                  <div className="swiper-button-prev Vprev"></div>
                  <div className="swiper-button-next Vnext"></div>
                </div>
              </div>
              <div className="swiper VerticalSwiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="row">
                      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 col-12 pe-lg-0 mb-lg-0 mb-2">
                        <div className="coinpump-item-wrapper">
                          <div className="border-sprater">
                            <div className="row">
                              <div className="col-lg-4 col-3 pe-0">
                                <a href="trade.html" className="coinpump-item-thumbs">
                                  <img src="/img/coin/1.jfif" />
                                </a>
                              </div>
                              <div className="col-lg-8 col-9 ps-0">
                                <div className="coinpump-item-content">
                                  <div className="coinpump-item-details">
                                    <div className="coinpump-item-head">
                                      <strong className="me-1">MANHUNT</strong>
                                      <span className="ellipsis-100">Charlie Kirk Shooter</span>
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

                                    <div className="item-list-view mt-1">
                                      <ul>
                                        <li className="d-flex justify-content-between align-items-center me-0">
                                          <span>Created By:</span>
                                          <span>
                                            <a href="trade.html" title="Wallet Address">tCL7...pump</a></span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                          <span>Market Cap:</span>
                                          <span> 35.5 M</span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>


                              </div>
                            </div>
                          </div>
                          <div className="token-bonding-progress mt-2">
                            <div className="token-bonding-head d-flex justify-content-between align-items-center">
                              <span>Bonding Curve Progress</span>
                              <span className="progress-bar__value">
                                40%
                              </span>
                            </div>
                            <div className="progress-bar__wrapper">
                              <progress id="progress-bar" value="40" max="100"></progress>
                            </div>
                          </div>
                          <div className="row d-flex justify-content-between align-items-center">
                            <div className="col-lg-8 col-7">
                              <div className="token_code1">
                                <span>SS250</span>
                              </div>
                            </div>
                            <div className="col-lg-4 col-5">
                              <div className="text-end">
                                <a href="trade.html" className="btn btn-success btn-sm">Buy</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 col-12 mb-lg-0 mb-2">
                        <div className="coinpump-item-wrapper">
                          <div className="border-sprater">
                            <div className="row">
                              <div className="col-lg-4 col-3 pe-0">
                                <a href="trade.html" className="coinpump-item-thumbs">
                                  <img src="/img/coin/1.jfif" />
                                </a>
                              </div>
                              <div className="col-lg-8 col-9 ps-0">
                                <div className="coinpump-item-content">
                                  <div className="coinpump-item-details">
                                    <div className="coinpump-item-head">
                                      <strong className="me-1">MANHUNT</strong>
                                      <span className="ellipsis-100">Charlie Kirk Shooter</span>
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

                                    <div className="item-list-view mt-1">
                                      <ul>
                                        <li className="d-flex justify-content-between align-items-center me-0">
                                          <span>Created By:</span>
                                          <span>
                                            <a href="trade.html" title="Wallet Address">tCL7...pump</a></span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                          <span>Market Cap:</span>
                                          <span> 35.5 M</span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>


                              </div>
                            </div>
                          </div>
                          <div className="token-bonding-progress mt-2">
                            <div className="token-bonding-head d-flex justify-content-between align-items-center">
                              <span>Bonding Curve Progress</span>
                              <span className="progress-bar__value">
                                40%
                              </span>
                            </div>
                            <div className="progress-bar__wrapper">
                              <progress id="progress-bar" value="40" max="100"></progress>
                            </div>
                          </div>
                          <div className="row d-flex justify-content-between align-items-center">
                            <div className="col-lg-8 col-7">
                              <div className="token_code1">
                                <span>SS250</span>
                              </div>
                            </div>
                            <div className="col-lg-4 col-5">
                              <div className="text-end">
                                <a href="trade.html" className="btn btn-success btn-sm">Buy</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="row">
                      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 col-12 pe-lg-0 mb-lg-0 mb-2">
                        <div className="coinpump-item-wrapper">
                          <div className="border-sprater">
                            <div className="row">
                              <div className="col-lg-4 col-3 pe-0">
                                <a href="trade.html" className="coinpump-item-thumbs">
                                  <img src="/img/coin/1.jfif" />
                                </a>
                              </div>
                              <div className="col-lg-8 col-9 ps-0">
                                <div className="coinpump-item-content">
                                  <div className="coinpump-item-details">
                                    <div className="coinpump-item-head">
                                      <strong className="me-1">MANHUNT</strong>
                                      <span className="ellipsis-100">Charlie Kirk Shooter</span>
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

                                    <div className="item-list-view mt-1">
                                      <ul>
                                        <li className="d-flex justify-content-between align-items-center me-0">
                                          <span>Created By:</span>
                                          <span>
                                            <a href="trade.html" title="Wallet Address">tCL7...pump</a></span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                          <span>Market Cap:</span>
                                          <span> 35.5 M</span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>


                              </div>
                            </div>
                          </div>
                          <div className="token-bonding-progress mt-2">
                            <div className="token-bonding-head d-flex justify-content-between align-items-center">
                              <span>Bonding Curve Progress</span>
                              <span className="progress-bar__value">
                                40%
                              </span>
                            </div>
                            <div className="progress-bar__wrapper">
                              <progress id="progress-bar" value="40" max="100"></progress>
                            </div>
                          </div>
                          <div className="row d-flex justify-content-between align-items-center">
                            <div className="col-lg-8 col-7">
                              <div className="token_code1">
                                <span>SS250</span>
                              </div>
                            </div>
                            <div className="col-lg-4 col-5">
                              <div className="text-end">
                                <a href="trade.html" className="btn btn-success btn-sm">Buy</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 col-12 mb-lg-0 mb-2">
                        <div className="coinpump-item-wrapper">
                          <div className="border-sprater">
                            <div className="row">
                              <div className="col-lg-4 col-3 pe-0">
                                <a href="trade.html" className="coinpump-item-thumbs">
                                  <img src="/img/coin/1.jfif" />
                                </a>
                              </div>
                              <div className="col-lg-8 col-9 ps-0">
                                <div className="coinpump-item-content">
                                  <div className="coinpump-item-details">
                                    <div className="coinpump-item-head">
                                      <strong className="me-1">MANHUNT</strong>
                                      <span className="ellipsis-100">Charlie Kirk Shooter</span>
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

                                    <div className="item-list-view mt-1">
                                      <ul>
                                        <li className="d-flex justify-content-between align-items-center me-0">
                                          <span>Created By:</span>
                                          <span>
                                            <a href="trade.html" title="Wallet Address">tCL7...pump</a></span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                          <span>Market Cap:</span>
                                          <span> 35.5 M</span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>


                              </div>
                            </div>
                          </div>
                          <div className="token-bonding-progress mt-2">
                            <div className="token-bonding-head d-flex justify-content-between align-items-center">
                              <span>Bonding Curve Progress</span>
                              <span className="progress-bar__value">
                                40%
                              </span>
                            </div>
                            <div className="progress-bar__wrapper">
                              <progress id="progress-bar" value="40" max="100"></progress>
                            </div>
                          </div>
                          <div className="row d-flex justify-content-between align-items-center">
                            <div className="col-lg-8 col-7">
                              <div className="token_code1">
                                <span>SS250</span>
                              </div>
                            </div>
                            <div className="col-lg-4 col-5">
                              <div className="text-end">
                                <a href="trade.html" className="btn btn-success btn-sm">Buy</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="swiper-slide">
                    <div className="row">
                      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 col-12 pe-lg-0 mb-lg-0 mb-2">
                        <div className="coinpump-item-wrapper">
                          <div className="border-sprater">
                            <div className="row">
                              <div className="col-lg-4 col-3 pe-0">
                                <a href="trade.html" className="coinpump-item-thumbs">
                                  <img src="/img/coin/1.jfif" />
                                </a>
                              </div>
                              <div className="col-lg-8 col-9 ps-0">
                                <div className="coinpump-item-content">
                                  <div className="coinpump-item-details">
                                    <div className="coinpump-item-head">
                                      <strong className="me-1">MANHUNT</strong>
                                      <span className="ellipsis-100">Charlie Kirk Shooter</span>
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

                                    <div className="item-list-view mt-1">
                                      <ul>
                                        <li className="d-flex justify-content-between align-items-center me-0">
                                          <span>Created By:</span>
                                          <span>
                                            <a href="trade.html" title="Wallet Address">tCL7...pump</a></span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                          <span>Market Cap:</span>
                                          <span> 35.5 M</span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>


                              </div>
                            </div>
                          </div>
                          <div className="token-bonding-progress mt-2">
                            <div className="token-bonding-head d-flex justify-content-between align-items-center">
                              <span>Bonding Curve Progress</span>
                              <span className="progress-bar__value">
                                40%
                              </span>
                            </div>
                            <div className="progress-bar__wrapper">
                              <progress id="progress-bar" value="40" max="100"></progress>
                            </div>
                          </div>
                          <div className="row d-flex justify-content-between align-items-center">
                            <div className="col-lg-8 col-7">
                              <div className="token_code1">
                                <span>SS250</span>
                              </div>
                            </div>
                            <div className="col-lg-4 col-5">
                              <div className="text-end">
                                <a href="trade.html" className="btn btn-success btn-sm">Buy</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 col-12 mb-lg-0 mb-2">
                        <div className="coinpump-item-wrapper">
                          <div className="border-sprater">
                            <div className="row">
                              <div className="col-lg-4 col-3 pe-0">
                                <a href="trade.html" className="coinpump-item-thumbs">
                                  <img src="/img/coin/1.jfif" />
                                </a>
                              </div>
                              <div className="col-lg-8 col-9 ps-0">
                                <div className="coinpump-item-content">
                                  <div className="coinpump-item-details">
                                    <div className="coinpump-item-head">
                                      <strong className="me-1">MANHUNT</strong>
                                      <span className="ellipsis-100">Charlie Kirk Shooter</span>
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

                                    <div className="item-list-view mt-1">
                                      <ul>
                                        <li className="d-flex justify-content-between align-items-center me-0">
                                          <span>Created By:</span>
                                          <span>
                                            <a href="trade.html" title="Wallet Address">tCL7...pump</a></span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                          <span>Market Cap:</span>
                                          <span> 35.5 M</span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>


                              </div>
                            </div>
                          </div>
                          <div className="token-bonding-progress mt-2">
                            <div className="token-bonding-head d-flex justify-content-between align-items-center">
                              <span>Bonding Curve Progress</span>
                              <span className="progress-bar__value">
                                40%
                              </span>
                            </div>
                            <div className="progress-bar__wrapper">
                              <progress id="progress-bar" value="40" max="100"></progress>
                            </div>
                          </div>
                          <div className="row d-flex justify-content-between align-items-center">
                            <div className="col-lg-8 col-7">
                              <div className="token_code1">
                                <span>SS250</span>
                              </div>
                            </div>
                            <div className="col-lg-4 col-5">
                              <div className="text-end">
                                <a href="trade.html" className="btn btn-success btn-sm">Buy</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="newstyle-wrapper">
              <div className="section-head d-flex justify-content-between align-items-center">
                <div className="section-title">Dex Listed</div>
                <div className="swiper-arrow">
                  <div className="swiper-button-prev DexP"></div>
                  <div className="swiper-button-next DexN"></div>
                </div>
              </div>
              <div className="swiper DexSwiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="row">
                      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 col-12 pe-lg-0 mb-lg-0 mb-2">
                        <div className="coinpump-item-wrapper">
                          <div className="border-sprater">
                            <div className="row">
                              <div className="col-lg-4 col-3 pe-0">
                                <a href="trade.html" className="coinpump-item-thumbs">
                                  <img src="/img/FiveDollar-memecoin.png" />
                                </a>
                              </div>
                              <div className="col-lg-8 col-9 ps-0">
                                <div className="coinpump-item-content">
                                  <div className="coinpump-item-details">
                                    <div className="coinpump-item-head">
                                      <strong className="me-1">$Five</strong>
                                      <span className="ellipsis-100">Five Dollar Memecoin</span>
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

                                    <div className="item-list-view mt-1">
                                      <ul>
                                        <li className="d-flex justify-content-between align-items-center me-0">
                                          <span>Created By:</span>
                                          <span>
                                            <a href="trade.html" title="Wallet Address">tCL7...pump</a></span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                          <span>Market Cap:</span>
                                          <span> 35.5 M</span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>


                              </div>
                            </div>
                          </div>

                          <div className="row d-flex justify-content-between align-items-center">
                            <div className="col-lg-8 col-7">
                              <div className="token_code1">
                                <span>SS250</span>
                              </div>

                            </div>
                            <div className="col-lg-4 col-5">
                              <div className="text-end">
                                <a href="trade.html" className="btn btn-success btn-sm">Buy</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 col-12 mb-lg-0 mb-2">
                        <div className="coinpump-item-wrapper">
                          <div className="border-sprater">
                            <div className="row">
                              <div className="col-lg-4 col-3 pe-0">
                                <a href="trade.html" className="coinpump-item-thumbs">
                                  <img src="/img/coin/1.jfif" />
                                </a>
                              </div>
                              <div className="col-lg-8 col-9 ps-0">
                                <div className="coinpump-item-content">
                                  <div className="coinpump-item-details">
                                    <div className="coinpump-item-head">
                                      <strong className="me-1">MANHUNT</strong>
                                      <span className="ellipsis-100">Charlie Kirk Shooter</span>
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

                                    <div className="item-list-view mt-1">
                                      <ul>
                                        <li className="d-flex justify-content-between align-items-center me-0">
                                          <span>Created By:</span>
                                          <span>
                                            <a href="trade.html" title="Wallet Address">tCL7...pump</a></span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                          <span>Market Cap:</span>
                                          <span> 35.5 M</span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>


                              </div>
                            </div>
                          </div>

                          <div className="row d-flex justify-content-between align-items-center">
                            <div className="col-lg-8 col-7">
                              <div className="token_code1">
                                <span>SS250</span>
                              </div>

                            </div>
                            <div className="col-lg-4 col-5">
                              <div className="text-end">
                                <a href="trade.html" className="btn btn-success btn-sm">Buy</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="row">
                      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 col-12 pe-lg-0 mb-lg-0 mb-2">
                        <div className="coinpump-item-wrapper">
                          <div className="border-sprater">
                            <div className="row">
                              <div className="col-lg-4 col-3 pe-0">
                                <a href="trade.html" className="coinpump-item-thumbs">
                                  <img src="/img/coin/1.jfif" />
                                </a>
                              </div>
                              <div className="col-lg-8 col-9 ps-0">
                                <div className="coinpump-item-content">
                                  <div className="coinpump-item-details">
                                    <div className="coinpump-item-head">
                                      <strong className="me-1">MANHUNT</strong>
                                      <span className="ellipsis-100">Charlie Kirk Shooter</span>
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

                                    <div className="item-list-view mt-1">
                                      <ul>
                                        <li className="d-flex justify-content-between align-items-center me-0">
                                          <span>Created By:</span>
                                          <span>
                                            <a href="trade.html" title="Wallet Address">tCL7...pump</a></span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                          <span>Market Cap:</span>
                                          <span> 35.5 M</span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>


                              </div>
                            </div>
                          </div>

                          <div className="row d-flex justify-content-between align-items-center">
                            <div className="col-lg-8 col-7">
                              <div className="token_code1">
                                <span>SS250</span>
                              </div>

                            </div>
                            <div className="col-lg-4 col-5">
                              <div className="text-end">
                                <a href="trade.html" className="btn btn-success btn-sm">Buy</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 col-12 mb-lg-0 mb-2">
                        <div className="coinpump-item-wrapper">
                          <div className="border-sprater">
                            <div className="row">
                              <div className="col-lg-4 col-3 pe-0">
                                <a href="trade.html" className="coinpump-item-thumbs">
                                  <img src="/img/coin/1.jfif" />
                                </a>
                              </div>
                              <div className="col-lg-8 col-9 ps-0">
                                <div className="coinpump-item-content">
                                  <div className="coinpump-item-details">
                                    <div className="coinpump-item-head">
                                      <strong className="me-1">MANHUNT</strong>
                                      <span className="ellipsis-100">Charlie Kirk Shooter</span>
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

                                    <div className="item-list-view mt-1">
                                      <ul>
                                        <li className="d-flex justify-content-between align-items-center me-0">
                                          <span>Created By:</span>
                                          <span>
                                            <a href="trade.html" title="Wallet Address">tCL7...pump</a></span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                          <span>Market Cap:</span>
                                          <span> 35.5 M</span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>


                              </div>
                            </div>
                          </div>

                          <div className="row d-flex justify-content-between align-items-center">
                            <div className="col-lg-8 col-7">
                              <div className="token_code1">
                                <span>SS250</span>
                              </div>

                            </div>
                            <div className="col-lg-4 col-5">
                              <div className="text-end">
                                <a href="trade.html" className="btn btn-success btn-sm">Buy</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="row">
                      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 col-12 pe-lg-0 mb-lg-0 mb-2">
                        <div className="coinpump-item-wrapper">
                          <div className="border-sprater">
                            <div className="row">
                              <div className="col-lg-4 col-3 pe-0">
                                <a href="trade.html" className="coinpump-item-thumbs">
                                  <img src="/img/coin/1.jfif" />
                                </a>
                              </div>
                              <div className="col-lg-8 col-9 ps-0">
                                <div className="coinpump-item-content">
                                  <div className="coinpump-item-details">
                                    <div className="coinpump-item-head">
                                      <strong className="me-1">MANHUNT</strong>
                                      <span className="ellipsis-100">Charlie Kirk Shooter</span>
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

                                    <div className="item-list-view mt-1">
                                      <ul>
                                        <li className="d-flex justify-content-between align-items-center me-0">
                                          <span>Created By:</span>
                                          <span>
                                            <a href="trade.html" title="Wallet Address">tCL7...pump</a></span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                          <span>Market Cap:</span>
                                          <span> 35.5 M</span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>


                              </div>
                            </div>
                          </div>

                          <div className="row d-flex justify-content-between align-items-center">
                            <div className="col-lg-8 col-7">
                              <div className="token_code1">
                                <span>SS250</span>
                              </div>

                            </div>
                            <div className="col-lg-4 col-5">
                              <div className="text-end">
                                <a href="trade.html" className="btn btn-success btn-sm">Buy</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 col-12 mb-lg-0 mb-2">
                        <div className="coinpump-item-wrapper">
                          <div className="border-sprater">
                            <div className="row">
                              <div className="col-lg-4 col-3 pe-0">
                                <a href="trade.html" className="coinpump-item-thumbs">
                                  <img src="/img/coin/1.jfif" />
                                </a>
                              </div>
                              <div className="col-lg-8 col-9 ps-0">
                                <div className="coinpump-item-content">
                                  <div className="coinpump-item-details">
                                    <div className="coinpump-item-head">
                                      <strong className="me-1">MANHUNT</strong>
                                      <span className="ellipsis-100">Charlie Kirk Shooter</span>
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

                                    <div className="item-list-view mt-1">
                                      <ul>
                                        <li className="d-flex justify-content-between align-items-center me-0">
                                          <span>Created By:</span>
                                          <span>
                                            <a href="trade.html" title="Wallet Address">tCL7...pump</a></span>
                                        </li>
                                        <li className="d-flex justify-content-between align-items-center">
                                          <span>Market Cap:</span>
                                          <span> 35.5 M</span>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>


                              </div>
                            </div>
                          </div>

                          <div className="row d-flex justify-content-between align-items-center">
                            <div className="col-lg-8 col-7">
                              <div className="token_code1">
                                <span>SS250</span>
                              </div>

                            </div>
                            <div className="col-lg-4 col-5">
                              <div className="text-end">
                                <a href="trade.html" className="btn btn-success btn-sm">Buy</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default ReadyToPump
