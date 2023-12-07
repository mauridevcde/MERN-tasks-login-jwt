import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth = () => { // esto haria uso del contexto de autenticacion	
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth debe estar dentro del proveedor AuthContext");
    }
    return context;
  }