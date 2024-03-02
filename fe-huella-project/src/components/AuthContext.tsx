
import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  accessToken: string;
  Token: string;
}
     
interface AuthContextType {
  user: User 
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export const getUserFromAccessToken = (accessToken: string) => {
  try {
    const tokenData = accessToken.split('.')[1];
    const decodedToken = JSON.parse(atob(tokenData));
    return decodedToken.user;
  } catch (error) {
    console.error("Error al decodificar el token: ", error);
    return null;
  }
}


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({ accessToken: "",  Token: "" });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};















// import { createContext, useContext, useState } from "react";

// interface User { name: string; email: string; role: string; }

// interface AuthContextProps { user: User | null; setUser: (user: User | null) => void; }

// const AuthContext = createContext<AuthContextProps>({ user: null, setUser: () => {} });

// export const useAuth = () => { return useContext(AuthContext); };

// export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => { const [user, setUser] = useState<null | User>(null);

// return ( <AuthContext.Provider value={{ user, setUser }}> {children} </AuthContext.Provider> ); };

// export default AuthProvider;


// // En este código estás creando un contexto de autenticación (`AuthContext`) que contiene la información del usuario y una función para establecer el usuario. Luego, creas un custom hook `useAuth` que te permite acceder al contexto de autenticación en cualquier componente.

// // Además, defines un componente `AuthProvider` que actúa como proveedor de contexto y tiene un estado local para almacenar la información del usuario. Este componente proporciona el contexto de autenticación a todos sus hijos a través del `AuthContext.Provider`.

// // En resumen, este código se encarga de manejar la autenticación y proveer la información del usuario a lo largo de la aplicación utilizando React Context API.