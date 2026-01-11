import { useState } from "react";
import {
  FaHouse,
  FaEye,
  FaHeart,
  FaChartLine,
  FaUsers,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa6";
import useAuthContext from "../../hooks/useAuthContext";
import useSecureAxios from "../../hooks/useSecureAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";

export default function Dashboard() {
  const { user } = useAuthContext();
  const axiosSecure = useSecureAxios();
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Fetch dashboard data
  const { data: dashboardData = {}, isLoading } = useQuery({
    queryKey: ["dashboard", user?.email],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/dashboard");
        return res.data;
      } catch (error) {
        console.log(error);
        return {
          totalProperties: 0,
          activeListings: 0,
          totalViews: 0,
          totalRatings: 0,
          recentProperties: [],
          statistics: { views: 0, inquiries: 0, saved: 0 },
        };
      }
    },
  });

  const {
    totalProperties = 0,
    activeListings = 0,
    totalViews = 0,
    totalRatings = 0,
    recentProperties = [],
    statistics = { views: 0, inquiries: 0, saved: 0 },
  } = dashboardData;

  if (isLoading) return <Loading />;

  // Dashboard stats cards data
  const stats = [
    {
      id: 1,
      title: "Total Properties",
      value: totalProperties,
      icon: FaHouse,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-100",
      trend: "+12%",
      trendUp: true,
    },
    {
      id: 2,
      title: "Active Listings",
      value: activeListings,
      icon: FaCheckCircle,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-100",
      trend: "+8%",
      trendUp: true,
    },
    {
      id: 3,
      title: "Total Views",
      value: totalViews,
      icon: FaEye,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-100",
      trend: "-2%",
      trendUp: false,
    },
    {
      id: 4,
      title: "Ratings",
      value: totalRatings,
      icon: FaHeart,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-100",
      trend: "+5%",
      trendUp: true,
    },
  ];

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-base-800 mb-2">
            Welcome,{" "}
            <span className="text-red-600">{user?.displayName || "User"}</span>
          </h1>
          <p className="text-gray-600">
            Here's your property management dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div
                    className={`${stat.bgColor} rounded-lg p-3 flex items-center justify-center`}
                  >
                    <Icon className="text-2xl text-gray-700" />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm font-semibold ${
                      stat.trendUp ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.trendUp ? (
                      <FaArrowUp size={14} />
                    ) : (
                      <FaArrowDown size={14} />
                    )}
                    {stat.trend}
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">
                  {stat.title}
                </h3>
                <p className="text-3xl font-bold text-base-800">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-base-800">
                  Property Performance
                </h2>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-base-800 text-sm focus:outline-none"
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>

              {/* Simple Chart */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Views
                    </span>
                    <span className="text-sm font-bold text-base-800">
                      {statistics.views || 1250}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Inquiries
                    </span>
                    <span className="text-sm font-bold text-base-800">
                      {statistics.inquiries || 428}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full w-2/3"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Saved
                    </span>
                    <span className="text-sm font-bold text-base-800">
                      {statistics.saved || 189}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full w-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-base-800 mb-6">
                Quick Stats
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <FaChartLine className="text-blue-600 text-xl" />
                    <div>
                      <p className="text-xs text-gray-600">Views Today</p>
                      <p className="text-lg font-bold text-base-800">324</p>
                    </div>
                  </div>
                  <span className="text-green-600 text-sm font-semibold">
                    +12%
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3">
                    <FaUsers className="text-green-600 text-xl" />
                    <div>
                      <p className="text-xs text-gray-600">Inquiries</p>
                      <p className="text-lg font-bold text-base-800">47</p>
                    </div>
                  </div>
                  <span className="text-green-600 text-sm font-semibold">
                    +8%
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3">
                    <FaClock className="text-purple-600 text-xl" />
                    <div>
                      <p className="text-xs text-gray-600">Avg. Response</p>
                      <p className="text-lg font-bold text-base-800">2h 34m</p>
                    </div>
                  </div>
                  <span className="text-green-600 text-sm font-semibold">
                    Fast
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Properties */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-base-800 mb-6">
              Recent Properties
            </h2>

            {recentProperties.length === 0 ? (
              <div className="text-center py-12">
                <FaExclamationCircle className="text-4xl text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">
                  No properties yet. Start by adding a new property!
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Property Name
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Category
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Price
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentProperties.slice(0, 5).map((property) => (
                      <tr
                        key={property._id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                      >
                        <td className="py-4 px-4">
                          <p className="font-medium text-base-800">
                            {property.propertyName}
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                            {property.category}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <p className="font-semibold text-base-800">
                            ${property.propertyPrice?.toLocaleString()}
                          </p>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded-full">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-200">
          <p className="text-sm text-gray-700">
            💡 <span className="font-semibold">Tip:</span> Keep your property
            listings updated and respond quickly to inquiries to improve your
            visibility and conversion rates.
          </p>
        </div>
      </div>
    </div>
  );
}
