import { Link } from "react-router";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { FaHome } from "react-icons/fa";

export default function Logo() {
  return (
    <Link to="/" className="text-2xl font-semibold flex  font-poppins">
      <FaHome size={27} className="text-red-600 mr-1 stroke-2 " />
      <span className="text-red-600">HomeNest</span>
    </Link>
  );
}
