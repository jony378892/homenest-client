import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Signup from "../pages/auth/Signup";
import RootLayout from "../layout/RootLayout";
import Loading from "../components/Loading";
import ForgetPassword from "../pages/auth/ForgetPassword";
import PrivateRoute from "./PrivateRoute";
import SignIn from "../pages/auth/SignIn";
import NotFound from "../components/NotFound";
import AllProperties from "../pages/AllProperties";
import MyProperties from "../pages/MyProperties";
import MyRatings from "../pages/MyRatings";
import PropertyDetails from "../pages/PropertyDetails";
import AddProperty from "../pages/AddProperty";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "auth",
        children: [
          {
            path: "signin",
            Component: SignIn,
          },
          {
            path: "signup",
            Component: Signup,
          },
          {
            path: "forget-password",
            element: (
              <PrivateRoute>
                <ForgetPassword />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "property-details",
        children: [
          {
            path: `:id`,
            element: (
              <PrivateRoute>
                <PropertyDetails />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "all-properties",
        Component: AllProperties,
      },
      {
        path: "add-property",
        element: (
          <PrivateRoute>
            <AddProperty />
          </PrivateRoute>
        ),
      },
      {
        path: "my-properties",
        element: (
          <PrivateRoute>
            <MyProperties />
          </PrivateRoute>
        ),
      },
      {
        path: "my-ratings",
        element: (
          <PrivateRoute>
            <MyRatings />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/*",
    Component: NotFound,
  },
]);

export default router;
