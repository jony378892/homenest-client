import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FaStar } from "react-icons/fa";
import useAxios from "../hooks/useAxios";

export default function PropertyDetails() {
  const instance = useAxios();
  const [property, setProperty] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    instance.get(`/property/${id}`).then((res) => {
      setProperty(res.data);
    });
  }, [instance, id]);

  if (!property) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading property details...
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      {/* Property Image */}
      <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
        <img
          src={property.image}
          alt={property.propertyName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Property Information */}
      <div className="mt-8 space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          {property.propertyName}
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          {property.shortDescription}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mt-6">
          <p>
            <span className="font-semibold text-gray-800">Category:</span>{" "}
            {property.category}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Location:</span>{" "}
            {property.location}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Price:</span> $
            {property.propertyPrice.toLocaleString()}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Posted on:</span>{" "}
            {new Date(property.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Posted By */}
      <div className="flex items-center gap-4 mt-8 border-t pt-6">
        <img
          src={property.userPhoto}
          alt={property.userName}
          className="w-14 h-14 rounded-full object-cover border"
        />
        <div>
          <h3 className="font-semibold text-gray-800">{property.userName}</h3>
          <p className="text-gray-600 text-sm">{property.userEmail}</p>
        </div>
      </div>

      {/* Ratings & Reviews */}
      <div className="mt-12 border-t pt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Ratings & Reviews
        </h2>

        {property.ratingsAndReviews && property.ratingsAndReviews.length > 0 ? (
          <div className="space-y-6">
            {property.ratingsAndReviews.map((review, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">
                    {review.reviewerName}
                  </h3>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        } text-lg`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mt-2">{review.review}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet for this property.</p>
        )}
      </div>
    </section>
  );
}
