import { MdErrorOutline, MdOutlineMail } from "react-icons/md";
import { FaEye, FaEyeSlash, FaKey, FaRegUser } from "react-icons/fa6";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";

import useAuthContext from "../../hooks/useAuthContext";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser, signInWithGoogle, customError, setCustomError } =
    useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (data) => {
    setCustomError("");
    try {
      await signInUser(data.email, data.password);
      // navigate to home after successful login
      reset();
      navigate(location.state || "/");
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      if (errorMessage === "Firebase: Error (auth/invalid-credential).") {
        setCustomError("Invalid Credentials");
      } else {
        setCustomError(errorMessage || "Sign-in failed.");
      }
    }
  };

  const handleCustomSignIn = async () => {
    setCustomError("");
    try {
      await signInUser("rony@email.com", "Ro378892");
      // navigate to home after successful login
      reset();
      navigate(location.state || "/");
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      if (errorMessage === "Firebase: Error (auth/invalid-credential).") {
        setCustomError("Invalid Credentials");
      } else {
        setCustomError(errorMessage || "Sign-in failed.");
      }
    }
  };

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then(() => {
        // navigate to home after successful login
        navigate(location.state || "/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="py-14 flex flex-col gap-10 items-center">
      <h2 className="text-4xl font-bold">SignIn here</h2>
      <div className="p-5 py-10 border border-gray-300 rounded-2xl">
        <form
          className=" flex flex-col gap-2"
          onSubmit={handleSubmit(handleSignIn)}
        >
          {customError && (
            <p className="text-red-600 flex gap-2 items-center">
              <MdErrorOutline size={18} />
              {customError}
            </p>
          )}
          {/* Email */}
          <div className="">
            <label className=" font-medium">Email</label>
            <div className="input validator outline-none mt-1 w-full">
              <MdOutlineMail className="text-gray-500" size={24} />
              <input
                type="email"
                placeholder="email@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                    message: "Enter a valid email",
                  },
                })}
                aria-invalid={errors.email ? "true" : "false"}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          {/* Password */}
          <div className="">
            <label className=" font-medium">Password</label>
            <div className="input validator outline-none mt-1 w-full relative">
              <FaKey className="text-gray-500" size={18} />
              <input
                type={`${showPassword ? "text" : "password"}`}
                placeholder="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                aria-invalid={errors.password ? "true" : "false"}
              />
              <div
                type="button"
                className="absolute right-3 z-10 cursor-pointer"
                onClick={handleShowPassword}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <Link
            to="/auth/forget-password"
            className="text-xs text-blue-800 font-semibold hover:underline underline-offset-4"
          >
            Forget password?
          </Link>
          <button className="btn btn-neutral mt-5" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "SignIn"}
          </button>

          <button
            className="btn btn-neutral mt-2"
            type="button"
            disabled={isSubmitting}
            onClick={handleCustomSignIn}
          >
            {isSubmitting ? "Signing in..." : "Sign in with demo user"}
          </button>
          <div className="flex text-sm">
            Don't have an account?{" "}
            <Link
              to="/auth/signup"
              className="text-blue-800 font-semibold ml-2 underline"
            >
              SignUp
            </Link>
          </div>
        </form>

        {/* Divider */}
        <div className="divider my-6">OR</div>

        {/* Google login button */}
        <button
          className="btn btn-neutral w-full"
          onClick={handleSignInWithGoogle}
        >
          <FcGoogle />
          SignIn with Google
        </button>
      </div>
    </div>
  );
}
