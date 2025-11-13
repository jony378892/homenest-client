import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router";
import Loading from "./Loading";

export default function Featured() {
  const [loading, setLoading] = useState(null);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const instance = useAxios();

  useEffect(() => {
    setLoading(true);
    instance.get("/featured").then((res) => {
      setFeaturedProperties(res.data);
      setLoading(false);
    });
  }, [instance]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-lg font-semibold text-red-600 uppercase">
            Featured Properties
          </p>
          <h2 className="text-3xl font-bold text-base-400 mt-2">
            Recommended For You
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <div
              key={property._id}
              className="card bg-white dark:bg-neutral shadow-md hover:shadow-lg transition-all rounded-xl overflow-hidden"
            >
              <figure className="relative group">
                <img
                  src={property.image}
                  alt={property.propertyName}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md shadow-sm">
                  {property.category}
                </div>
              </figure>

              <div className="card-body">
                <h3 className="card-title text-red-600">
                  {property.propertyName}
                </h3>

                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                  <CiLocationOn className="text-red-500 text-lg" />
                  <span>{property.location}</span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-2">
                  {property.shortDescription}
                </p>

                <div className="card-actions justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-4 mt-3">
                  <div className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    ${property.propertyPrice}
                  </div>
                  <Link
                    to={`/property-details/${property._id}`}
                    className="btn btn-sm bg-red-500 text-white border-none hover:bg-red-600 rounded-md"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <Link
            to="/all-properties"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-2 rounded-md"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
}
