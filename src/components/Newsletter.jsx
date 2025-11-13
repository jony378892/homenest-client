import { useState } from "react";
import { FaEnvelope } from "react-icons/fa6";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // console.log("Subscribed with:", email);
    setEmail("");
  };

  return (
    <section className="bg-base-200 dark:bg-base-300 py-16 w-full">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-base-400 mb-3">
          Stay Updated with <span className="text-red-600">HomeNest</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Subscribe to get exclusive property updates and the latest listings
          directly in your inbox.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <div className="relative w-full sm:w-2/3">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-base-100 text-base-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-md transition-all duration-300 w-full sm:w-auto"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
