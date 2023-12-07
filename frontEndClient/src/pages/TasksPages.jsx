import { useEffect } from "react";
import { useTask } from "../context/tasks/useTasks";
import { TasksCard } from "../components/TasksCard";
import { Link } from "react-router-dom";

export default function TasksPages() {
  const { getTasks, tasks } = useTask();

  useEffect(() => {
    async function fetchData() {
      await getTasks();
    }
    fetchData();
  }, []);

  if (tasks.length === 0)
    return (
      <div
        className="
      flex flex-col items-center justify-center w-full py-10
      "
      >
        <h1 className="text-3xl font-bold text-center">No tasks yet</h1>
        <Link className="text-xl font-bold text-center" to={'/new'}>Create one</Link>
      </div>
    );

  return (
    <div className="grid grid-cols-3 gap-2 ">
      {tasks.map((task, i) => (
        <TasksCard key={i} task={task} />
      ))}
    </div>
  );
}
