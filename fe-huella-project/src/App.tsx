import {RouterProvider,} from "react-router-dom";
import { routesProvider } from "./routes/AppRouter.tsx";




export const App = () => {
  return (
    <>
        <RouterProvider router={routesProvider}/>
    </>
  )
}
