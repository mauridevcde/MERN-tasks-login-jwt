import { Link } from "react-router-dom";
import { useAuth } from "../context/auth/useAuth";
import { useNavigate } from "react-router-dom";
export const NavBar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };
  console.log("estoy en el navbar", user);
  return (
    <nav className="bg-neutral-600 my-3 flex justify-between py-5 px-10 rounded-md ">
      <h1
        onClick={
          isAuthenticated ? () => navigate("/tasks") : () => navigate("/")
        }
        className="text-3xl font-bold text-white cursor-pointer"
      >
        Tasks Mananger
      </h1>
      <p>
        {isAuthenticated ? (
          <span className="text-white">{user?.username}</span>
        ) : (
          ""
        )}
      </p>

      <ul className="flex items-center text-white text-xl font-medium cursor-pointer">
        {isAuthenticated ? (
          <>
            <li className="mr-6">
              <Link to="/new" className="text-white hover:text-zinc-500">
                New
              </Link>
            </li>
            <li className="mr-6">
              <Link to="/tasks" className="text-white hover:text-zinc-500">
                Tasks
              </Link>
            </li>
            <li className="mr-6">
              <Link to="/profile" className="text-white hover:text-zinc-500">
                Profile
              </Link>
            </li>
            <li>
              <Link
                onClick={handleLogout}
                className="text-white hover:text-zinc-500"
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="mr-5">
              <Link to="/login" className="text-white hover:text-zinc-500">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-white hover:text-zinc-500">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
