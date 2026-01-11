// ...existing code...
import React from "react";
import { useForm } from "react-hook-form";

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm();

  const onSubmit = async (data) => {
    // simulate async submit (replace with actual API call)
    await new Promise((r) => setTimeout(r, 700));
    console.log("Contact form submitted:", data);
    reset();
  };

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-lg font-semibold text-red-600 uppercase">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-base-400 mt-2">
            Get in touch with us
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a question or want to list a property? Send us a message and we
            will get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-2 p-6 rounded-2xl  "
            noValidate
          >
            {isSubmitSuccessful && (
              <div className="mb-4 alert alert-success">
                <div>
                  <span>
                    Message sent successfully. We'll contact you soon.
                  </span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text text-gray-700 dark:text-gray-200">
                    Name
                  </span>
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  aria-invalid={errors.name ? "true" : "false"}
                  className={`input input-bordered w-full bg-base-100 text-base-400 dark:bg-neutral dark:text-gray-200 dark:border-gray-700 ${
                    errors.name ? "input-error" : ""
                  }`}
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="label">
                  <span className="label-text text-gray-700 dark:text-gray-200">
                    Email
                  </span>
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                      message: "Enter a valid email",
                    },
                  })}
                  aria-invalid={errors.email ? "true" : "false"}
                  className={`input input-bordered w-full bg-base-100 text-base-400 dark:bg-neutral dark:text-gray-200 dark:border-gray-700 ${
                    errors.email ? "input-error" : ""
                  }`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-200">
                  Subject
                </span>
              </label>
              <input
                {...register("subject", { required: "Subject is required" })}
                className={`input input-bordered w-full bg-base-100 text-base-400 dark:bg-neutral dark:text-gray-200 dark:border-gray-700 ${
                  errors.subject ? "input-error" : ""
                }`}
                placeholder="Brief subject"
              />
              {errors.subject && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div className="mt-4">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-200">
                  Message
                </span>
              </label>
              <textarea
                {...register("message", {
                  required: "Message is required",
                  minLength: { value: 10, message: "Write at least 10 chars" },
                })}
                className={`textarea textarea-bordered w-full h-32 bg-base-100 text-base-400 dark:bg-neutral dark:text-gray-200 dark:border-gray-700 ${
                  errors.message ? "textarea-error" : ""
                }`}
                placeholder="How can we help?"
              />
              {errors.message && (
                <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="submit"
                className="btn bg-red-600 text-white rounded-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>

              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => reset()}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
// ...existing code...
