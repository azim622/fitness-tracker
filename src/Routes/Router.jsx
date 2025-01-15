
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignIn from "../Pages/SignIn/SignIn";
import ErrorPage from "../Pages/Error/ErrorPage";
import AllTrainer from "../Pages/AllTrainer/AllTrainer";
import PrivetRoutes from "./PrivetRoutes";
import Details from "../Pages/Details/Details";
import BeATrainer from "../Pages/BeATrainer/BeATrainer";
import DashBoard from "../Layout/DashBoard/DashBoard";
import NewsLaterSubscriber from "../Pages/DashBoard/NewsLatterSub/NewsLaterSubscriber";
import ShowTrainer from "../Pages/DashBoard/AllTrainer/ShowTrainer";
import AddClass from "../Pages/AddClass/AddClass";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'login',
            element:<Login></Login>
        },
        {
            path:'signIn',
            element:<SignIn></SignIn>
        },
        {
            path:'allTrainer',
            element:<PrivetRoutes><AllTrainer></AllTrainer></PrivetRoutes>
        },
        {
          path: "details/:id",
          element: <PrivetRoutes><Details /></PrivetRoutes>,
          loader: ({ params }) => fetch(`http://localhost:5000/trainer/${params.id}`),
        },
        {
          path:"applyTrainer",
          element:<BeATrainer></BeATrainer>
        }
        
      ]
    },
    {
      path:"dashBoard",
      element:<DashBoard></DashBoard>,
      children:[
        {
          path:"newsLatter",
          element:<NewsLaterSubscriber></NewsLaterSubscriber>
        },
        {
          path:"showTrainer",
          element:<ShowTrainer></ShowTrainer>
        },
        {
          path:"addClass",
          element:<AddClass></AddClass>
        }
      ]
    }
  ]);