
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
import AllClass from "../Pages/AllClass/AllClass";
import AllUser from "../Pages/DashBoard/AllUser/AllUser";
import AddNewSlot from "../Layout/DashBoard/AddNewSlot/AddNewSlot";

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
        },
        {
          path:"allClass",
          element:<AllClass></AllClass>
        }
        
      ]
    },
    {
      path:"dashBoard",
      element:<DashBoard></DashBoard>,
      children:[
        // admin routes
        {
          path:"newsLatter",
          element:<PrivetRoutes><NewsLaterSubscriber></NewsLaterSubscriber></PrivetRoutes>
        },
        {
          path:"showTrainer",
          element:<PrivetRoutes><ShowTrainer></ShowTrainer></PrivetRoutes>
        },
        {
          path:"addClass",
          element:<PrivetRoutes><AddClass></AddClass></PrivetRoutes>
        },
        {
          path:"users",
          element:<PrivetRoutes><AllUser></AllUser></PrivetRoutes>
        },
        // trainer
        {
          path:"addSlot",
          element:<PrivetRoutes><AddNewSlot></AddNewSlot></PrivetRoutes>
        }
      ]
    }
  ]);