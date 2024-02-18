    import { createHashRouter } from "react-router-dom";
    import {  Root } from "../pages/Root";
    import { Register } from "../pages/Register";
    import { Home } from "../pages/Home";
    

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
        ],
      },
      
    ]);
    
    
