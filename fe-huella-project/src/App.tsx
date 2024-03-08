// import React from "react";
// import { AuthProvider } from "./components/AuthContext";

// const App: React.FC = () => {
//   return (
//     <AuthProvider>
//       {/* Aquí va el resto de tu aplicación */}
//     </AuthProvider>
//   );
// };

// export default App;

import { RouterProvider } from "react-router-dom";
import { router } from "./routes/AppRouter";
import { QueryClient, QueryClientProvider } from "react-query";
import {AuthProvider} from "./components/AuthContext"; // Importa el proveedor de autenticación

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider > {/* Agrega el proveedor de autenticación alrededor de tu aplicación */}
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
};






//ASI DEFINI ANTERIORMENTE
// import {RouterProvider} from "react-router-dom";
// import { router } from "./routes/AppRouter";
// import { QueryClient, QueryClientProvider } from "react-query";

// const queryClient = new QueryClient()

// export const App = () => {
//   return (
//     <QueryClientProvider client={queryClient}>
//         <RouterProvider router={router}/>
//     </QueryClientProvider>
//   )
// }
