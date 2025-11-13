import { Link } from "react-router";
import { HiOutlineHomeModern } from "react-icons/hi2";

export default function Logo() {
  return (
    <Link
      to="/"
      className="text-2xl font-semibold flex items-center font-poppins"
    >
      <HiOutlineHomeModern size={30} className="mr-1 stroke-2 text-red-600" />
      <span>Home</span>
      Nest
    </Link>
  );
}
