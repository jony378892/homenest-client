import React from "react";
import {
  FaPrint,
  FaEnvelope,
  FaShieldAlt,
  FaCookie,
  FaUsers,
  FaLock,
  FaExclamationCircle,
} from "react-icons/fa";
import { Link } from "react-router";

export default function Privacy() {
  const handlePrint = () => {
    if (typeof window !== "undefined" && window.print) {
      window.print();
    }
  };

  const sections = [
    {
      id: "information-we-collect",
      title: "Information We Collect",
      icon: FaShieldAlt,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      id: "how-we-use",
      title: "How We Use Your Information",
      icon: FaUsers,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
    },
    {
      id: "cookies-tracking",
      title: "Cookies & Tracking",
      icon: FaCookie,
      iconColor: "text-yellow-600",
      iconBg: "bg-yellow-100",
    },
    {
      id: "third-party",
      title: "Third-Party Services",
      icon: FaUsers,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
    },
    {
      id: "security",
      title: "Security",
      icon: FaLock,
      iconColor: "text-red-600",
      iconBg: "bg-red-100",
    },
    {
      id: "changes",
      title: "Changes to This Policy",
      icon: FaExclamationCircle,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
    },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <FaShieldAlt className="text-white text-xl" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                  Privacy Policy
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-3xl">
                Your privacy matters to us. This page explains how HomeNest
                collects, uses, and protects your personal information with
                transparency and care.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-md transition-all duration-200"
                aria-label="Print privacy policy"
              >
                <FaPrint className="text-lg" />
                <span className="hidden sm:inline">Print</span>
              </button>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold hover:from-red-600 hover:to-red-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                aria-label="Contact us"
              >
                <FaEnvelope className="text-lg" />
                <span className="hidden sm:inline">Contact Us</span>
              </Link>
            </div>
          </div>

          {/* Last Updated Banner */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="font-medium">Last Updated:</span>
              <span>January 4, 2026</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents - Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                Quick Navigation
              </h2>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group flex items-center gap-3"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg ${section.iconBg} dark:bg-opacity-20 flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110`}
                      >
                        <Icon
                          className={`${section.iconColor} dark:${section.iconColor} text-sm`}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                        {section.title}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-10 border border-gray-200 dark:border-gray-700">
              <article className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                {/* Information We Collect */}
                <section
                  id="information-we-collect"
                  className="scroll-mt-24 mb-12"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                      <FaShieldAlt className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="!mb-0 text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Information We Collect
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We collect information you provide directly (for example,
                    account creation, listings, messages) and information
                    collected automatically (such as usage data and cookies).
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mt-4">
                    <ul className="space-y-2 !mt-0 !mb-0">
                      <li className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">
                          Contact information (name, email, phone number)
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">
                          Profile and property listing data
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">
                          Usage and analytics data to improve our services
                        </span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* How We Use Your Information */}
                <section id="how-we-use" className="scroll-mt-24 mb-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <FaUsers className="text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="!mb-0 text-2xl font-bold text-gray-900 dark:text-gray-100">
                      How We Use Your Information
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We use information to operate and improve the service,
                    process transactions, protect against fraud, and communicate
                    with you.
                  </p>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800 mt-4">
                    <p className="text-gray-700 dark:text-gray-300 font-semibold !mb-0">
                      <span className="text-green-600 dark:text-green-400">
                        ✓
                      </span>{" "}
                      We do not sell your personal information to third parties.
                    </p>
                  </div>
                </section>

                {/* Cookies & Tracking */}
                <section id="cookies-tracking" className="scroll-mt-24 mb-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                      <FaCookie className="text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <h2 className="!mb-0 text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Cookies &amp; Tracking
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Cookies and similar technologies help us personalize content
                    and analyze site usage. You can manage cookies via your
                    browser settings; however, disabling cookies may affect the
                    platform's functionality.
                  </p>
                </section>

                {/* Third-Party Services */}
                <section id="third-party" className="scroll-mt-24 mb-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                      <FaUsers className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <h2 className="!mb-0 text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Third-Party Services
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We may share data with trusted service providers (such as
                    analytics and hosting providers). These parties are
                    contractually bound to protect your data and may have their
                    own privacy practices.
                  </p>
                </section>

                {/* Security */}
                <section id="security" className="scroll-mt-24 mb-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                      <FaLock className="text-red-600 dark:text-red-400" />
                    </div>
                    <h2 className="!mb-0 text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Security
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We implement reasonable security measures to protect your
                    personal information, but no system is completely secure.
                  </p>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border-l-4 border-red-500 mt-4">
                    <p className="text-gray-700 dark:text-gray-300 font-medium !mb-0">
                      <strong className="text-red-600 dark:text-red-400">
                        Important:
                      </strong>{" "}
                      If you believe your account has been compromised, contact
                      us immediately.
                    </p>
                  </div>
                </section>

                {/* Changes to This Policy */}
                <section id="changes" className="scroll-mt-24 mb-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                      <FaExclamationCircle className="text-orange-600 dark:text-orange-400" />
                    </div>
                    <h2 className="!mb-0 text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Changes to This Policy
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    We may update this policy periodically to reflect changes in
                    our practices or for legal, operational, or regulatory
                    reasons. Significant changes will be communicated via the
                    site or email where applicable.
                  </p>
                </section>

                {/* Contact Section */}
                <section className="mt-12 pt-8 border-t-2 border-gray-200 dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Questions? We're Here to Help
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    If you have any questions or concerns about this privacy
                    policy, we encourage you to reach out to us.
                  </p>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <div className="flex-1">
                        <p className="text-gray-700 dark:text-gray-300 mb-2">
                          <strong className="text-gray-900 dark:text-gray-100">
                            Email us:
                          </strong>
                        </p>
                        <a
                          href="mailto:jony378892@gmail.com"
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold no-underline hover:underline transition-colors"
                        >
                          privacy@homenest.com
                        </a>
                      </div>
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 no-underline"
                      >
                        <FaEnvelope /> Visit Contact Page
                      </Link>
                    </div>
                  </div>
                </section>
              </article>
            </div>

            {/* Footer Note */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                This privacy policy is effective as of January 4, 2026 and
                applies to all users of HomeNest.
              </p>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
