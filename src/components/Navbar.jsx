import { Link, NavLink } from "react-router";
import { IoIosSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa6";
import { useEffect, useState } from "react";

import useAuthContext from "../hooks/useAuthContext";
import Logo from "./Logo";

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { user, setUser, logoutUser } = useAuthContext();

  const handleLogout = () => {
    logoutUser()
      .then(() => setUser(null))
      .catch((err) => console.log(err.message));
  };

  const handleTheme = (checked) => setTheme(checked ? "dark" : "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/properties">Properties</NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink to="/add-property">Add Property</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
        </>
      ) : (
        <>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </>
      )}
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
    <div className="bg-base-100 border-b border-base-300 shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto py-3.5 px-2">
        {/* Mobile menu button */}
        <div className="dropdown sm:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 gap-2 custom_navlinks"
          >
            {navLinks}
          </ul>
        </div>
        <div className="">
          <Logo />
        </div>

        {/* Navbar center: Nav links (desktop only) */}
        <div className="navbar-center hidden sm:flex">
          <ul className="flex  px-1 gap-4 custom_navlinks">{navLinks}</ul>
        </div>

        {/* Navbar end: Theme toggle + Auth/User */}
        <div className="flex items-center gap-2">
          {/* Theme control */}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onChange={(e) => handleTheme(e.target.checked)}
              defaultChecked={theme === "dark"}
            />
            <IoIosSunny className="swap-on size-5 fill-current" />
            <FaMoon className="swap-off size-5 fill-current" />
          </label>

          {/* Auth / User */}
          {!user ? (
            <div className="hidden sm:flex gap-2">{authButtons}</div>
          ) : (
            <div className="dropdown dropdown-end z-10">
              <div tabIndex={0} className="rounded-xl cursor-pointer">
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-7 sm:w-8 rounded-full"
                />
              </div>
              <ul className="flex flex-col gap-3 text-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 px-2 py-3 shadow border border-gray-200 z-10 custom_navlinks">
                <li>
                  <NavLink to="/my-properties">My Properties</NavLink>
                </li>
                <li>
                  <NavLink to="/my-ratings">My Ratings</NavLink>
                </li>
                <button className="btn btn-error btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
