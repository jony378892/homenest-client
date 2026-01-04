import { Link } from "react-router";
import { FaRightLong } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../hooks/useSecureAxios";
import Loading from "./Loading";

export default function Cities() {
  const axiosSecure = useSecureAxios();

  const { isLoading, data: cities = [] } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const res = await axiosSecure.get("/cities");
      return res.data;
    },
  });

  return (
    <section className="mx-auto max-w-7xl my-16 px-3 w-full" data-aos="fade-up">
      <div className="text-center mb-12">
        <h3 className="text-lg font-semibold text-red-600 uppercase">
          Explore Cities
        </h3>
        <h1 className="text-3xl font-semibold text-base-400">
          Properties By Cities
        </h1>
      </div>

      {isLoading && <Loading />}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16 w-full">
        {cities.map((city) => (
          <div
            key={city._id}
            className="flex gap-8 items-center h-36 shadow-2xl  rounded-xl overflow-hidden group bg-base-100 hover:bg-red-600 hover:text-white transition-all duration-300 border border-base-300"
          >
            <div className="overflow-hidden w-2/5 h-full">
              <img
                src={city.image}
                alt={city.country}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-red-600 group-hover:text-white font-semibold text-xl">
                {city.city}
              </p>
              <Link
                to="/"
                className="flex gap-2 items-center text-sm font-medium group"
              >
                <span className="text-base-800 relative after:content-[''] after:absolute after:left-0 after:-bottom-[2px] after:w-0 after:h-[2px] after:bg-red-600 after:transition-all after:duration-500 group-hover:after:w-full group-hover:after:bg-white">
                  Explore Now
                </span>
                <FaRightLong className="text-red-600 group-hover:text-white transition-colors duration-300" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
