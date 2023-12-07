import { useForm } from "react-hook-form";
import { useAuth } from "../context/auth/useAuth";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const {
    register: login,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { singnin, isAuthenticated, error: loginErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  }, [isAuthenticated]);

  const onLogin = handleSubmit(async (values) => {
    singnin(values);
    console.log(values);
    console.log(loginErrors);
  });

  return (
    <div className="bg-zinc-800 p-6 my-10 max-w-sm mx-auto  rounded-xl shadow-lg flex items-center space-x-5">
      <form onSubmit={onLogin}>
        <h1 className="text-3xl text-center font-bold text-white py-2">
          Login
        </h1>
        <img
          src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
          className="mx-auto w-20 h-20 rounded-full p-2"
        ></img>
        {loginErrors.map((error, i) => (
          <div
            key={i}
            className="bg-red-500 text-white text-sm  text-center p-2 rounded-md"
          >
            {loginErrors}
          </div>
        ))}

        <input
          type="email"
          {...login("email", { required: true })}
          className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2"
          placeholder="Email"
        />
        {errors.email && (
          <span className="text-red-500 text-sm ">
            El nombre de usuario es requerido
          </span>
        )}
        <input
          type="text"
          {...login("password", { required: true })}
          className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2"
          placeholder="Password"
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            El nombre de usuario es requerido
          </span>
        )}

        <button
          type="submit"
          className="w-full bg-indigo-700 text-white px-4 py-2 rounded-md my-2"
        >
          Login
        </button>
        {/* no tienes una cuenta aun? */}
        <section className="text-white text-center">
          <p className="text-white text-center">
            ¿No tienes una cuenta aun?{" "}
            <Link to="/register" className="text-violet-700 text-center ">
              Registrarme
            </Link>
          </p>
        </section>
      </form>
    </div>
  );
}
