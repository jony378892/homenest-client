import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router";

export default function Featured() {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const instance = useAxios();

  useEffect(() => {
    instance.get("/featured").then((data) => {
      //   console.log(data.data);
      setFeaturedProperties(data.data);
    });
  }, [instance]);

  return (
    <div className="flex flex-col py-10 mx-auto max-w-7xl px-3 md:px-0">
      <div className="text-lg font-semibold text-red-600 uppercase text-center">
        Featured Properties
      </div>
      <h1 className="text-3xl font-semibold text-gray-800 text-center">
        Recommended For You
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16 600">
        {featuredProperties.map((property) => (
          <div className="card bg-base-100  shadow-sm rounded-xl border border-gray-200">
            <figure className="relative">
              <img
                src={property.image}
                alt="Shoes"
                className="h-64 w-full object-cover object-center hover:scale-110 transition-all duration-500 "
              />
              <div className="absolute badge rounded-sm bg-white text-xs font-semibold bottom-4 left-4">
                {property.category}
              </div>
            </figure>
            <div className="card-body">
              <h2 className="card-title text-red-600">
                {property.propertyName}
              </h2>
              <div className="flex gap-2 text-gray-600 items-center">
                <CiLocationOn /> {property.location}
              </div>
              <p className="pb-2">{property.shortDescription}</p>
              <div className="card-actions justify-between items-center border-t border-gray-200 pt-4">
                <div className="text-xl font-bold">
                  ${property.propertyPrice}
                </div>
                <Link
                  to={`/property-details/${property._id}`}
                  className="btn bg-gray-200 rounded-md"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center my-16">
        <Link
          to="/all-properties"
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-sm"
        >
          View All Properties
        </Link>
      </div>
    </div>
  );
}
