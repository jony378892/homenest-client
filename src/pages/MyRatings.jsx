import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";
import useAuthContext from "../hooks/useAuthContext";
import toast from "react-hot-toast";
import { Rating } from "@smastrom/react-rating";
import { formatDate } from "../utils/utils";

export default function MyRatings() {
  const [loading, setLoading] = useState(null);
  const [ratings, setRating] = useState([]);
  const { user } = useAuthContext();
  const instance = useAxios();

  useEffect(() => {
    setLoading(true);
    instance
      .get(`/ratings/${user.email}`)
      .then((data) => {
        // console.log(data.data);
        setRating(data.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }, [instance, user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {ratings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ratings.map((property) => (
              <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                  <img src={property.image} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-red-600 border-b border-gray-300 pb-2">
                    {property.propertyName}
                  </h3>
                  <p className="text-lg font-semibold">{property.userName}</p>
                  <p className="font-semibold flex gap-2">
                    Rating:{" "}
                    <Rating
                      style={{ maxWidth: 100 }}
                      value={property.rating}
                      readOnly
                    />
                  </p>
                  <p className="font-semibold">Review: {property.feedback}</p>
                  <p className="font-semibold">
                    {formatDate(property.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl mt-20 font-semibold text-gray-500">
              You haven't reviewed any property yet.
            </h2>
          </div>
        )}
      </div>
    </section>
  );
}
