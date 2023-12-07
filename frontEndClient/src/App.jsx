import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/auth/AuthContext";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import TasksPages from "./pages/TasksPages";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import { TasksProvider } from "./context/tasks/TasksContext";
import { NavBar } from "./components/NavBar";

export default function App() {
  return (
    <AuthProvider>
      <TasksProvider>
        <BrowserRouter>
          <main className="container mx-auto px-8">
            <NavBar></NavBar>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/tasks" element={<TasksPages />}></Route>
                <Route path="/new" element={<TaskFormPage />}></Route>
                <Route path="/tasks/:id" element={<TaskFormPage />}></Route>
                <Route path="/profile" element={<ProfilePage />}></Route>
              </Route>

              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </main>
        </BrowserRouter>
      </TasksProvider>
    </AuthProvider>
  );
}
