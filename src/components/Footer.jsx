import { Link } from "react-router";
import { FaFacebookF, FaXTwitter, FaYoutube } from "react-icons/fa6";

import Logo from "./Logo";

export default function Footer() {
  return (
    <div className="bg-[#161e2d] text-gray-100 border-gray-300 border-t">
      <footer className="footer sm:footer-horizontal text-gray-100 p-10 max-w-7xl mx-auto">
        <aside className="-space-y-1">
          <Logo />
          <p>HomeNest Properties LTD.</p>
          <p>
            Gazipur, Dhaka <br />
            Bangladesh
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <Link className="link link-hover">Contacts</Link>
          <Link className="link link-hover">Terms and Conditions</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <FaYoutube size={25} />
            <FaFacebookF size={22} />
            <FaXTwitter size={22} />
          </div>
        </nav>
      </footer>
    </div>
  );
}
