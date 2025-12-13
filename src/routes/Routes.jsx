import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../home/Home";
import Login from "../auth/Login";
import Registration from "../auth/Registration";
import Meal from "../page/Meal";
import MealDetails from "../page/MealDetails";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../page/Dashboard";
import Profile from "../dashboard/user/Profile";
import Review from "../home/Review";
import Favorite from "../dashboard/user/Favorite";
import Order from "../dashboard/user/Order";
import OrderPage from "../page/OrderPage";
import ManageUsers from "../dashboard/Admin/ManageUsers";
import MyMeals from "../dashboard/Chef/MyMeals";
import ManageRequests from "../dashboard/Admin/ManageRequests";
import AdminStatistics from "../dashboard/Admin/AdminStatistics";
import CreateMeal from "../dashboard/Chef/CreateMeal";
import OrderRequest from "../dashboard/Chef/OrderRequest";
import PaymentSuccess from "../dashboard/user/PaymentSuccess";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "meal", element: <Meal /> },

      {
        path: "meal-details/:id",
        element: (
          <PrivateRoute>
            <MealDetails />
          </PrivateRoute>
        ),
      },

      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            path:"manage-users",
            element: <ManageUsers/>
          },
          {
            path:"manage-requests",
            element: <ManageRequests/>
          },
          {
            path:"statistics",
            element: <AdminStatistics/>
          },
           {
            path:"create-meal",
            element: <CreateMeal></CreateMeal>
          },{
            path:"order-requests",
            element:<OrderRequest></OrderRequest>
          },
          {
            path:"my-meals",
            element: <MyMeals/>
          },
          {
            path: "profile", 
            element: (
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            ),
          },
            {
            path: "my-Reviews",
            element: (
              <PrivateRoute>
                <Review></Review>
              </PrivateRoute>
            ),
          },
           {
            path: "my-favorites",
            element: (
              <PrivateRoute>
               <Favorite></Favorite>
              </PrivateRoute>
            ),
          },
           {
            path: "my-orders",
            element: (
              <PrivateRoute>
               <Order>
               </Order>
              </PrivateRoute>
            ),
          },
        ],
      },
     {
  path: "order-page/:id",
  element: (
    <PrivateRoute>
      <OrderPage />
    </PrivateRoute>
  ),
},
 {
        path: "payment-success",
        element: (
          <PrivateRoute>
           <PaymentSuccess>
           </PaymentSuccess>
          </PrivateRoute>
        ),
      },



      { path: "auth/login", element: <Login /> },
      { path: "auth/register", element: <Registration /> },
    ],
  },
]);
