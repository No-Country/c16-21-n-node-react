    import { createHashRouter } from "react-router-dom";
    import {  Root } from "../pages/Root";
    import { Register } from "../pages/Register";
    import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
    

     export const router = createHashRouter([
      {
        path: "/",
        element: <Root />,
        children: [
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
          }
        ],
      },
      
    ]);
    
    
