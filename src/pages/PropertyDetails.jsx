import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Rating } from "@smastrom/react-rating";
import useAxios from "../hooks/useAxios";
import useAuthContext from "../hooks/useAuthContext";
import { toast } from "react-hot-toast";
import Loading from "../components/Loading";

export default function PropertyDetails() {
  const instance = useAxios();
  const { user } = useAuthContext();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const { id } = useParams();

  const handleFeedback = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in to submit feedback");
      return;
    }

    if (!property) {
      toast.error("Property data is missing");
      return;
    }

    const feedback = e.target.feedback.value.trim();

    if (!feedback) {
      toast.error("Please write your feedback");
      return;
    }

    if (feedback.length < 10) {
      toast.error("Feedback must be at least 10 characters long");
      return;
    }

    setSubmitting(true);

    const feedbackData = {
      propertyName: property.propertyName,
      image: property.image,
      userName: user.displayName,
      userEmail: user.email,
      feedback,
      rating,
      createdAt: new Date(),
    };

    try {
      const res = await instance.post("/ratings", feedbackData);
      const result = res.data;

      if (result.insertedId) {
        toast.success("Feedback submitted successfully!");
        e.target.reset();
        setRating(1);
      } else {
        toast.error("Failed to submit feedback");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const { data } = await instance.get(`/property/${id}`);
        setProperty(data);
      } catch (error) {
        toast.error(error.message || "Failed to load property");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [instance, id]);

  if (loading) {
    return <Loading />;
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Property Not Found
          </h2>
          <p className="text-gray-600">
            The property you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Property Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 transform transition-all duration-300 hover:shadow-2xl">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Property Image */}
            <div className="relative h-64 md:h-full min-h-[400px] overflow-hidden group">
              <img
                src={property.image}
                alt={property.propertyName}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Property Info */}
            <div className="p-8 md:p-10 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {property.propertyName}
                </h1>

                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {property.shortDescription}
                </p>

                <div className="space-y-4">
                  {/* Category */}
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Category
                      </p>
                      <p className="text-gray-900 font-semibold">
                        {property.category}
                      </p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 text-green-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Location
                      </p>
                      <p className="text-gray-900 font-semibold">
                        {property.location}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Price</p>
                      <p className="text-2xl font-bold text-red-600">
                        ${property.propertyPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Posted Date */}
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 text-purple-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm text-gray-500 font-medium">
                        Posted on
                      </p>
                      <p className="text-gray-900 font-semibold">
                        {new Date(property.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Owner Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-3 font-medium">
                  Listed by
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {property.userName?.charAt(0).toUpperCase() || "?"}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {property.userName}
                    </p>
                    <p className="text-sm text-gray-600">
                      {property.userEmail}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ratings & Reviews Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <svg
              className="w-8 h-8 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <h2 className="text-3xl font-bold text-gray-900">
              Ratings & Reviews
            </h2>
          </div>

          {user ? (
            <form onSubmit={handleFeedback} className="space-y-6">
              {/* Rating Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Your Rating
                </label>
                <div className="flex items-center gap-4">
                  <Rating
                    value={rating}
                    onChange={setRating}
                    style={{ maxWidth: 180 }}
                    className="transition-all duration-200"
                  />
                  <span className="text-lg font-semibold text-gray-700">
                    {rating} {rating === 1 ? "star" : "stars"}
                  </span>
                </div>
              </div>

              {/* Feedback Input */}
              <div>
                <label
                  htmlFor="feedback"
                  className="block text-sm font-semibold text-gray-700 mb-3"
                >
                  Your Feedback
                </label>
                <textarea
                  id="feedback"
                  name="feedback"
                  rows={5}
                  required
                  minLength={10}
                  placeholder="Share your thoughts about this property... (minimum 10 characters)"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Submit Feedback
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-8 text-center">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Login Required
              </h3>
              <p className="text-gray-600 mb-6">
                Please log in to leave a review and rating for this property.
              </p>
              <button
                onClick={() => (window.location.href = "/login")}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Go to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
