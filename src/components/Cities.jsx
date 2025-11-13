import { useEffect, useState } from "react";
import { Link } from "react-router";

import useAxios from "../hooks/useAxios";
import Title from "./Title";
import Heading from "./Heading";
import { FaRightLong } from "react-icons/fa6";

export default function Cities() {
  const [cities, setCities] = useState([]);
  const instance = useAxios();

  useEffect(() => {
    instance.get("/cities").then((data) => {
      // console.log(data.data);
      setCities(data.data);
    });
  }, [instance]);

  return (
    <section className="mx-auto max-w-7xl my-16 px-3">
      <Title>Explore cities</Title>
      <div className="flex items-end justify-between">
        <Heading>Properties By Cities</Heading>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-16 600">
        {cities.map((city) => (
          <div
            key={city._id}
            className="flex gap-10 items-center h-32 shadow-lg rounded-lg overflow-hidden group hover:text-white hover:bg-red-600"
          >
            <div className="overflow-hidden w-2/5 h-full">
              <img
                src={city.image}
                alt={city.country}
                className="h-full w-full object-cover object-bottom group-hover:scale-110 transition-all duration-500"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-red-600 group-hover:text-white font-semibold text-xl">
                {city.city}
              </p>
              <Link
                to="/"
                className="relative flex gap-2 items-center text-sm group"
              >
                <p className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-red-600 after:transition-all after:duration-500 group-hover:after:w-full group-hover:after:bg-white">
                  Explore Now
                </p>
                <FaRightLong className="text-red-600 group-hover:text-white" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
