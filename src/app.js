import express from "express"; // import express
import morgan from "morgan";
import taskRoutes from "./routes/task.routes.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express(); // create express app
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json()); // for parsing application/json
app.use(cookieParser());
app.use("/api", authRoutes); // use auth routes (see src/routes/auth.routes.js
app.use("/api", taskRoutes);
export default app; // export app
