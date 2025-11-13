import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import { CiLocationOn } from "react-icons/ci";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import useSecureAxios from "../hooks/useSecureAxios";
import Swal from "sweetalert2";

export default function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const modalRef = useRef(null);
  const { user } = useAuthContext();
  const instance = useSecureAxios();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;
    instance.get(`/properties?email=${user.email}`).then((data) => {
      setProperties(data.data);
    });
  }, [instance, user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This property will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626", // red (Tailwind's red-600)
      cancelButtonColor: "#6b7280", // gray-500
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        instance
          .delete(`/delete-property/${id}`)
          .then(() => {
            setProperties((prev) => prev.filter((p) => p._id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Property deleted successfully.",
              icon: "success",
              confirmButtonColor: "#dc2626",
            });
          })
          .catch((err) => {
            console.log(err.message);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong while deleting.",
              icon: "error",
              confirmButtonColor: "#dc2626",
            });
          });
      }
    });
  };

  const handleModal = (property) => {
    setSelectedProperty(property);
    modalRef.current.showModal();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;
    const updatedData = {
      propertyName: form.propertyName.value,
      shortDescription: form.description.value,
      category: form.category.value,
      propertyPrice: parseFloat(form.price.value),
      location: form.location.value,
      image: form.image.value,
      updatedAt: new Date(),
    };

    try {
      await instance.patch(
        `/update-property/${selectedProperty._id}`,
        updatedData
      );

      setProperties((prev) =>
        prev.map((p) =>
          p._id === selectedProperty._id ? { ...p, ...updatedData } : p
        )
      );

      toast.success("Property updated successfully!");

      modalRef.current.close();

      navigate(`/property-details/${selectedProperty._id}`);
    } catch (err) {
      console.log(err.message);
      toast.error("Update failed!");
    }
  };

  return (
    <section className="py-10 mx-auto max-w-7xl px-3 md:px-0">
      <div className="text-lg font-semibold text-red-600 uppercase text-center">
        My Dashboard
      </div>
      <h1 className="text-3xl font-semibold text-base-800 text-center">
        My Properties
      </h1>

      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Update Property</h3>

          {selectedProperty && (
            <form onSubmit={handleUpdate} className="space-y-3">
              <div>
                <label className="font-medium text-sm">User Name</label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="input input-bordered w-full outline-none bg-gray-100"
                />
              </div>

              <div>
                <label className="font-medium text-sm">User Email</label>
                <input
                  type="text"
                  value={user?.email || ""}
                  readOnly
                  className="input input-bordered w-full outline-none bg-gray-100"
                />
              </div>

              <div>
                <label className="font-medium text-sm">Property Name</label>
                <input
                  type="text"
                  name="propertyName"
                  defaultValue={selectedProperty.propertyName}
                  className="input input-bordered w-full outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-medium text-sm">Description</label>
                <textarea
                  name="description"
                  defaultValue={selectedProperty.shortDescription}
                  className="textarea textarea-bordered w-full"
                  required
                ></textarea>
              </div>

              <div>
                <label className="font-medium text-sm">Category</label>
                <input
                  type="text"
                  name="category"
                  defaultValue={selectedProperty.category}
                  className="input input-bordered w-full outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-medium text-sm">Price</label>
                <input
                  type="number"
                  name="price"
                  defaultValue={selectedProperty.propertyPrice}
                  className="input input-bordered w-full outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-medium text-sm">Location</label>
                <input
                  type="text"
                  name="location"
                  defaultValue={selectedProperty.location}
                  className="input input-bordered w-full outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-medium text-sm">Image Link</label>
                <input
                  type="text"
                  name="image"
                  defaultValue={selectedProperty.image}
                  className="input input-bordered w-full outline-none"
                  required
                />
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-warning text-white">
                  Update Property
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => modalRef.current.close()}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>

      {properties.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          You haven’t added any properties yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {properties.map((property) => (
            <div
              key={property._id}
              className="card bg-white shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-all"
            >
              <figure className="relative">
                <img
                  src={property.image}
                  alt={property.propertyName}
                  className="h-56 w-full object-cover object-center rounded-t-xl"
                />
                <div className="absolute badge rounded-sm bg-white text-xs font-semibold bottom-4 left-4">
                  {property.category}
                </div>
              </figure>
              <div className="card-body">
                <h2 className="text-lg font-semibold text-red-600">
                  {property.propertyName}
                </h2>
                <div className="flex gap-2 text-gray-600 items-center text-sm">
                  <CiLocationOn /> {property.location}
                </div>
                <p className="text-gray-700 font-medium mt-2">
                  Price:{" "}
                  <span className="text-black">${property.propertyPrice}</span>
                </p>
                <p className="text-gray-500 text-sm">
                  Posted: {new Date(property.createdAt).toLocaleDateString()}
                </p>

                <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-3">
                  <Link
                    to={`/property-details/${property._id}`}
                    className="btn btn-sm bg-red-500 text-white border-none hover:bg-red-600 rounded-md"
                  >
                    View Details
                  </Link>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleModal(property)}
                      className="btn btn-warning btn-outline btn-sm"
                    >
                      <FaRegEdit /> Update
                    </button>
                    <button
                      onClick={() => handleDelete(property._id)}
                      className="btn btn-error btn-sm flex items-center gap-1"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
