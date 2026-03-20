import usePageCSS from "../hooks/usePageCSS";


export default function Loader() {
  usePageCSS("assets/loader.css");

  return (
    <div className="loader-wrapper">
      <div className="loader-box">
        <span className="loader-icon"></span>
      </div>
    </div>
  );
}