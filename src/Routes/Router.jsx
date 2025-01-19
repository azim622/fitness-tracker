
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
import AddForum from "../Pages/DashBoard/AddForum/AddForum";
import AppliedTrainer from "../Pages/DashBoard/AppliedTrainer/AppliedTrainer";
import BookList from "../Pages/BookList/BookList";
import ActivityLog from "../Layout/DashBoard/ActivityLog/ActivityLog";

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
          loader: ({ params }) => fetch(`http://localhost:5000/allTrainer/${params.id}`),
        },
        {
          path: "trainer/:id",
          element: <PrivetRoutes><BookList></BookList></PrivetRoutes>,
          loader: ({ params }) => fetch(`http://localhost:5000/trainer-details/${params.id}`),
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
          path:"admin/newsLatter",
          element:<PrivetRoutes><NewsLaterSubscriber></NewsLaterSubscriber></PrivetRoutes>
        },
        {
          path:"admin/showTrainer",
          element:<PrivetRoutes><ShowTrainer></ShowTrainer></PrivetRoutes>
        },
        {
          path:"admin/addClass",
          element:<PrivetRoutes><AddClass></AddClass></PrivetRoutes>
        },
        {
          path:"admin/users",
          element:<PrivetRoutes><AllUser></AllUser></PrivetRoutes>
        },
        {
          path:"admin/addForum",
          element:<PrivetRoutes><AddForum></AddForum></PrivetRoutes>
        },
        {
          path:"admin/applyTrainer",
          element:<PrivetRoutes><AppliedTrainer></AppliedTrainer></PrivetRoutes>
        },
        // trainer
        {
          path:"trainer/addSlot",
          element:<PrivetRoutes><AddNewSlot></AddNewSlot></PrivetRoutes>
        },
        {
          path:"trainer/activityLog",
          element:<PrivetRoutes><ActivityLog></ActivityLog></PrivetRoutes>
        }
      ]
    }
  ]);