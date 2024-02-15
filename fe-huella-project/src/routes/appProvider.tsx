    import { createHashRouter } from "react-router-dom";
    import { Home } from "../pages/Home";
    

   export const appProvider = createHashRouter([

        {
          path: "/",
          element: <Home/>
        },
      
      ]);
