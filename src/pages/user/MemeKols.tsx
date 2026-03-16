import { useEffect } from 'react'

function MemeKols() {


  useEffect(() => {

    if (window.Swiper) {

      new window.Swiper(".retweetBoard", {
        spaceBetween: 20,
        loop: true,
        autoplay: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          350: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        },
      });

    }

  }, []);

  return (
    <>

      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="SOL-page-title text-center"><span>MemeKOLs</span></div>
              <div className="row justify-content-center">
                <div className="col-lg-9">
                  <div className="style-wrapper text-center word-break-unset">
                    <img src={`${import.meta.env.BASE_URL}img/sad.png`} className="mb-3" />
                    <h4>Thank you for your interest in MemeKOLs.</h4>
                    <h4> Eligibility criteria not met. A minimum of <span className="text-warning">500</span> followers on your
                      X (Twitter) account is required to access MemeKOLs.</h4>
                  </div>
                </div>
              </div>
              <div className="">

                <div className="card pumpCard mb-3 overlay-container">


                  <div className="card-header d-flex justify-content-between align-items-center bg-gradient-violet">
                    <h4 className="card-title">Retweet Board <div style={{ fontSize: "12px" }}>Daily Retweet Limit: 10 per user
                    </div>
                    </h4>
                    <a href="retweet-board.html" className="text-white text-end"><i
                      className="fa-light fa-eye me-1"></i><strong>50</strong>
                      <span className="opacity-75">Retweet</span>
                      <br />
                      <span className="btn btn-sm btn-light">History</span>
                    </a>
                  </div>
                  <div className="card-body overlay-container">
                    <div className="Xavailable">
                      <h4>Total Retweet available today: 10</h4>
                    </div>
                    <div className="swiper retweetBoard">
                      <div className="swiper-wrapper">
                        <div className="swiper-slide">
                          <div className="tweet-post-wrapper">
                            <div className="tweet-poster-details">
                              <div className="tweet-poster-thumbs">
                                <img src={`${import.meta.env.BASE_URL}img/profile4.jpeg`} />
                              </div>
                              <div className="tweet-poster-name">
                                <h4>Elon Musk</h4>
                                <h5>@elonmusk</h5>
                              </div>

                              <a href="#!" className="btn btn-dark btn-sm"><i
                                className="fa-light fa-arrows-retweet me-1"></i>Retweet</a>

                            </div>
                            <div className="tweet-post-body">
                              <p>Elon Musk responded to a Tesla supporter on X, emphasizing that Full Self-Driving
                                technology
                                and
                                robotaxis will create new wealth by expanding the global economy rather than redistributing
                                existing resources. The post, made on September 22, 2025, followed the supporter's
                                announcement
                                of
                                a $50,000 investment in Tesla stock. Tesla shares rose nearly 2% in overnight trading to
                                around
                                $434, amid preparations for a major FSD software update this month and expansion of
                                unsupervised
                                operations to additional U.S. cities by year-end.
                              </p>
                            </div>
                            <div className="tweet-post-thumbs">
                              <img src="https://pbs.twimg.com/media/G1fHjU9WsAAmEhO?format=jpg&name=small" />
                            </div>
                            <div className="rewardsPoints">
                              <img src={`${import.meta.env.BASE_URL}img/xp-icon.svg`} />20 XP
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="tweet-post-wrapper">
                            <div className="tweet-poster-details">
                              <div className="tweet-poster-thumbs">
                                <img src={`${import.meta.env.BASE_URL}img/profile5.jpeg`} />
                              </div>
                              <div className="tweet-poster-name">
                                <h4>Sophie Sarah</h4>
                                <h5>@sophie</h5>
                              </div>

                              <a href="#!" className="btn btn-dark btn-sm"><i
                                className="fa-light fa-arrows-retweet me-1"></i>Retweet</a>

                            </div>
                            <div className="tweet-post-body">
                              <p>
                                Almost half of Americans don’t like Elon Musk, if you like him leave a red heart or give him
                                thumbs up
                              </p>
                            </div>
                            <div className="tweet-post-thumbs">
                              <img src="https://blog.breet.io/wp-content/uploads/2025/10/what-is-web3-in-crypto.webp" />
                            </div>
                            <div className="rewardsPoints">
                              <img src={`${import.meta.env.BASE_URL}img/xp-icon.svg`} />20 XP
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="tweet-post-wrapper">
                            <div className="tweet-poster-details">
                              <div className="tweet-poster-thumbs">
                                <img src={`${import.meta.env.BASE_URL}img/profile6.jpeg`} />
                              </div>
                              <div className="tweet-poster-name">
                                <h4>Gelbero Anderson</h4>
                                <h5>@gelbero_anderson</h5>
                              </div>

                              <a href="#!" className="btn btn-dark btn-sm"><i
                                className="fa-light fa-arrows-retweet me-1"></i>Retweet</a>

                            </div>
                            <div className="tweet-post-body">
                              <p>
                                Almost half of Americans don’t like Elon Musk, if you like him leave a red heart or give him
                                thumbs up
                              </p>
                            </div>
                            <div className="tweet-post-thumbs">
                              <img src="https://pbs.twimg.com/media/G1g-dDIboAAV6wA?format=jpg&name=small" />
                            </div>
                            <div className="rewardsPoints">
                              <img src={`${import.meta.env.BASE_URL}img/xp-icon.svg`} />20 XP
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="tweet-post-wrapper">
                            <div className="tweet-poster-details">
                              <div className="tweet-poster-thumbs">
                                <img src={`${import.meta.env.BASE_URL}img/profile4.jpeg`} />
                              </div>
                              <div className="tweet-poster-name">
                                <h4>Elon Musk</h4>
                                <h5>@elonmusk</h5>
                              </div>

                              <a href="#!" className="btn btn-dark btn-sm"><i
                                className="fa-light fa-arrows-retweet me-1"></i>Retweet</a>

                            </div>
                            <div className="tweet-post-body">
                              <p>Elon Musk responded to a Tesla supporter on X, emphasizing that Full Self-Driving
                                technology
                                and
                                robotaxis will create new wealth by expanding the global economy rather than redistributing
                                existing resources. The post, made on September 22, 2025, followed the supporter's
                                announcement
                                of
                                a $50,000 investment in Tesla stock. Tesla shares rose nearly 2% in overnight trading to
                                around
                                $434, amid preparations for a major FSD software update this month and expansion of
                                unsupervised
                                operations to additional U.S. cities by year-end.
                              </p>
                            </div>
                            <div className="tweet-post-thumbs">
                              <img src="https://pbs.twimg.com/media/G1fHjU9WsAAmEhO?format=jpg&name=small" />
                            </div>
                            <div className="rewardsPoints">
                              <img src={`${import.meta.env.BASE_URL}img/xp-icon.svg`} />20 XP
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="tweet-post-wrapper">
                            <div className="tweet-poster-details">
                              <div className="tweet-poster-thumbs">
                                <img src={`${import.meta.env.BASE_URL}img/profile5.jpeg`} />
                              </div>
                              <div className="tweet-poster-name">
                                <h4>Sophie Sarah</h4>
                                <h5>@sophie</h5>
                              </div>

                              <a href="#!" className="btn btn-dark btn-sm"><i
                                className="fa-light fa-arrows-retweet me-1"></i>Retweet</a>

                            </div>
                            <div className="tweet-post-body">
                              <p>
                                Almost half of Americans don’t like Elon Musk, if you like him leave a red heart or give him
                                thumbs up
                              </p>
                            </div>
                            <div className="tweet-post-thumbs">
                              <img src="https://blog.breet.io/wp-content/uploads/2025/10/what-is-web3-in-crypto.webp" />
                            </div>
                            <div className="rewardsPoints">
                              <img src={`${import.meta.env.BASE_URL}img/xp-icon.svg`} />20 XP
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="tweet-post-wrapper">
                            <div className="tweet-poster-details">
                              <div className="tweet-poster-thumbs">
                                <img src={`${import.meta.env.BASE_URL}img/profile6.jpeg`} />
                              </div>
                              <div className="tweet-poster-name">
                                <h4>Gelbero Anderson</h4>
                                <h5>@gelbero_anderson</h5>
                              </div>

                              <a href="#!" className="btn btn-dark btn-sm"><i
                                className="fa-light fa-arrows-retweet me-1"></i>Retweet</a>

                            </div>
                            <div className="tweet-post-body">
                              <p>
                                Almost half of Americans don’t like Elon Musk, if you like him leave a red heart or give him
                                thumbs up
                              </p>
                            </div>
                            <div className="tweet-post-thumbs">
                              <img src="https://pbs.twimg.com/media/G1g-dDIboAAV6wA?format=jpg&name=small" />
                            </div>
                            <div className="rewardsPoints">
                              <img src={`${import.meta.env.BASE_URL}img/xp-icon.svg`} />20 XP
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="swiper-arrow absolute">
                        <div className="swiper-button-next"></div>
                        <div className="swiper-button-prev"></div>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="card pumpCard mb-3 overlay-container">
                  <div className="card-header d-flex justify-content-between align-items-center bg-gradient-golden">
                    <h4 className="card-title">Tweet Board<div style={{ fontSize: "12px" }}>Daily Tweet Limit: 5 per user</div>
                    </h4>
                    <a href="tweet-board.html" className="text-white text-end"><i
                      className="fa-light fa-eye me-1"></i><strong>7</strong>
                      <span className="opacity-75">Tweet</span><br />
                      <span className="btn btn-sm btn-light">History</span></a>
                  </div>
                  <div className="card-body overlay-container">
                    <div className="Xavailable">
                      <h4>Total Tweets available today: 5</h4>
                    </div>
                    <div className="swiper retweetBoard">
                      <div className="swiper-wrapper">
                        <div className="swiper-slide">
                          <div className="post-list-wrapper">
                            <div className="tweet-poster-details">
                              <div className="tweet-poster-name ms-0">
                                <h4>Description</h4>
                                <h5>Tweet Description</h5>
                              </div>
                              <a href="#!" className="btn btn-dark btn-sm"><i
                                className="fa-light fa-share-from-square me-1"></i>Tweet</a>
                            </div>
                            <div className="post-list-body">
                              <p>Elon Musk responded to a Tesla supporter on X, emphasizing that Full Self-Driving
                                technology
                                and
                                robotaxis will create new wealth by expanding the global
                              </p>

                            </div>
                            <div className="post-list-thumbs">
                              <img src="https://pbs.twimg.com/media/G1fHjU9WsAAmEhO?format=jpg&name=small" />

                            </div>

                            <div className="rewardsPoints">
                              <img src={`${import.meta.env.BASE_URL}img/xp-icon.svg`} />20 XP
                            </div>

                          </div >
                        </div >
                        <div className="swiper-slide">
                          <div className="post-list-wrapper">
                            <div className="tweet-poster-details">
                              <div className="tweet-poster-name ms-0">
                                <h4>Description</h4>
                                <h5>Tweet Description</h5>
                              </div>
                              <a href="#!" className="btn btn-dark btn-sm"><i
                                className="fa-light fa-share-from-square me-1"></i>Tweet</a>
                            </div>
                            <div className="post-list-body">

                              <p>Elon Musk responded to a Tesla supporter on X, emphasizing that Full Self-Driving
                                technology Elon
                                Musk responded to a Tesla supporter on X, emphasizing that Full Self-Driving technology
                                and
                                robotaxis will create new wealth by expanding the global
                              </p>

                            </div>
                            <div className="post-list-thumbs">
                              <img src="https://pbs.twimg.com/media/G1fHjU9WsAAmEhO?format=jpg&name=small" />

                            </div>
                            <div className="rewardsPoints">
                              <img src={`${import.meta.env.BASE_URL}img/xp-icon.svg`} />20 XP
                            </div>

                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="post-list-wrapper">
                            <div className="tweet-poster-details">
                              <div className="tweet-poster-name ms-0">
                                <h4>Description</h4>
                                <h5>Tweet Description</h5>
                              </div>
                              <a href="#!" className="btn btn-dark btn-sm"><i
                                className="fa-light fa-share-from-square me-1"></i>Tweet</a>
                            </div>
                            <div className="post-list-body">

                              <p>Elon Musk responded to a Tesla supporter on X, emphasizing that Full Self-Driving
                                technology
                                and Elon Musk responded to a Tesla supporter on X, emphasizing that Full Self-Driving
                                technology
                                robotaxis will create new wealth by expanding the global
                              </p>

                            </div>
                            <div className="post-list-thumbs">
                              <img src="https://pbs.twimg.com/media/G1fHjU9WsAAmEhO?format=jpg&name=small" />

                            </div>
                            <div className="rewardsPoints">
                              <img src={`${import.meta.env.BASE_URL}img/xp-icon.svg`} />20 XP
                            </div>

                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="post-list-wrapper">
                            <div className="tweet-poster-details">
                              <div className="tweet-poster-name ms-0">
                                <h4>Description</h4>
                                <h5>Tweet Description</h5>
                              </div>
                              <a href="#!" className="btn btn-dark btn-sm"><i
                                className="fa-light fa-share-from-square me-1"></i>Tweet</a>
                            </div>
                            <div className="post-list-body">
                              <p>Elon Musk responded to a Tesla supporter on X, emphasizing that Full Self-Driving
                                technology
                                and
                                robotaxis will create new wealth by expanding the global Elon Musk responded to a Tesla
                                supporter
                                on X, emphasizing that Full Self-Driving technology
                              </p>

                            </div>
                            <div className="post-list-thumbs">
                              <img src="https://pbs.twimg.com/media/G1fHjU9WsAAmEhO?format=jpg&name=small" />

                            </div>
                            <div className="rewardsPoints">
                              <img src={`${import.meta.env.BASE_URL}img/xp-icon.svg`} />20 XP
                            </div>

                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="post-list-wrapper">
                            <div className="tweet-poster-details">
                              <div className="tweet-poster-name ms-0">
                                <h4>Description</h4>
                                <h5>Tweet Description</h5>
                              </div>
                              <a href="#!" className="btn btn-dark btn-sm"><i
                                className="fa-light fa-share-from-square me-1"></i>Tweet</a>
                            </div>
                            <div className="post-list-body">
                              <p>Elon Musk responded to a Tesla supporter on X, emphasizing that Full Self-Driving
                                technology
                                and
                                robotaxis will create new wealth by expanding the global Elon Musk responded to a Tesla
                                supporter
                                on X, emphasizing that Full Self-Driving technology
                              </p>

                            </div>
                            <div className="post-list-thumbs">
                              <img src="https://pbs.twimg.com/media/G1fHjU9WsAAmEhO?format=jpg&name=small" />

                            </div>
                            <div className="rewardsPoints">
                              <img src={`${import.meta.env.BASE_URL}img/xp-icon.svg`} />20 XP
                            </div>

                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="post-list-wrapper">
                            <div className="tweet-poster-details">
                              <div className="tweet-poster-name ms-0">
                                <h4>Description</h4>
                                <h5>Tweet Description</h5>
                              </div>
                              <a href="#!" className="btn btn-dark btn-sm"><i
                                className="fa-light fa-share-from-square me-1"></i>Tweet</a>
                            </div>
                            <div className="post-list-body">
                              <p>Elon Musk responded to a Tesla supporter on X, emphasizing that Full Self-Driving
                                technology
                                and
                                robotaxis will create new wealth by expanding the global Elon Musk responded to a Tesla
                                supporter
                                on X, emphasizing that Full Self-Driving technology
                              </p>

                            </div>
                            <div className="post-list-thumbs">
                              <img src="https://pbs.twimg.com/media/G1fHjU9WsAAmEhO?format=jpg&name=small" />

                            </div>
                            <div className="rewardsPoints">
                              <img src={`${import.meta.env.BASE_URL}img/xp-icon.svg`} />20 XP
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="swiper-arrow absolute">
                        <div className="swiper-button-next"></div>
                        <div className="swiper-button-prev"></div>
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

export default MemeKols