import { useContext } from "react";
import { TasksContext } from "./TasksContext";

export const useTask = () => {
    const context = useContext(TasksContext);
    if (!context) {
      throw new Error("useTask debe estar dentro del proveedor TasksContext");
    }
    return context;
  };