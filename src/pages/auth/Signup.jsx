import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { MdErrorOutline, MdOutlineMail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaKey, FaLink, FaRegUser } from "react-icons/fa6";

import useAuthContext from "../../hooks/useAuthContext";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    user,
    setUser,
    signUpUser,
    signInWithGoogle,
    setCustomError,
    customError,
    updateUser,
  } = useAuthContext();
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log({ name, email, password });

    signUpUser(email, password)
      .then(async (result) => {
        const user = result.user;
        console.log("Signup Successful");
        // console.log(user);

        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            navigate("/");
          })
          .catch((error) => {
            setUser(user);
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleGoogleSignup = () => {
    signInWithGoogle()
      .then((result) => {
        const currentUser = result.user;
        console.log(currentUser);

        // navigate to home after successful login
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div className="py-14 flex flex-col gap-10 items-center">
      <h2 className="text-4xl font-bold">Signup here</h2>
      <div className="p-5 py-10 border border-gray-300 rounded-2xl">
        <form className=" flex flex-col gap-2" onSubmit={handleSignUp}>
          {customError && (
            <p className="text-red-600 flex gap-2 items-center">
              <MdErrorOutline size={18} />
              {customError}
            </p>
          )}

          {/* name */}
          <div>
            <label className=" font-medium">Name</label>
            <div className="input validator outline-none mt-1 w-full">
              <FaRegUser className="text-gray-500" size={18} />
              <input type="text" placeholder="Your name" name="name" required />
            </div>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
          </div>

          {/* photo */}
          <div>
            <label className=" font-medium">Photo URL</label>
            <div className="input validator outline-none mt-1 w-full">
              <FaLink className="text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Photo URL"
                name="photo"
                required
              />
            </div>
            <div className="validator-hint hidden">Enter valid link</div>
          </div>
          {/* email */}
          <div>
            <label className=" font-medium">Email</label>
            <div className="input validator outline-none mt-1 w-full">
              <MdOutlineMail className="text-gray-500" size={24} />
              <input
                type="email"
                placeholder="email@example.com"
                onChange={() => setCustomError("")}
                name="email"
                required
              />
            </div>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
          </div>
          {/* password */}
          <div>
            <label className=" font-medium">Password</label>
            <div className="input validator outline-none mt-1 w-full relative">
              <FaKey className="text-gray-500" size={18} />
              <input
                type={`${showPassword ? "text" : "password"}`}
                name="password"
                placeholder="password"
                required
                minlength="6"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                title="Must be more than 6 characters, including number, lowercase letter, uppercase letter"
              />
              <div
                type="button"
                className="absolute right-3 z-10 cursor-pointer"
                onClick={handleShowPassword}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
            </div>
            <div className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />
              At least one number <br />
              At least one lowercase letter <br />
              At least one uppercase letter
            </div>
          </div>
          <button className="btn btn-neutral mt-5">Sign up</button>

          <div className="flex text-sm">
            Already have an account?{" "}
            <Link
              to="/auth/signin"
              className="text-blue-800 font-semibold ml-2 underline"
            >
              SignIn
            </Link>
          </div>
        </form>

        {/* Divider */}
        <div className="divider my-4">OR</div>

        {/* Signup with google */}
        <button className="btn btn-neutral w-full" onClick={handleGoogleSignup}>
          <FcGoogle />
          Signup with Google
        </button>
      </div>
    </div>
  );
}
