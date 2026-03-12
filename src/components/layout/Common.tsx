
import video from "/assets/video/bg-video.mp4";

function Common() {
  return (
   <>
    <div className="sec-divider top"> </div>
      <div className="sec-divider top"> </div>
      <div className="sec-divider bottom"> </div>
      <video className="highlights-video" autoPlay muted loop playsInline>
        <source src={video} type="video/mp4" />
      </video>
   </>
  )
}

export default Common