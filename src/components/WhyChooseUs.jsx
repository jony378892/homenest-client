import Service1 from "/service-1.png";
import Service2 from "/service-2.png";
import Service3 from "/service-3.png";

export default function WhyChooseUs() {
  const servicesData = [
    {
      id: 1,
      title: "Expert Property Guidance",
      description:
        "Our experienced professionals help you make confident decisions — from buying and selling to investing wisely.",
      image: Service1,
    },
    {
      id: 2,
      title: "Wide Range of Listings",
      description:
        "Explore verified properties in prime locations worldwide. We ensure quality, transparency, and value in every listing.",
      image: Service2,
    },
    {
      id: 3,
      title: "Trusted by Thousands",
      description:
        "With years of real estate experience, we’ve built a reputation for trust, reliability, and client satisfaction.",
      image: Service3,
    },
  ];

  return (
    <section className="py-20 mx-auto max-w-7xl text-center">
      <div className="text-lg font-semibold text-red-600 uppercase tracking-widest">
        Why Choose Us
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
        Your Trusted Real Estate Partner
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className="flex flex-col items-center justify-center text-center gap-4 p-10 rounded-3xl border border-gray-200 hover:shadow-lg hover:-translate-y-2 transition-all duration-500 bg-white hover:bg-gray-100/80"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-20 h-20 object-contain"
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {service.title}
            </h2>
            <p className="text-gray-600 max-w-xs">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
