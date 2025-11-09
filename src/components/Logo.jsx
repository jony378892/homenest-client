import { Link } from "react-router";
import { HiOutlineHomeModern } from "react-icons/hi2";

export default function Logo() {
  return (
    <Link to="/" className="text-2xl font-bold flex items-center">
      <HiOutlineHomeModern size={30} className="mr-1 stroke-2 text-sky-600" />
      <span className="text-sky-600">Home</span>
      Nest
    </Link>
  );
}
