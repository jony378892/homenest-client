import React from "react";

const faqs = [
  {
    id: 1,
    question: "How do I list my property?",
    answer:
      "To list your property, log in to your account and navigate to the dashboard. Click on the “Add Property” button and follow the step-by-step listing wizard. You will be asked to provide essential details such as property type, location, size, price, and availability. You can also upload high-quality photos and add a detailed description to attract more buyers or renters. Once completed, submit the listing for review and publish it when ready.",
  },
  {
    id: 2,
    question: "Is my listing verified?",
    answer:
      "Yes, all listings go through a basic verification process to ensure legitimacy and reduce fraudulent activity. This includes reviewing property information and account authenticity. In addition, we provide optional tools that allow sellers and buyers to verify identities and supporting documents before finalizing any transaction, helping to build trust and transparency on the platform.",
  },
  {
    id: 3,
    question: "How can I contact interested buyers?",
    answer:
      "Interested buyers can reach out to you directly through our secure in-platform messaging system available on each property page. This allows you to communicate safely without sharing personal contact details. You can respond to inquiries, answer questions, negotiate terms, and schedule property visits directly within the platform.",
  },
  {
    id: 4,
    question: "What are the fees for selling or renting?",
    answer:
      "Listing a property with basic features is completely free. However, we offer premium options such as featured listings, higher visibility in search results, and promotional tools for an additional fee. These paid features are designed to help your property reach more potential buyers or renters faster. Please visit our pricing page to view the latest plans and rates.",
  },
  {
    id: 5,
    question: "How do I ensure safety during viewings?",
    answer:
      "Your safety is important to us. We recommend confirming buyer or renter profiles and communicating through the platform before scheduling a viewing. For initial meetings, consider public discussions or virtual tours. During in-person viewings, bring a trusted friend or family member, inform someone of your schedule, and always follow local safety guidelines.",
  },
];

export default function FAQ() {
  return (
    <section className="py-16 bg-gray-50" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-lg font-semibold text-red-600 uppercase">Help</p>
          <h2 className="text-3xl md:text-4xl font-bold text-base-400 mt-2">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="collapse collapse-arrow border border-base-300 bg-white rounded-box"
            >
              <input
                type="radio"
                name="my-accordion-1"
                className="peer"
                defaultChecked={faq.id === 1}
              />

              <div className="collapse-title text-base font-semibold">
                {faq.question}
              </div>
              <div className="collapse-content text-sm">{faq.answer}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <a
            href="/contact"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-md"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
