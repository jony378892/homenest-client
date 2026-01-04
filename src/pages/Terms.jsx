import React from "react";
import { FaPrint, FaEnvelope } from "react-icons/fa6";
import { Link } from "react-router";

export default function Terms() {
  const handlePrint = () => {
    if (typeof window !== "undefined" && window.print) window.print();
  };

  return (
    <section className="py-16 bg-base-200 dark:bg-base-300 min-h-[60vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-base-400 dark:text-gray-100">
              Terms &amp; Conditions
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl">
              Please read these terms carefully. They govern your use of the
              HomeNest website and services.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-base-100 dark:bg-neutral border border-gray-200 dark:border-gray-600 text-sm hover:shadow transition"
            >
              <FaPrint /> Print
            </button>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 text-sm"
            >
              <FaEnvelope /> Contact
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <main className="lg:col-span-2 bg-white dark:bg-neutral p-8 rounded-2xl shadow-sm">
            <article className="prose prose-sm dark:prose-invert mx-auto">
              <section>
                <h2>Acceptance of Terms</h2>
                <p>
                  By using HomeNest, you agree to these Terms &amp; Conditions.
                  If you do not agree, please do not use our services.
                </p>
              </section>

              <section>
                <h2>Use of the Service</h2>
                <p>
                  You may use the service in accordance with applicable laws and
                  these terms. You are responsible for the content you provide
                  and for maintaining the security of your account.
                </p>
              </section>

              <section>
                <h2>Listings &amp; Transactions</h2>
                <p>
                  Listings are provided by users. HomeNest is a platform to
                  facilitate connections and does not guarantee any transaction.
                  Any payment, negotiation, or contract is between the user and
                  the third party.
                </p>
              </section>

              <section>
                <h2>Intellectual Property</h2>
                <p>
                  All content on the platform, unless provided by users, is
                  owned by HomeNest or its licensors. You may not reproduce or
                  redistribute content without permission.
                </p>
              </section>

              <section>
                <h2>Disclaimers</h2>
                <p>
                  The service is provided "as is" without warranties of any
                  kind. We disclaim liability to the fullest extent permitted by
                  law.
                </p>
              </section>

              <section>
                <h2>Limitation of Liability</h2>
                <p>
                  HomeNest is not responsible for indirect or consequential
                  damages arising from use of the service.
                </p>
              </section>

              <section>
                <h2>Governing Law</h2>
                <p>
                  These terms are governed by the laws of the country where
                  HomeNest operates. Disputes will be subject to local courts.
                </p>
              </section>

              <section>
                <h2>Changes to Terms</h2>
                <p>
                  We may update these terms from time to time. Material changes
                  will be notified to users through the site or email.
                </p>
              </section>

              <section>
                <h2>Contact</h2>
                <p>
                  Questions about these terms can be directed to{" "}
                  <a href="mailto:legal@homenest.example">
                    legal@homenest.example
                  </a>
                  .
                </p>
              </section>

              <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                Effective date: January 4, 2026
              </p>
            </article>
          </main>
        </div>
      </div>
    </section>
  );
}
