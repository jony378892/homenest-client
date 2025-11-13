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
  const [loading, setLoading] = useState(null);
  const [rating, setRating] = useState(1);
  const { id } = useParams();

  const handleFeedback = (e) => {
    e.preventDefault();

    if (!property || !user) {
      toast.error("Property or user data is missing.");
      return;
    }

    const feedback = e.target.feedback.value;

    const feedbackData = {
      propertyName: property.propertyName,
      image: property.image,
      userName: user.displayName,
      userEmail: user.email,
      feedback,
      rating,
      createdAt: new Date(),
    };

    instance
      .post("/ratings", feedbackData)
      .then((res) => {
        const result = res.data;
        if (result.insertedId) {
          toast.success("Feedback received successfully");
        } else {
          toast.error("Failed to submit feedback");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        e.target.reset();
        setRating(1);
      });
  };

  useEffect(() => {
    setLoading(true);
    instance
      .get(`/property/${id}`)
      .then((data) => {
        setProperty(data.data);
        console.log(data.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [instance, id]);

  if (loading) {
    return <Loading />;
  }

  if (property) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
          <img
            src={property.image}
            alt={property.propertyName}
            className="w-full h-full object-cover"
          />
        </div>

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

        <div className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Ratings & Reviews
          </h2>
          <form
            onSubmit={handleFeedback}
            className="max-w-2xl flex flex-col gap-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <label className="font-semibold text-gray-700 dark:text-gray-200 min-w-[80px]">
                Ratings:
              </label>
              <Rating
                style={{ maxWidth: 140 }}
                value={rating}
                onChange={setRating}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4">
              <label
                htmlFor="feedback"
                className="font-semibold text-gray-700 dark:text-gray-200 min-w-[80px] mt-2 sm:mt-0"
              >
                Feedback:
              </label>
              <textarea
                name="feedback"
                id="feedback"
                placeholder="Write your feedback here..."
                className="w-full sm:w-2/3 h-28 sm:h-32 border border-gray-300 dark:border-gray-600 rounded-xl p-3 outline-none resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-wide self-start px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-md transition-all duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    );
  }
}
