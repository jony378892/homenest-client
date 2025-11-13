import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router";
import Loading from "../components/Loading";

export default function AllProperties() {
  const [loading, setLoading] = useState(null);
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const instance = useAxios();

  useEffect(() => {
    setLoading(true);
    instance.get("/properties").then((data) => {
      setProperties(data.data);
      setFiltered(data.data);
      setLoading(false);
    });
  }, [instance]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();

    if (!query) {
      setFiltered(properties);
      return;
    }

    const filteredData = properties.filter((property) =>
      property.propertyName.toLowerCase().includes(query)
    );

    setFiltered(filteredData);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col py-10 mx-auto max-w-7xl px-3 md:px-0">
      <h3 className="text-lg font-semibold text-red-600 uppercase text-center">
        All Properties
      </h3>
      <h1 className="text-3xl font-semibold text-base-400 text-center">
        Explore Your Perfect Property
      </h1>

      <div className="flex flex-col gap-2 mt-10">
        <p className="text-lg font-semibold">Search Property:</p>
        <input
          type="text"
          placeholder="Search by name, category, or location"
          className="input input-bordered w-full max-w-md outline-none"
          onChange={handleSearch}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
        {filtered.length > 0 ? (
          filtered.map((property) => (
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
          ))
        ) : (
          <p className="text-center text-gray-500 mt-8">
            No properties found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}
