import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Home from "../pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import MyBooking from "../pages/MyBooking/MyBooking";
import Rooms from "../pages/Rooms/Rooms";
import RoomDetails from "../pages/RoomDetails/RoomDetails";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      errorElement: <PageNotFound/>,
      children: [
       {
        path: "/",
        element: <Home/>,
       },
       {
        path: "/rooms",
        element: <Rooms/>,
       },
       {
        path: "rooms/:roomName",
        element: <RoomDetails/>,
       },
       {
        path: "/myBooking",
        element: <PrivateRoute><MyBooking/></PrivateRoute>,
       },
       {
        path: "/login",
        element: <Login/>,
       },
       {
        path: "/register",
        element: <Register/>
       },
      ]
    },
  ]);

  export default router;