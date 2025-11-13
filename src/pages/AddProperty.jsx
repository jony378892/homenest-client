import toast from "react-hot-toast";
import useAuthContext from "../hooks/useAuthContext";
import { useState } from "react";
import useAxios from "../hooks/useAxios";

export default function AddProperty() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const instance = useAxios();

  const handleAddProperty = (e) => {
    e.preventDefault();
    setLoading(true);

    const now = new Date();

    const newProperty = {
      propertyName: e.target.propertyName.value,
      category: e.target.category.value,
      shortDescription: e.target.description.value,
      location: e.target.location.value,
      propertyPrice: e.target.price.value,
      image: e.target.image.value,
      userName: user.displayName,
      userEmail: user.email,
      userPhoto: user.photoURL,
      createdAt: now,
      updatedAt: now,
    };

    instance
      .post("/add-property", newProperty)
      .then(() => {
        toast.success("Property added successfully");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <section className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-red-600 uppercase">
          Add a New Property
        </h3>
        <h1 className="text-3xl font-semibold text-base-800 text-center">
          Fill in the details below
        </h1>
      </div>

      <form
        className="bg-base shadow rounded-xl p-6 space-y-4 border border-gray-200"
        onSubmit={handleAddProperty}
      >
        <div>
          <label className="block text-base-700 text-sm font-medium mb-1">
            Property Name
          </label>
          <input
            type="text"
            name="propertyName"
            placeholder="Enter property name"
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-base-700 text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows="3"
            placeholder="Short description..."
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none text-sm resize-none"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-base-700 text-sm font-medium mb-1">
              Category
            </label>
            <select
              name="category"
              className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none text-sm"
              required
            >
              <option value="">Select</option>
              <option value="Rent">Rent</option>
              <option value="Sale">Sale</option>
              <option value="Commercial">Commercial</option>
              <option value="Land">Land</option>
            </select>
          </div>

          <div>
            <label className="block text-base-700 text-sm font-medium mb-1">
              Price (USD)
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none text-sm"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-base-700 text-sm font-medium mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="City, Area..."
              className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-base-700 text-sm font-medium mb-1">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              placeholder="Paste image URL"
              className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none text-sm"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-base-700 text-sm font-medium mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={user.displayName}
              readOnly
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-600 text-sm"
            />
          </div>
          <div>
            <label className="block text-base-700 text-sm font-medium mb-1">
              Your Email
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-600 text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg flex justify-center items-center gap-2 text-sm"
        >
          {loading && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
          Add Property
        </button>
      </form>
    </section>
  );
}
