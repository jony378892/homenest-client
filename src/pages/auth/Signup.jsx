import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { MdErrorOutline, MdOutlineMail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaKey, FaLink, FaRegUser } from "react-icons/fa6";
import { useForm } from "react-hook-form";

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: "", photo: "", email: "", password: "" },
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async (data) => {
    setCustomError("");
    try {
      const res = await signUpUser(data.email, data.password);
      // update display name and photo
      await updateUser({ displayName: data.name, photoURL: data.photo });
      setUser({ ...res.user, displayName: data.name, photoURL: data.photo });
      reset();
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setCustomError(error.message || "Signup failed");
    }
  };

  const handleGoogleSignup = () => {
    signInWithGoogle()
      .then(() => {
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
        <form
          className=" flex flex-col gap-2"
          onSubmit={handleSubmit(handleSignUp)}
        >
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
              <input
                type="text"
                placeholder="Your name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                aria-invalid={errors.name ? "true" : "false"}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* photo */}
          <div>
            <label className=" font-medium">Photo URL</label>
            <div className="input validator outline-none mt-1 w-full">
              <FaLink className="text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Photo URL"
                {...register("photo", {
                  required: "Photo URL is required",
                  pattern: {
                    value: /^(https?:\/\/.+)$/,
                    message: "Enter a valid URL",
                  },
                })}
                aria-invalid={errors.photo ? "true" : "false"}
              />
            </div>
            {errors.photo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.photo.message}
              </p>
            )}
          </div>
          {/* email */}
          <div>
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
                  onChange: () => setCustomError(""),
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
          {/* password */}
          <div>
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
                  pattern: {
                    value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/,
                    message:
                      "Must include at least one number, lowercase and uppercase letter",
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
          <button className="btn btn-neutral mt-5" disabled={isSubmitting}>
            {isSubmitting ? "Signing up..." : "Sign up"}
          </button>

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
