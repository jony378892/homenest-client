import { FaCheckCircle } from "react-icons/fa";
import { FaEye, FaHeart, FaUsers } from "react-icons/fa6";
import { FiTarget } from "react-icons/fi";
import { Link } from "react-router";

export default function About() {
  const values = [
    {
      id: 1,
      icon: <FiTarget className="text-4xl text-red-500" />,
      title: "Our Mission",
      description:
        "To simplify real estate transactions and connect property seekers with their dream homes through a transparent, secure, and user-friendly platform.",
    },
    {
      id: 2,
      icon: <FaEye className="text-4xl text-red-500" />,
      title: "Our Vision",
      description:
        "To become the most trusted real estate marketplace, empowering millions to find, buy, sell, and rent properties with confidence and ease.",
    },
    {
      id: 3,
      icon: <FaHeart className="text-4xl text-red-500" />,
      title: "Customer First",
      description:
        "We prioritize your satisfaction and security. Every feature we build is designed with your needs in mind.",
    },
  ];

  const features = [
    { id: 1, text: "Verified Listings & Sellers" },
    { id: 2, text: "Secure Payment Gateway" },
    { id: 3, text: "24/7 Customer Support" },
    { id: 4, text: "Advanced Property Search" },
    { id: 5, text: "Mobile-Friendly Platform" },
    { id: 6, text: "Real-time Notifications" },
  ];

  const team = [
    {
      id: 1,
      name: "Ahmed Hassan",
      role: "Founder & CEO",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Fatima Akter",
      role: "Head of Operations",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      id: 3,
      name: "Karim Rahman",
      role: "Lead Developer",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      id: 4,
      name: "Nadia Khan",
      role: "Customer Success Manager",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
  ];

  return (
    <div className="bg-base-200 dark:bg-base-300 min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-base-800 dark:text-gray-100 mb-4">
            About <span className="text-red-600">HomeNest</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Transforming the way people find, buy, sell, and rent properties.
            We're building a marketplace where trust, transparency, and
            innovation come together.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-white dark:bg-neutral">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-base-800 dark:text-gray-100 mb-12">
            What Drives Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.id}
                className="p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all dark:bg-neutral text-center"
              >
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-base-800 dark:text-gray-100 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-base-800 dark:text-gray-100 mb-12">
            Why Choose HomeNest?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="flex items-center gap-4 p-6 bg-white dark:bg-neutral rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <FaCheckCircle className="text-2xl text-red-500 flex-shrink-0" />
                <p className="text-lg font-medium text-base-800 dark:text-gray-100">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-white dark:bg-neutral">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-base-800 dark:text-gray-100 mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <div
                key={member.id}
                className="text-center p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all dark:bg-neutral"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-base-800 dark:text-gray-100 mb-2">
                  {member.name}
                </h3>
                <p className="text-red-600 dark:text-red-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Dedicated to delivering excellence in everything we do.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-500 to-red-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                10K+
              </p>
              <p className="text-red-100">Active Listings</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                50K+
              </p>
              <p className="text-red-100">Registered Users</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                5K+
              </p>
              <p className="text-red-100">Successful Deals</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                4.9/5
              </p>
              <p className="text-red-100">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-neutral rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-base-800 dark:text-gray-100 mb-6 flex items-center gap-2">
            <FaUsers className="text-red-600" /> Our Story
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            HomeNest was founded in 2020 with a simple mission: to revolutionize
            the real estate industry by making property transactions more
            transparent, secure, and accessible.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Starting as a small team of passionate real estate enthusiasts and
            technology experts, we've grown into a platform serving thousands of
            users across the region. Our journey has been driven by continuous
            innovation, customer feedback, and an unwavering commitment to
            excellence.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Today, HomeNest stands as a trusted marketplace where buyers,
            sellers, and renters can connect with confidence. We're proud of the
            impact we've made and excited about the future possibilities.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white dark:bg-neutral">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-base-800 dark:text-gray-100 mb-6">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of satisfied users who have found their perfect
            properties on HomeNest.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/properties"
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              Explore Properties
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 border-2 border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-800 font-semibold rounded-lg transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
