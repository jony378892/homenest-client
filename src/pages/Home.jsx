import Cities from "../components/Cities";
import Featured from "../components/Featured";
import Hero from "../components/Hero";
import Newsletter from "../components/Newsletter";
import WhyChooseUs from "../components/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <Hero />
      <Cities />
      <Featured />
      <WhyChooseUs />
      <Newsletter />
    </main>
  );
}
