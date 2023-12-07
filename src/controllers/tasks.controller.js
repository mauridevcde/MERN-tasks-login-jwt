import Task from "../models/Tasks.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).populate("user", { password: 0 });
    if (!tasks) return res.status(404).json({ message: "No tasks found" });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong retrieving the tasks",
    });
  }
};
export const createTasks = async (req, res) => {
  const { title, description, date } = req.body;
  const newTask = new Task({ title, description, date, user: req.user.id });
  try {
    const taskSaved = await newTask.save();
    res.json(taskSaved);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something goes wrong creating a task",
    });
  }
};
export const getTask = async (req, res) => {
  const { id } = req.params;

  try {
    const TaskById = await Task.findById(id).populate("user", {
      password: 0,
    });
    if (!TaskById)
      return res
        .status(404)
        .json({ message: `Task with id ${id} does not exists` });

    res.json(TaskById);
  } catch (error) {
    res.status(500).json({
      message: error.message || `Error retrieving Task with id: ${id}`,
    });
  }
};
export const updateTask = async (req, res) => {
  //update tasks
  const { id } = req.params;
  const { title, description, date } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        date,
      },
      { new: true }
    );
    if (!updatedTask)
      return res
        .status(404)
        .json({ message: `Task with id ${id} does not exists` });

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: error.message || `Cannot update task with id: ${id}`,
    });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const TaskById = await Task.findByIdAndDelete(id);
    if (!TaskById)
      return res
        .status(404)
        .json({ message: `User with id ${id} does not exists` });

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: error.message || `Error retrieving user with id: ${id}`,
    });
  }
};
