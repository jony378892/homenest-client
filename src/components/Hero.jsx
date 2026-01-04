import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import prop1 from "../assets/prop-1.jpg";
import prop2 from "../assets/prop-2.jpg";
import prop3 from "../assets/prop-3.jpg";

const slides = [
  {
    title: "Find Your Dream Home, Effortlessly.",
    description:
      "Explore apartments, villas, and houses from trusted sellers. Find the right home quickly and without hassle.",
    image: prop1,
  },
  {
    title: "Sell or Rent Your Property Easily.",
    description:
      "List your property in minutes and reach verified buyers or tenants with ease.",
    image: prop2,
  },
  {
    title: "Connect with Trusted Agents & Buyers.",
    description:
      "Communicate securely, schedule visits, and close deals with confidence.",
    image: prop3,
  },
];

export default function HeroSection() {
  return (
    <section className="py-3 w-full bg-base-100" data-aos="fade-up">
      <div className="max-w-7xl mx-auto w-full">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={50}
          loop={true}
          className="w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="relative flex flex-col text-white items-center justify-center text-center h-[70vh] bg-top bg-cover w-full"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/60"></div>

                <div className="relative flex flex-col gap-3 items-center max-w-5xl px-4">
                  <h2 className="text-3xl lg:text-5xl font-bold text-base-400 leading-tight">
                    {slide.title}
                  </h2>

                  <p className="text-base-400/70 dark:text-gray-300 text-base lg:text-lg leading-relaxed">
                    {slide.description}
                  </p>

                  <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-md transition-colors w-fit">
                    Explore Now
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Swiper pagination color override */}
      <style>{`
        .swiper-pagination-bullet {
          background-color: rgba(255, 0, 0, 0.3);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background-color: #ef4444; /* Tailwind red-500 */
        }
      `}</style>
    </section>
  );
}
