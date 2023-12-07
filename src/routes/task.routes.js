import { Router } from "express";
import { AuthRequired } from "../middlewares/validateToken.js";
import {
  createTasks,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/tasks.controller.js";

import { validateSchema } from "../middlewares/validator.middleware.js";

import {
  createtaskSchema,
  deleteTaskSchema,
  getTaskSchema,
  updateTaskSchema,
} from "../schemas/tasks.shema.js";
const router = Router();

router.get("/tasks", AuthRequired, getTasks);
router.get("/tasks/:id", AuthRequired, validateSchema(getTaskSchema), getTask);
router.post("/tasks", AuthRequired, validateSchema(createtaskSchema),  createTasks);
router.put("/tasks/:id", AuthRequired, validateSchema(updateTaskSchema), updateTask);
router.delete("/tasks/:id", AuthRequired, validateSchema(deleteTaskSchema), deleteTask);

export default router;
