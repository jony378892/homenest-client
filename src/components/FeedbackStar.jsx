import React from "react";
import { FaStar } from "react-icons/fa";

export default function FeedbackStar({ value = 0 }) {
  return (
    <div className="flex gap-1 mt-1" aria-label={`Rating: ${value} out of 5`}>
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          size={12}
          className={i < value ? "text-yellow-400" : "text-gray-300"}
          aria-hidden
        />
      ))}
    </div>
  );
}
