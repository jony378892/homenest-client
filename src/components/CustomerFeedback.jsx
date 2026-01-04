import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import FeedbackCard from "./FeedbackCard";

const feedbacks = [
  {
    id: 1,
    name: "Rahim Uddin",
    role: "Property Seller",
    company: "Private Owner",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    review:
      "I sold my apartment in two weeks — great exposure and smooth communication with buyers.",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "Homebuyer",
    company: "Buyer",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
    review:
      "Listing my house was easy; the platform connected me to verified buyers and I closed quickly.",
  },
  {
    id: 3,
    name: "Imran Hossain",
    role: "Renter",
    company: "Tenant",
    photo: "https://randomuser.me/api/portraits/men/65.jpg",
    rating: 5,
    review:
      "Clear property details and fast responses helped me find the perfect apartment within days.",
  },
  {
    id: 4,
    name: "Farzana Akter",
    role: "Agent",
    company: "Urban Realty",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4,
    review:
      "Reliable listings and responsive support — a trustworthy place to find clients and close deals.",
  },
];

export default function CustomerFeedback() {
  return (
    <section className="pt-16 bg-base-100" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-lg font-semibold text-red-600 uppercase">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-base-400 mt-2">
            What Our Clients Say
          </h2>
        </div>

        <Swiper
          loop={true}
          grabCursor={true}
          spaceBetween={24}
          centeredSlides={true}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1.1 },
            768: { slidesPerView: 1.4 },
            1024: { slidesPerView: 2 },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {feedbacks.map((feedback) => (
            <SwiperSlide key={feedback.id} className="pb-8">
              <FeedbackCard feedback={feedback} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .swiper-pagination-bullet {
          background-color: rgba(239, 68, 68, 0.35);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background-color: #ef4444; /* Tailwind red-500 */
        }
      `}</style>
    </section>
  );
}
