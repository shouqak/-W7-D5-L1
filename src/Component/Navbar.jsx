import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
import axios from "axios"

export default function Navbar() {
  const navigate = useNavigate()
  const username = localStorage.getItem("username")

  const ApiUrl = "https://683747da2c55e01d184956c6.mockapi.io/auth "

  /* useEffect(() => {
    if (!username) return;

    axios
      .get(ApiUrl)
      .then((response) => {
        const users = response.data;
        const user = users.find((u) => u.name === username); 

        if (user) {
          setUserId(user.id);
        } else {
          console.warn("User not found:", username);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [username]); */

  const handleLogout = () => {
    localStorage.removeItem("username")
    navigate("/login")
    window.location.reload()
  }

  return (
    <nav className="bg-amber-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl font-bold"
            >
              <img
                src="https://i.pinimg.com/736x/d6/b8/e5/d6b8e55c838c2f00bcb361569435c636.jpg "
                alt=""
                className="w-10 rounded-full"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="hover:text-amber-200 transition"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-amber-200 transition"
            >
              About US
            </Link>
            {username ? (
              <>
                <Link to={`/profile/${username}`}>
                  <button className="mt-2 bg-amber-500 hover:bg-amber-600 font-semibold hover:text-white py-2 px-4 border border-amber-500 hover:border-transparent rounded transition">
                    Hi, {username}
                  </button>
                </Link>

                <button
                  onClick={handleLogout}
                  className="mt-2 bg-red-500 hover:bg-red-600 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-amber-800 hover:bg-amber-900 font-semibold text-white py-2 px-4 border border-amber-500 hover:border-transparent rounded"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden hidden bg-amber-700">
        <div className="flex items-center px-4">
          <Link
            to="/"
            className="text-xl font-bold"
          >
            <img
              src="https://i.pinimg.com/736x/d6/b8/e5/d6b8e55c838c2f00bcb361569435c636.jpg "
              alt=""
              className="w-10 rounded-full"
            />
          </Link>
        </div>
        <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md hover:bg-amber-500 transition"
          >
            Home
          </Link>
          <Link
            to="/characters"
            className="block px-3 py-2 rounded-md hover:bg-amber-500 transition"
          >
            Characters
          </Link>
          {username ? (
            <>
              <span className="block px-3 py-1 text-sm">Hello, {username}</span>
              <button
                onClick={handleLogout}
                className="mt-2 bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <p className="block bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded">
                  Login
                </p>
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 rounded-md hover:bg-amber-500 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
