import { Outlet } from "react-router";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen font-poppins">
      <Navbar />
      <section className="flex-1 mx-auto max-w-7xl">
        <Outlet />
      </section>
      <Footer />
    </div>
  );
}
