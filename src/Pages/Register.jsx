import axios from "axios"
import React, { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { Link, useNavigate } from "react-router"

function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [passCheck, setPassCheck] = useState("")
  const [loading, setLoading] = useState(false)
  const [img, setImg] = useState("")

  const navigate = useNavigate()
  const ApiUrl = "https://683747da2c55e01d184956c6.mockapi.io/auth"; 

const submit = async () => {
  if (!img.trim() || !username.trim() || !email.trim() || !pass.trim() || !passCheck.trim()) {
    toast.error("Don't leave anything empty");
    return;
  }

  if (pass !== passCheck) {
    toast.error("Passwords do not match");
    return;
  }

  if (pass.length < 6) {
    toast.error("Password must be at least 6 characters");
    return;
  }

  setLoading(true);

  try {
    const response = await axios.get(ApiUrl);
    const users = response.data;

    const emailExists = users.some(user => user.email === email);
    const usernameExists = users.some(user => user.username === username);

    if (emailExists) {
      toast.error("Email is already registered");
      setLoading(false);
      return;
    }

    if (usernameExists) {
      toast.error("Username is already taken");
      setLoading(false);
      return;
    }

    const registerResponse = await axios.post(ApiUrl, {
      img,
      username,
      email,
      pass,
    });

    localStorage.setItem("username", username);
    toast.success("Registration successful!");
    navigate("/login");

  } catch (error) {
    toast.error("Registration failed. Try again.");
    console.error("API Error:", error);
  } finally {
    setLoading(false);
  }
};
  return (
    <>
      <Toaster />

      <div className="min-h-screen bg-amber-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
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

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Create a new account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div>
            
              <div className="text-center">
                <img
                  src={img}
                  alt="Profile"
                  className="rounded-full w-32 h-32 mx-auto mb-4 border-4 border-amber-800"
                />{" "}
                <input
                  id="name"
                  value={img}
                  placeholder="profile img"
                  type="text"
                  required
                  disabled={loading}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-amber focus:border-amber-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  onChange={(e) => setImg(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-5 text-gray-700"
              >
                Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="name"
                  value={username}
                  placeholder="John Doe"
                  type="text"
                  required
                  disabled={loading}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-amber focus:border-amber-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

            <div>
  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
    Email address
  </label>
  <div className="mt-1">
    <input
      id="email"
      name="email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      pattern="^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$"
      required
      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
    />
  </div>

  {email && !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) && (
    <p className="mt-2 text-sm text-red-600">Please enter a valid email address.</p>
  )}
</div>

              <div className="mt-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input
                    id="password"
                    value={pass}
                    type="password"
                    required
                    minLength={6}
                    disabled={loading}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-amber focus:border-amber-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    onChange={(e) => setPass(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1 rounded-md shadow-sm">
                  <input
                    id="password_confirmation"
                    value={passCheck}
                    type="password"
                    required
                    disabled={loading}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-amber focus:border-amber-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    onChange={(e) => setPassCheck(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6">
                <span className="block w-full rounded-md shadow-sm">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={submit}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-500 focus:outline-none focus:border-amber-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? "Creating..." : "Create account"}
                  </button>
                </span>
              </div>

              <div className="mt-4 text-center">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    navigate("/login")
                  }}
                  className="font-medium text-amber-600 hover:text-amber-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                >
                  Already have an account? Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
