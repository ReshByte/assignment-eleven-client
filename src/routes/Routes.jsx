import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../home/Home";
import Login from "../auth/Login";
import Registration from "../auth/Registration";


export const router = createBrowserRouter([
     {
        path:"/",
        element:<MainLayout></MainLayout>,
        children:[
            {
                path:"/",
                element:<Home></Home>,
            },
            {
        path: "/auth/login",
        element: <Login></Login>
      },
      {
        path: "/auth/register",
        element: <Registration></Registration>
      },
        ]
     }

])