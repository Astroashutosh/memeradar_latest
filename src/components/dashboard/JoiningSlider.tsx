
import { useState, useEffect } from "react";
import { shorten } from "../../solana/program";
import countries from "i18n-iso-countries";
import en from "i18n-iso-countries/langs/en.json";

function JoiningSlider() {

const [list, setList] = useState<any[]>([]);
countries.registerLocale(en);

useEffect(() => {
  const load = async () => {
    try {
      const res = await fetch(
        "https://demo.dsvinfosolutions.com/bullbnb-solana-design/report_api/api.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: new URLSearchParams({
            table: "joining"
          })
        }
      );

      const data = await res.json();
      setList(data);

    } catch (err) {
      console.error(err);
    }
  };

  load();
}, []);

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

const timeAgo = (dateString: string) => {
  const now = new Date().getTime();
  const past = new Date(dateString).getTime();

  const diff = Math.floor((now - past) / 1000);

  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;

  return `${Math.floor(diff / 86400)} day ago`;
};

const getFlagUrl = (country: string) => {
  if (!country) return "";

  const code = countries.getAlpha2Code(country, "en");

  if (!code) return "";

  return `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
};


  return (
    <>
      <>

        <div className="SOL-page-title fs-small text-center"><span> A Rapidly Growing Global Meme Community</span></div>
        <div className="swiper JoiningSwiper  mb-3">
          {/* <div className="swiper-wrapper">
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
          </div> */}


<div className="swiper-wrapper">
  {list.map((item, i) => (
    <div className="swiper-slide" key={i}>
      <div className="joining-quick-bx">
        <div className="joining-quick-by">

       <img
  src={getFlagUrl(item.country)}
  onError={(e: any) => {
    e.target.src = `${import.meta.env.BASE_URL}img/flag/default.jpg`;
  }}
/>

          <a href="#!">{shorten(item.user)}</a>

          <h5>{item.country || "Global"}</h5>

          <div className="d-flex justify-content-between align-items-center mt-1">
            <h6 className="text-muted">
              {timeAgo(item.datetime)}
            </h6>

            <h6 className={`flash ${item.type === "register" ? "new" : ""}`}>
              {item.type === "register" ? "New" : "Upgrade"}
            </h6>
          </div>

        </div>
      </div>
    </div>
  ))}
</div>

        </div>


      </>
    </>
  )
}

export default JoiningSlider
