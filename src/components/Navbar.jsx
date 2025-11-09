import { Link, NavLink } from "react-router";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FaUser } from "react-icons/fa6";

import useAuthContext from "../hooks/useAuthContext";
import Logo from "./Logo";

export default function Navbar() {
  const { user, setUser, logoutUser } = useAuthContext();

  console.log(user);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        console.log("Signout Successful");

        setUser(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <Logo />
      </div>
      <div className="navbar-center hidden md:inline-block">
        <ul className="flex gap-1 bg-gray-100 text-sm items-center px-2 py-3 rounded-2xl [&_a]:p-1.5 [&_a]:px-3 [&_a]:rounded-xl">
          <li>
            <NavLink to="/all-properties">All Properties</NavLink>
          </li>
          <li>
            <NavLink to="/add-properties">Add Properties</NavLink>
          </li>
          <li>
            <NavLink to="/my-properties">My Properties</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex items-center gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={-1}
              role="button"
              className="btn btn-ghost hover:bg-gray-100 rounded-xl"
            >
              <FaUser size={18} />
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-3"
              id="navbar"
            >
              <p className="font-semibold">Name: {user.displayName}</p>
              <p className="font-semibold">Email: {user.email}</p>
              <button
                className="btn btn-outline btn-error btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </ul>
          </div>
        ) : (
          <div className="md:flex gap-2 hidden">
            <Link
              to="/auth/signin"
              className="btn btn-outline btn-neutral btn-sm"
            >
              SignIn
            </Link>
            <Link
              to="/auth/signup"
              className="btn btn-outline btn-neutral btn-sm"
            >
              Signup
            </Link>
          </div>
        )}
        <div className="dropdown dropdown-end md:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <HiOutlineMenuAlt2 size={25} />
          </div>
          <ul
            tabIndex="0"
            className="menu menu-md dropdown-content bg-gray-100 rounded-xl z-1 mt-3 w-52 p-2 shadow [&_a]:rounded-xl"
            id="navbar"
          >
            <li>
              <NavLink to="/all-properties">All Properties</NavLink>
            </li>
            <li>
              <NavLink to="/add-properties">Add Properties</NavLink>
            </li>
            <li>
              <NavLink to="/my-properties">My Properties</NavLink>
            </li>
            {!user && (
              <div className="flex flex-col gap-2 mt-2">
                <Link
                  to="/auth/signin"
                  className="btn btn-outline btn-neutral btn-sm"
                >
                  SignIn
                </Link>
                <Link
                  to="/auth/signup"
                  className="btn btn-outline btn-neutral btn-sm"
                >
                  Signup
                </Link>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
