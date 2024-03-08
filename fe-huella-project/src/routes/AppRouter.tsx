import { createHashRouter } from "react-router-dom";
import { Root } from "../pages/Root";
import { Register } from "../pages/Register";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { About } from "../pages/About";
import { Error } from "../components/Error";
import { RescuePasword } from "../pages/RescuePasword";
import { CreatePet } from "../pages/CreatePet.tsx";
import { Userprofile } from "../pages/Userprofile.tsx";
import { Petprofile } from "../pages/Petprofile.tsx";
import { LostList } from "../pages/LostList.tsx";
import { FoundList } from "../pages/FoundList.tsx";
import {Detail} from "../pages/Detail.tsx";


export const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        element: <Error />,
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/rescuepassword",
        element: <RescuePasword />,
      },
      {
        path: "/create",
        element: <CreatePet />,
      },
      {
        path: "/userprofile",
        element: <Userprofile />,
      },
      {
        path: "/petprofile",
        element: <Petprofile />,
      },
      {
        path:"lostpets",
        element:<LostList/>

      },
      {
        path:"foundedpets",
        element:<FoundList/>
      },
      {
        path: "/detail/:id",
        element: <Detail />,
      },
    ],
  },
]);
