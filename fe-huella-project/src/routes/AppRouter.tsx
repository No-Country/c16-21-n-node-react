    import { createHashRouter } from "react-router-dom";
    import {  Root } from "../pages/Root";
    import { Register } from "../pages/Register";
    import { Home } from "../pages/Home";
    import { Login } from "../pages/Login";
    import { About } from "../pages/About";
    import { Error } from "../components/Error";
import { RescuePasword } from "../pages/RescuePasword";
import {CreatePet} from "../pages/CreatePet.tsx"
import { Userperfil } from "../pages/Userperfil.tsx";
import { Petprofile } from "../pages/Petprofile.tsx";


     export const router = createHashRouter([
    
      {
        path: "/",
        element: <Root />,
        errorElement: <Error/> ,
        children: [
          {
            element:<Error/>
          },
          {
            index:true,
            element: <Home />,
          },
          {
            path: "/register",
            element: <Register/>,
          },
          {
            path:"/login",
            element:<Login/>
          },
          {
            path:"/about",
            element:<About/>
          },
          {
            path:"/rescuepassword",
            element:<RescuePasword/>
          },
          {
            path:"/create",
            element:<CreatePet/>
          },
          {
            path:"/profile",
            element:<Userperfil/>

          },
          {
            path:"/petprofile",
            element:<Petprofile/>
          }
        ],
      },
      
    ]);
    
    
