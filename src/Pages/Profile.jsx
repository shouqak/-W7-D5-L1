import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router"; 
import Navbar from "../Component/Navbar"
function Profile() {
  const ApiUrl = "https://683747da2c55e01d184956c6.mockapi.io/auth";

  const { username } = useParams(); 
const navigate= useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    img: "",
    id: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(ApiUrl)
      .then((res) => {
        if (Array.isArray(res.data)) {
          const userData = res.data.find((user) => user.username === username);

          if (userData) {
            setFormData({
              email: userData.email || "",
              img: userData.img || "",
              id: userData.id || "",
              username: userData.username || ""
            });
          } else {
            setError("User not found");
          }
        } else {
          setError("Invalid data format received.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load profile data.");
        setLoading(false);
      });
  }, [username]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.id) {
    alert("User ID is missing. Cannot update.");
    return;
  }

  let allUsers = [];
  try {
    const res = await axios.get(ApiUrl);
    allUsers = res.data;

    const currentUser = allUsers.find((user) => user.id === formData.id);

    const emailExists = allUsers.some(
      (user) => user.email === formData.email && user.id !== formData.id
    );
    if (emailExists) {
      toast.error("This email is already taken by another user.");
      return;
    }

    const usernameExists = allUsers.some(
      (user) => user.username === formData.username && user.id !== formData.id
    );
    if (usernameExists) {
      toast.error("This username is already taken by another user.");
      return;
    }
  } catch (err) {
    console.error("Error fetching users:", err);
    toast.error("Could not verify uniqueness. Try again.");
    return;
  }

  const payload = {
    username: formData.username,
    email: formData.email,
    img: formData.img,
  };

  axios
    .put(`${ApiUrl}/${formData.id}`, payload)
    .then((res) => {
      toast.success("Profile updated successfully!");
      navigate("/");
    })
    .catch((err) => {
      console.error("Update error:", err);
      toast.error("Failed to update profile.");
    });
};

  if (loading) return <div className="text-white text-xl">Loading...</div>;
  if (error)
    return (
      <div className="text-red-500 text-xl bg-yellow-100 p-4">{error}</div>
    );

  return (
    <>
    <Toaster/>
    <Navbar/>
    <div className="bg-amber-100 min-h-screen flex items-center justify-center p-4">
      <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-amber-800 hover:underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </Link>
        </div>
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-8 transition-all duration-300">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center">
            <img
              src={formData.img}
              alt="Profile"
              className="rounded-full w-32 h-32 mx-auto mb-4 border-4 border-amber-800"
            />
            <input
              type="text"
              name="img"
              value={formData.img}
              onChange={handleChange}
              placeholder="Image URL"
              className="border p-2 rounded w-full"
            />
          </div>


          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2 rounded w-full"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-amber-800 text-white px-6 py-2 rounded-lg hover:bg-amber-900 transition-colors duration-300 w-full"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div></>
  );
}

export default Profile;