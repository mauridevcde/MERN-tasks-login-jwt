import { createContext, useState } from "react";
import {
  createTasksRequest,
  getTasksRequest,
  deleteTasksRequest,
  getTaskRequest,
  updateTasksRequest,
} from "../../api/tasks";
export const TasksContext = createContext();

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const createTask = async (task) => {
    const newTask = await createTasksRequest(task);
    if (!newTask) return;
    setTasks([...tasks, newTask]);
  };

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      if (!res) return;
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTasksRequest(id);
      if (res.status === 204) {
        const newTasks = tasks.filter((task) => task._id !== id);
        setTasks(newTasks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = async (id, task) => {
    try {
      const res = await updateTasksRequest(id, task);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        deleteTask,
        getTask,
        updateTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}
