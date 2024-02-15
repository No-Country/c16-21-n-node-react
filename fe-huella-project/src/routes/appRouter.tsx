    import { createHashRouter } from "react-router-dom";
    import { Home } from "../pages/Home";
    

   export const routesProvider = createHashRouter([

        {
          path: "/",
          element: <Home/>
        },
      
      ]);
