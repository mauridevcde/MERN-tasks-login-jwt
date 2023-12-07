import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useTask } from "../context/tasks/useTasks.jsx";
import { useEffect } from "react";

export default function TaskFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { tasks, createTask, getTask, updateTask } = useTask();
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    async function loadTask() {
      if (id) {
        const res = await getTask(id);
        setValue("title", res.title);
        setValue("description", res.description);
      }
    }
    loadTask();
  }, []);

  console.log(tasks);
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    
    if (id) {
      updateTask(id, data);
      navigate("/tasks", { replace: true });
    } else {
      createTask(data);
      navigate("/tasks");
    }
  });
  return (
    <div className="flex flex-col items-center justify-center w-full py-10">
      <h1>TaskFormPage</h1>
      <form onSubmit={onSubmit}>
        <input
          className="w-full px-4 py-2 rounded-md border-2 text-gray-950 my-2"
          type="text"
          placeholder="Task Name"
          {...register("title", { required: true })}
          autoFocus
        />
        <textarea
          className="w-full px-4 py-2 rounded-md border-2 text-gray-950 my-2"
          placeholder="Task Description"
          {...register("description", { required: true })}
        ></textarea>
        <section className="flex flex-row items-center justify-center w-full">
          <button
            onClick={() => navigate("/tasks")}
            className="px-4 py-2 rounded-md border-2 text-gray-950 my-2 bg-red-600"
          >
            Back
          </button>
          <section className="flex flex-row items-center justify-center w-full"></section>
          <button
            className="w-full py-2 rounded-md border-2 text-gray-950 my-2 bg-lime-700"
            type="submit"
          >
            Save
          </button>
        </section>
      </form>
    </div>
  );
}
