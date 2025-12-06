import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../home/Home";
import Login from "../auth/Login";
import Registration from "../auth/Registration";
import Meal from "../page/Meal";
import MealDetails from "../page/MealDetails";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/meal", element: <Meal /> },
      {
        path: "/meal-details/:id",
        element: (
          <PrivateRoute>
            <MealDetails />
          </PrivateRoute>
        ),
      },
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/register", element: <Registration /> },
    ],
  },
]);
