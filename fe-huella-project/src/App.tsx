import {RouterProvider,} from "react-router-dom";
import { routesProvider } from './routes/appRouter.tsx';



export const App = () => {
  return (
    <>
        <RouterProvider router={routesProvider}/>
    </>
  )
}
