import { Link, NavLink } from "react-router";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FaUser } from "react-icons/fa6";

import useAuthContext from "../hooks/useAuthContext";
import Logo from "./Logo";

export default function Navbar() {
  const { user, setUser, logoutUser } = useAuthContext();

  // console.log(user);

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

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-properties">All Properties</NavLink>
      </li>
      <li>
        <NavLink to="/add-properties">Add Properties</NavLink>
      </li>
      <li>
        <NavLink to="/my-properties">My Properties</NavLink>
      </li>
      <li>
        <NavLink to="/my-ratings">My Ratings</NavLink>
      </li>
    </>
  );

  const authButtons = (
    <>
      <Link to="/auth/signin" className="btn btn-outline btn-neutral btn-sm">
        SignIn
      </Link>
      <Link to="/auth/signup" className="btn btn-outline btn-neutral btn-sm">
        Signup
      </Link>
    </>
  );

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar mx-auto max-w-7xl py-3.5">
        <div className="navbar-start">
          <Logo />
        </div>
        <div className="navbar-center hidden lg:inline-block">
          <ul className="flex gap-1 bg-gray-100 text-sm items-center px-4 py-3 rounded-2xl [&_a]:p-1.5 [&_a]:px-3 [&_a]:rounded-xl">
            {navLinks}
          </ul>
        </div>
        <div className="navbar-end flex items-center gap-2">
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={-1} role="button" className=" rounded-xl">
                <img src={user.photoURL} alt="" className="w-9 rounded-full" />
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-2"
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
            <div className="lg:flex gap-2 hidden">{authButtons}</div>
          )}
          <div className="dropdown dropdown-end lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <HiOutlineMenuAlt2 size={25} />
            </div>
            <ul
              tabIndex="0"
              className="menu menu-md dropdown-content bg-gray-100 rounded-xl z-1 mt-3 w-52 p-2 shadow [&_a]:rounded-xl"
              id="navbar"
            >
              {navLinks}
              {!user && (
                <div className="flex flex-col gap-2 mt-2">{authButtons}</div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
