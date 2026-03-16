import { useEffect, useRef } from "react";

function FiveDollar() {

  // const chartRef = useRef(null);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    script.innerHTML = JSON.stringify({
      allow_symbol_change: true,
      calendar: false,
      details: false,
      hide_side_toolbar: true,
      hide_top_toolbar: false,
      hide_Director: false,
      hide_volume: false,
      hotlist: false,
      interval: "D",
      locale: "en",
      save_image: true,
      style: "1",
      symbol: "NASDAQ:AAPL",
      theme: "dark",
      timezone: "Etc/UTC",
      backgroundColor: "#000",
      gridColor: "rgba(242, 242, 242, 0.06)",
      watchlist: [],
      withdateranges: false,
      compareSymbols: [],
      studies: [],
      width: "100%",
      height: 545,
    });

    if (chartRef.current) {
      chartRef.current.appendChild(script);
    }
  }, []);

  return (
    <>
      <main>
        <div className="container-fluid mb-3">
          <div className="SOL-page-title fs-small text-center">
            <span>Five Dollar Memecoin</span>
          </div>

          <div className="row">

            {/* LEFT SIDE */}
            <div className="col-lg-9">

              <div className="style-wrapper bg-opacity3 mb-3">
                <div className="row align-items-center justify-content-center">
                  <div className="col-lg-8 col-9 pe-0">
                    <div className="coinpump-item-trading">
                      <div className="coinpump-item-trading-thumbs">
                        <img src={`${import.meta.env.BASE_URL}img/FiveDollar-memecoin.png`} />
                      </div>
                      <div className="coinpump-item-trading-details">
                        <div className="coinpump-item-trading-head">
                          <div className="coinTradeTitle">Five Dollar Memecoin</div>
                          <div className="coinTradeName">$Five</div>
                        </div>
                        <div className="item-list-view">
                          <ul>
                            <li><a href="#!"><i className="fa-brands fa-x-twitter"></i></a></li>
                            <li><a href="#!"><i className="fa-regular fa-globe"></i></a></li>
                            <li>| Created by<a href="#!" title="Wallet Address" className="ms-1">tCL7...pump</a> <a href="#!"><i
                              className="fa-regular fa-copy ms-1"></i></a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-3">
                    <div className="coinpump-item-tx-details text-end">
                      <div className="mt-2">
                        <h6 className="mb-1">0.01719 SOL</h6>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="coin-stats-item mt-2">
                  <ul>
                    <li>Market Cap <span>$13.23K</span></li>
                    <li>Vol 24h <span>$13.23K</span></li>
                    <li>Creation Time <span>2026/01/22 08:00:19</span></li>
                  </ul>
                </div>
              </div>

              <div className="row">
                <div className="col mb-3">
                  <div className="coin-stats">
                    <div className="head">Vol 24h</div>
                    <div className="bottom">$33.7K</div>
                  </div>
                </div>

                <div className="col mb-3">
                  <div className="coin-stats">
                    <div className="head">Price</div>
                    <div className="bottom">$0.00000708</div>
                  </div>
                </div>

                <div className="col mb-3">
                  <div className="coin-stats">
                    <div className="head">1h</div>
                    <div className="bottom text-success">-0.92%</div>
                  </div>
                </div>

                <div className="col mb-3">
                  <div className="coin-stats">
                    <div className="head">6h</div>
                    <div className="bottom text-success">+6.58%</div>
                  </div>
                </div>

                <div className="col mb-3">
                  <div className="coin-stats">
                    <div className="head">24h</div>
                    <div className="bottom text-danger">+0.01%</div>
                  </div>
                </div>
              </div>

              {/* TRADING VIEW CHART */}
              <div className="style-wrapper mb-3 p-0">
                <div
                  className="tradingview-widget-container"
                  style={{ borderRadius: "15px", overflow: "hidden" }}
                >
                  <div
                    className="tradingview-widget-container__widget"
                    ref={chartRef}
                  ></div>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="col-lg-3 mt-2 mt-lg-0">
              <div className="style-wrapper bg-opacity3 mb-3">
                <div className="row mb-3">
                  <div className="col-6">
                    <a href="#!" className="btn btn-primary d-block">BUY</a>
                  </div>
                  <div className="col-6"> <a href="#!" className="btn btn-outline-dark d-block">SELL</a>
                  </div>
                </div>

                <div className="row">
                  <div className="col-6"> Balance:</div>
                  <div className="col-6 text-end"> 0 SOL </div>
                  <div className="col-12">
                    <div className="enter-amount-wrp mt-2">
                      <div className="mb-2">
                        <input maxLength={50} />
                        <div className="bycoinLogo">
                          SOL
                          <img src={`${import.meta.env.BASE_URL}img/coin/solana.png`} />
                        </div>
                      </div>
                      <ul>
                        <li><a href="#!">MAX</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-12 mt-2">
                    <a href="#!" className="btn btn-primary d-block">BUY $Five</a>
                  </div>
                </div>



              </div>

              <div className="style-wrapper mb-3 bg-light-info">
                <div className="token-bonding-progress">
                  <div className="token-bonding-head d-flex justify-content-between align-items-center">
                    <span className="fs-small">Total holders</span>
                    <span className="text-success fs-small"> 54253 </span>
                  </div>

                </div>
              </div>

              <div className="style-wrapper bg-opacity3 mb-3">
                <div className="section-head d-flex justify-content-between align-items-center border-bottom pb-2">
                  <div className="section-title">Top holders</div>
                </div>


                <div className="ul-number-list">
                  <ul className="">
                    <li className="d-flex justify-content-between align-items-center"><a href="#!"><u>Liquidity pool <i
                      className="fa-regular fa-droplet"></i></u></a>
                      <span>96.18%</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center"><a href="#!" className="">HErJWf</a>
                      <span>2.42%</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center"><a href="#!" className="">2g5Ecg</a>
                      <span>1.13%</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center"><a href="#!" className="">8x1k5z</a>
                      <span>0.16%</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center"><a href="#!" className="">39otTJ</a>
                      <span>0.08%</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center"><a href="#!" className="">9pj5Jc</a>
                      <span>0.07%</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center"><a href="#!" className="">8G2nSa</a>
                      <span>0.06%</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center"><a href="#!" className="">HXAJis</a>
                      <span>0.05%</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center"><a href="#!" className="">HVe9ac</a>
                      <span>0.04%</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center"><a href="#!" className="">
                      Gt6gPF</a>
                      <span>0.03%</span>
                    </li>


                    <li className="d-flex justify-content-between align-items-center"><a href="#!" className="">9pj5Jc</a>
                      <span>0.07%</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center"><a href="#!" className="">8G2nSa</a>
                      <span>0.06%</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center"><a href="#!" className="">HXAJis</a>
                      <span>0.05%</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center"><a href="#!" className="">HVe9ac</a>
                      <span>0.04%</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center"><a href="#!" className="">
                      Gt6gPF</a>
                      <span>0.03%</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center"><a href="#!" className="">9pj5Jc</a>
                      <span>0.07%</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center"><a href="#!" className="">8G2nSa</a>
                      <span>0.06%</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center"><a href="#!" className="">HXAJis</a>
                      <span>0.05%</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center"><a href="#!" className="">HVe9ac</a>
                      <span>0.04%</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center"><a href="#!" className="">
                      Gt6gPF</a>
                      <span>0.03%</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center"><a href="#!" className="">
                      FvUc8b</a>
                      <span>0.02%</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center"><a href="#!" className="">
                      FNwXRm</a>
                      <span>0.01%</span>
                    </li>

                  </ul>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main >
    </>
  );
}

export default FiveDollar;