import {RouterProvider,} from "react-router-dom";
import { appProvider } from './routes/appProvider.tsx';



export const App = () => {
  return (
    <>
        <RouterProvider router={appProvider}/>
    </>
  )
}
