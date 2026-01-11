import FeedbackStar from "./FeedbackStar";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

export default function FeedbackCard({ feedback }) {
  return (
    <div className="flex flex-col justify-center items-center gap-6 p-6 border border-gray-300 rounded-2xl shadow-sm hover:shadow-md transition h-64 mb-5">
      {/* Review */}
      <div className="leading-relaxed flex  items-stretch  w-full sm:w-3/4 text-center gap-3 text-lg font-semibold ">
        <FaQuoteLeft className="self-start -mt-8 text-red-600" size={80} />
        <p className="text-sm sm:text-base">“{feedback.review}”</p>
        <FaQuoteRight className="self-end -mb-8 text-red-600" size={80} />
      </div>

      {/* User Info */}
      <div className="flex items-center gap-4">
        <figure>
          <img
            src={feedback.photo}
            alt={feedback.name}
            className="w-12 h-12 rounded-full object-cover border"
          />
        </figure>

        <div className="flex flex-col">
          <p className="text-xs sm:text-sm font-semibold">{feedback.name}</p>
          <FeedbackStar value={feedback.rating} />
        </div>
      </div>
    </div>
  );
}
