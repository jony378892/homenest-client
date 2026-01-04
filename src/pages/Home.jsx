import Statistics from "../components/Statistics";
import Hero from "../components/Hero";
import Cities from "../components/Cities";
import WhyChooseUs from "../components/WhyChooseUs";
import Featured from "../components/Featured";
import BlogSection from "../components/BlogSection";
import Newsletter from "../components/Newsletter";
import CustomerFeedback from "../components/CustomerFeedback";
import FAQ from "../components/Faq";

export default function Home() {
  return (
    <main>
      <Hero />
      <Statistics />
      <Cities />
      <Featured />
      <BlogSection />
      <CustomerFeedback />
      <FAQ />
      <WhyChooseUs />
      <Newsletter />
    </main>
  );
}
