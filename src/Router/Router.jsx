import { createBrowserRouter, Outlet, RouterProvider } from "react-router"
import Home from "../Pages/Home"
import Login from "../Pages/Login"
import Register from "../Pages/Register"
import Profile from "../Pages/Profile"


function Layout() {
  return (
    <>

      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", element: <Home/> },
{ path: "/login", element: <Login/> },
{ path: "/register", element: <Register/> },
{ path: "/profile/:username", element: <Profile/>},
//{ path:"/about" , element: <About /> },

    ],
  },
])

function Router() {
  return <RouterProvider router={router} />
}

export default Router