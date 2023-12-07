import { createContext, useState, useEffect } from "react";
import { loginRequest, registerRequest, verifyRequest } from "../../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext(); // esto sirve para crear el contexto de autenticacion

export const AuthProvider = ({ children }) => {
  // esto sirve para crear el contexto de autenticacion
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // esto es para saber si el usuario esta autenticado o no
  const [error, setError] = useState([]); //por si exista algun error
  const [loading, setLoading] = useState(true);

  const singup = async (user) => {
    // esto es para registrar un usuario
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  };

  const singnin = async (user) => {
    // esto es para registrar un usuario
    try {
      const res = await loginRequest(user);
      setIsAuthenticated(true);
  
      setUser(res.data);
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  };

  const logout = () => {
    // esto es para cerrar sesion
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (error.length > 0) {
      const timer = setTimeout(() => {
        setError([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  //leer coockies
  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      console.log("estoy en el check login", isAuthenticated);

      // si no hay token en las cookies, entonces no esta autenticado
      // al iniciar la pagina como el navegador debe tener las cookies vacias, entonces no esta autenticado.
      // entonces se debe poner isAuthenticated en false
      // y tambien se debe poner el loading en false, porque ya se termino de cargar la pagina
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      // si hay token en las cookies, entonces se debe verificar si el token es valido.
      // si el token es valido, entonces se debe poner isAuthenticated en true
      // y tambien se debe poner el loading en false, porque ya se termino de cargar la pagina
      try {
        const res = await verifyRequest(cookies.token); // se verifica si el token es valido en el backend

        if (!res.data) {
          // si no te devuelve nada, entonces el token no es valido
          setIsAuthenticated(true);
          setLoading(false);
          setUser(null);
          return;
        }
        // si te devuelve algo, entonces el token es valido
        // entonces se debe poner isAuthenticated en true
        // y tambien se debe poner el loading en false, porque ya se termino de cargar la pagina
        // y se debe poner el usuario en el estado
        console.log("estoy en el check login", res.data);
        setUser(res.data);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        // si hay un error, entonces el token no es valido
        // entonces se debe poner isAuthenticated en false
        // y tambien se debe poner el loading en false, porque ya se termino de cargar la pagina
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        singup,
        isAuthenticated,
        loading,
        error,
        singnin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
