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
      "Browse a wide selection of apartments, villas, and houses. Our platform connects you with trusted sellers and landlords, making your property search smooth and hassle-free.",
    image: prop1,
    imageWidthClass: "lg:w-1/2",
  },
  {
    title: "Sell or Rent Your Property Easily.",
    description:
      "List your property in minutes and reach thousands of potential buyers or tenants. Add images, descriptions, and prices to get noticed quickly and securely.",
    image: prop2,
    imageWidthClass: "lg:w-5/12",
  },
  {
    title: "Connect with Trusted Agents & Buyers.",
    description:
      "Our platform ensures secure transactions and reliable contacts. Get real-time updates, schedule visits, and finalize deals with confidence. Your ideal property experience starts here.",
    image: prop3,
    imageWidthClass: "lg:w-4/12",
  },
];

export default function HeroSection() {
  return (
    <section className="py-20 w-full bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
              <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 w-full">
                {/* Text Section */}
                <div className="lg:w-1/2 text-center lg:text-left">
                  <h2 className="text-3xl lg:text-5xl font-bold text-base-400 mb-4 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-base-400/70 dark:text-gray-300 text-base lg:text-lg leading-relaxed mb-6">
                    {slide.description}
                  </p>
                  <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-md transition-colors">
                    Explore Now
                  </button>
                </div>

                {/* Image Section */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`w-full ${slide.imageWidthClass} max-w-sm lg:max-w-md mx-auto rounded-xl shadow-xl object-cover h-86`}
                />
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
