import axios from "axios";
import React from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Form({ onClose }) {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const ApiUrl = "https://683747da2c55e01d184956c6.mockapi.io/post ";

  const [loading, setLoading] = useState(false);

  const Submit = async (e) => {
    e.preventDefault();

    if (!url.trim() || !name.trim() || !gender.trim()) {
      toast.error("Don't leave anything empty");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(ApiUrl, {
        url,
        name,
        gender,
      });

      toast.success("Submitted successfully!");
      onClose(); // Close modal after success
    } catch (error) {
      toast.error("Submission failed");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <form onSubmit={Submit} className="space-y-6">
        <div>
          <label htmlFor="url" className="block mb-2 text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            id="url"
            type="text"
            value={url}
            placeholder="Enter image URL"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out hover:border-blue-400"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
            Character Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            placeholder="Enter name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out hover:border-blue-400"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={gender}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition duration-200 ease-in-out hover:border-blue-400"
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition transform hover:scale-[1.01] active:scale-95`}
           
        >
          Post
        </button>
      </form>
    </>
  );
}

export default Form