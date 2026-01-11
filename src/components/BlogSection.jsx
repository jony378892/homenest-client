import React from "react";
import prop1 from "../assets/prop-1.jpg";
import prop2 from "../assets/prop-2.jpg";
import prop3 from "../assets/prop-3.jpg";

const posts = [
  {
    id: 1,
    title: "How to Prepare Your Home for Sale",
    excerpt:
      "Preparing your home for sale is about creating a strong first impression. This guide walks you through practical steps such as decluttering, deep cleaning, minor repairs, and simple upgrades that can significantly improve your home’s appeal, attract more buyers, and help you secure a better price.",
    author: "Admin",
    date: "Jan 1, 2026",
    image: prop1,
    tag: "Selling",
  },
  {
    id: 2,
    title: "Top Neighborhoods to Invest in 2026",
    excerpt:
      "Choosing the right location is critical for long-term property investment success. In this article, we highlight the most promising neighborhoods for 2026 by analyzing growth potential, infrastructure development, lifestyle amenities, and market demand to help you make informed investment decisions.",
    author: "Admin",
    date: "Dec 20, 2025",
    image: prop2,
    tag: "Investment",
  },
  {
    id: 3,
    title: "Budget-Friendly Renovations",
    excerpt:
      "Renovating your property does not always require a large budget. This guide focuses on cost-effective renovation ideas such as kitchen updates, fresh paint, improved lighting, and minor exterior enhancements that can add significant value and increase buyer interest without overspending.",
    author: "Admin",
    date: "Nov 15, 2025",
    image: prop3,
    tag: "Renovation",
  },
];

export default function BlogSection() {
  return (
    <section className="py-16 bg-base-200 border" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-lg font-semibold text-red-600 uppercase">Blog</p>
          <h2 className="text-3xl md:text-4xl font-bold text-base-400 mt-2">
            Latest insights & tips
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col h-full border"
            >
              <div className="relative h-44 w-full">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {post.tag}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="mt-2 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <div>{post.author}</div>
                    <div className="text-xs">{post.date}</div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
