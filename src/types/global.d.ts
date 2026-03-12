export {};

declare global {
  interface Window {
    Swiper: any;
  }

  namespace JSX {
    interface IntrinsicElements {
      marquee: any;
    }
  }
}