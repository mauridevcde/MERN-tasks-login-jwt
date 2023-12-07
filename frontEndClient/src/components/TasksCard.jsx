import { Link } from "react-router-dom";
import { useTask } from "../context/tasks/useTasks";

export const TasksCard = ({ task }) => {
  const { deleteTask } = useTask();

  const handleDelete = (id) => {
    console.log("delete", id);
    deleteTask(id);
  };
  return (
    <div className="bg-slate-700 max-w-md p-10 rounded-md">
      <header className="flex justify-between">
        <div className=" flex gap-x-2 items-center ">
          <h1 className=" text-white  font-bold py-2 my-2 px-4 rounded-md">
            {" "}
            {task.title}
          </h1>
          <button
            onClick={() => handleDelete(task._id)}
            className="bg-red-600 text-white px-2 py-1 rounded-md"
          >
            Delete
          </button>
          <Link
            to={`/tasks/${task._id}`}
            className="bg-lime-700 text-white px-2 py-1 rounded-md"
          >
            Edit
          </Link>
        </div>
      </header>
      <p className="text-white text-sm  my-2 px-4 rounded-md">
        {task.description}
      </p>
    </div>
  );
};
