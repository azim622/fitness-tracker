import React, { useEffect } from "react"
import Glide from "@glidejs/glide"

const Banner = () => {
    useEffect(() => {
        const slider = new Glide(".glide-02", {
          type: "carousel",
          focusAt: "center",
          perView: 3,
          autoplay: 3500,
          animationDuration: 700,
          gap: 24,
          classNames: {
            nav: {
              active: "[&>*]:bg-wuiSlate-700",
            },
          },
          breakpoints: {
            1024: {
              perView: 2,
            },
            640: {
              perView: 1,
            },
          },
        }).mount()
    
        return () => {
          slider.destroy()
        }
      }, [])
    return (
        <div>
             {/*<!-- Component: Carousel with indicators inside --> */}
      <div className="glide-02 relative w-full">
        {/*    <!-- Slides --> */}
        <div className="overflow-hidden" data-glide-el="track">
          <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
            <li>
              <img
                src="https://i.ibb.co.com/9pK85PR/DALL-E-2025-01-14-00-31-16-A-vibrant-and-dynamic-fitness-tracker-website-banner-image-featuring-an-a.webp"
                className="m-auto max-h-full w-full max-w-full"
              />
            </li>
            <li>
              <img
                src="https://i.ibb.co.com/RQnQnXp/DALL-E-2025-01-14-00-29-35-A-dynamic-and-vibrant-fitness-themed-banner-image-for-a-website-showcasin.webp"
                className="m-auto max-h-full w-full max-w-full"
              />
            </li>
            <li>
              <img
                src="https://i.ibb.co.com/RSzN7YW/premium-photo-1670505062582-fdaa83c23c9e.jpg"
                className="m-auto max-h-full w-full max-w-full"
              />
            </li>
            <li>
              <img
                src="https://i.ibb.co.com/PCM6cJ2/smart-watch-technology-with-sport-fitness-tracker-advertising-poster-website-banner-realistic-design.jpg"
                className="m-auto h-8/12 w-full max-w-full"
              />
            </li>
            <li>
              <img
                src="https://i.ibb.co.com/BPWscpq/fitness-center-banner-design-template-23-2150017348.jpg"
                className="m-auto max-h-full w-full max-w-full"
              />
            </li>
          </ul>
        </div>
        {/*    <!-- Indicators --> */}
        <div
          className="absolute bottom-0 flex w-full items-center justify-center gap-2"
          data-glide-el="controls[nav]"
        >
          <button
            className="group p-4"
            data-glide-dir="=0"
            aria-label="goto slide 1"
          >
            <span className="block h-2 w-2 rounded-full bg-white/20 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
          </button>
          <button
            className="group p-4"
            data-glide-dir="=1"
            aria-label="goto slide 2"
          >
            <span className="block h-2 w-2 rounded-full bg-white/20 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
          </button>
          <button
            className="group p-4"
            data-glide-dir="=2"
            aria-label="goto slide 3"
          >
            <span className="block h-2 w-2 rounded-full bg-white/20 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
          </button>
          <button
            className="group p-4"
            data-glide-dir="=3"
            aria-label="goto slide 4"
          >
            <span className="block h-2 w-2 rounded-full bg-white/20 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
          </button>
        </div>
      </div>
      {/*<!-- End Carousel with indicators inside --> */}
        </div>
    );
};

export default Banner;