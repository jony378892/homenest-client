import { Link, NavLink } from "react-router";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FaUser } from "react-icons/fa6";

import useAuthContext from "../hooks/useAuthContext";
import Logo from "./Logo";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { user, setUser, logoutUser } = useAuthContext();
  const hoverClass =
    "relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-red-600 after:transition-all after:duration-300 hover:after:w-full";

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

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("data-theme", theme);
  }, [theme]);

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={hoverClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-properties" className={hoverClass}>
          All Properties
        </NavLink>
      </li>
      <li>
        <NavLink to="/add-property" className={hoverClass}>
          Add Properties
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-properties" className={hoverClass}>
          My Properties
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-ratings" className={hoverClass}>
          My Ratings
        </NavLink>
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
    <div className="bg-base-100 border-b border-base-300 shadow-sm">
      <div className="navbar mx-auto max-w-7xl py-3.5">
        <div className="navbar-start">
          <Logo />
        </div>
        <div className="navbar-center hidden lg:inline-block">
          <ul className="flex gap-4 items-center ">{navLinks}</ul>
        </div>
        <div className="navbar-end flex items-center gap-2">
          <input
            type="checkbox"
            onChange={(e) => handleTheme(e.target.checked)}
            defaultChecked={localStorage.getItem("theme")}
            className="toggle"
          />
          {user ? (
            <div className="dropdown dropdown-end z-10">
              <div tabIndex={-1} role="button" className="rounded-xl">
                <img
                  src={user.photoURL}
                  alt=""
                  className="w-9 rounded-full cursor-pointer"
                />
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-md dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow space-y-2 z-10"
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
          <div className="dropdown dropdown-end lg:hidden z-10">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <HiOutlineMenuAlt2 size={25} />
            </div>
            <ul
              tabIndex="0"
              className="menu menu-md dropdown-content bg-gray-100 rounded-xl z-1 mt-3 w-52 p-2 shadow [&_a]:rounded-xl z-10"
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
