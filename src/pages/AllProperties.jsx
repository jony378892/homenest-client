import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { CiLocationOn } from "react-icons/ci";
import {
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaTh,
  FaList,
} from "react-icons/fa";
import { Link } from "react-router";
import useAxios from "../hooks/useAxios";
import Loading from "../components/Loading";

export default function AllProperties() {
  const axiosInstance = useAxios();

  const [searchText, setSearchText] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["all-properties"],
    queryFn: async () => {
      const res = await axiosInstance.get("/properties");
      return res.data;
    },
  });

  const categories = useMemo(() => {
    return ["all", ...new Set(properties.map((p) => p.category))];
  }, [properties]);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch = searchText
        ? property.propertyName
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          property.location.toLowerCase().includes(searchText.toLowerCase())
        : true;

      const matchesCategory =
        filterValue === "all" ? true : property.category === filterValue;

      return matchesSearch && matchesCategory;
    });
  }, [properties, searchText, filterValue]);

  const sortedProperties = useMemo(() => {
    const arr = [...filteredProperties];
    switch (sortOption) {
      case "newest":
        return arr.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "oldest":
        return arr.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "price-asc":
        return arr.sort(
          (a, b) => (a.propertyPrice || 0) - (b.propertyPrice || 0)
        );
      case "price-desc":
        return arr.sort(
          (a, b) => (b.propertyPrice || 0) - (a.propertyPrice || 0)
        );
      case "name-asc":
        return arr.sort((a, b) => a.propertyName.localeCompare(b.propertyName));
      case "name-desc":
        return arr.sort((a, b) => b.propertyName.localeCompare(a.propertyName));
      default:
        return arr;
    }
  }, [filteredProperties, sortOption]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, filterValue, sortOption]);

  const totalPages = Math.max(
    1,
    Math.ceil(sortedProperties.length / itemsPerPage)
  );

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedProperties.slice(start, start + itemsPerPage);
  }, [sortedProperties, currentPage]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const getPaginationRange = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Explore Your Perfect Property
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Discover amazing properties that match your needs. Filter, search,
            and find your dream home today.
          </p>
        </div>

        <div
          className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 mb-8 border border-gray-200 dark:border-gray-700 transition-all duration-300`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Search */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <FaSearch className="text-red-600" />
                Search Property
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or location..."
                  className="w-full  text-sm pl-10 pr-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2  focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <FaFilter className="text-red-600" />
                Filter by Category
              </label>
              <select
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="w-full text-sm px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2  focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all"
                      ? "All Categories"
                      : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                <FaSortAmountDown className="text-red-600" />
                Sort By
              </label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full text-sm px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2  focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer"
                aria-label="Sort properties"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A → Z</option>
                <option value="name-desc">Name: Z → A</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchText || filterValue !== "all") && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Active Filters:
                </span>
                {searchText && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full text-sm">
                    Search: "{searchText}"
                    <button
                      onClick={() => setSearchText("")}
                      className="ml-1 hover:text-red-900 dark:hover:text-red-100"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filterValue !== "all" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                    Category: {filterValue}
                    <button
                      onClick={() => setFilterValue("all")}
                      className="ml-1 hover:text-blue-900 dark:hover:text-blue-100"
                    >
                      ×
                    </button>
                  </span>
                )}
                <button
                  onClick={() => {
                    setSearchText("");
                    setFilterValue("all");
                  }}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 font-medium"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && <Loading />}

        {/* Properties Grid/List */}
        {!isLoading && (
          <>
            {paginated.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 text-center border border-gray-200 dark:border-gray-700">
                <div className="max-w-md mx-auto">
                  <svg
                    className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    No Properties Found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    We couldn't find any properties matching your criteria. Try
                    adjusting your filters or search terms.
                  </p>
                  <button
                    onClick={() => {
                      setSearchText("");
                      setFilterValue("all");
                      setSortOption("newest");
                    }}
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                    : "space-y-6 mb-8"
                }
              >
                {paginated.map((property) =>
                  viewMode === "grid" ? (
                    // Grid View
                    <div
                      key={property._id}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 group transform hover:-translate-y-1"
                    >
                      <figure className="relative h-56 overflow-hidden">
                        <img
                          src={property.image}
                          alt={property.propertyName}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg uppercase tracking-wide">
                          {property.category}
                        </div>
                      </figure>

                      <div className="p-5">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                          {property.propertyName}
                        </h3>

                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                          <CiLocationOn className="text-red-500 text-xl flex-shrink-0" />
                          <span className="line-clamp-1">
                            {property.location}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-2">
                          {property.shortDescription}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                              Price
                            </p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                              ${property.propertyPrice?.toLocaleString()}
                            </p>
                          </div>
                          <Link
                            to={`/property-details/${property._id}`}
                            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-sm"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // List View
                    <div
                      key={property._id}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 group"
                    >
                      <div className="flex flex-col sm:flex-row">
                        <figure className="relative w-full sm:w-64 h-48 sm:h-auto overflow-hidden flex-shrink-0">
                          <img
                            src={property.image}
                            alt={property.propertyName}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg uppercase tracking-wide">
                            {property.category}
                          </div>
                        </figure>

                        <div className="flex-1 p-6 flex flex-col justify-between">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                              {property.propertyName}
                            </h3>

                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                              <CiLocationOn className="text-red-500 text-xl" />
                              <span>{property.location}</span>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                              {property.shortDescription}
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
                                Price
                              </p>
                              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                ${property.propertyPrice?.toLocaleString()}
                              </p>
                            </div>
                            <Link
                              to={`/property-details/${property._id}`}
                              className="px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {totalPages > 1 && !isLoading && paginated.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Results Info */}
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                -{" "}
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {Math.min(
                    currentPage * itemsPerPage,
                    sortedProperties.length
                  )}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {sortedProperties.length}
                </span>{" "}
                properties
              </div>

              {/* Pagination Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    currentPage === 1
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 shadow-sm hover:shadow-md"
                  }`}
                >
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="hidden md:flex items-center gap-1">
                  {getPaginationRange().map((page, index) =>
                    page === "..." ? (
                      <span
                        key={`dots-${index}`}
                        className="px-3 py-2 text-gray-500 dark:text-gray-400"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                          currentPage === page
                            ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md"
                            : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                {/* Mobile Page Indicator */}
                <div className="md:hidden px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {currentPage} / {totalPages}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    currentPage === totalPages
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                      : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 shadow-sm hover:shadow-md"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
