import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    <div className="flex flex-col font-poppins">
      <Toaster />
      <Navbar />
      <section className="flex-1 min-h-screen ">
        <Outlet />
      </section>
      <Footer />
    </div>
  );
}
