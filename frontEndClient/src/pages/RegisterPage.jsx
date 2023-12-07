import { useForm } from "react-hook-form";
import { useAuth } from "../context/auth/useAuth";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { singup, isAuthenticated, error: RegisterErrors } = useAuth();
  const navigate = useNavigate();
  console.log(RegisterErrors);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const onRegister = handleSubmit(async (values) => {
    singup(values);
  });

  return (
    <div className="bg-zinc-800 p-6 my-10 max-w-sm mx-auto  rounded-xl shadow-lg flex items-center space-x-5">
      <form onSubmit={onRegister}>
        <h1 className="text-3xl text-center font-bold text-white py-2">
          Registro de Ususario
        </h1>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3456/3456388.png"
          className="mx-auto w-20 h-20 rounded-full"
        ></img>
        {RegisterErrors.map((error, i) => (
          <div key={i} className="bg-red-500 text-white text-sm p-2 rounded-md">
            {RegisterErrors}
          </div>
        ))}
        <input
          type="text"
          {...register("username", { required: true })}
          className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2"
          placeholder="Username"
        />
        {errors.username && (
          <span className="text-red-500 text-sm">
            El nombre de usuario es requerido
          </span>
        )}
        <input
          type="email"
          {...register("email", { required: true })}
          className="w-full bg-zinc-600 text-white px-4 py-2 rounded-md my-2"
          placeholder="Email"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">
            El nombre de usuario es requerido
          </span>
        )}
        <input
          type="text"
          {...register("password", { required: true })}
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
          Register
        </button>
        <section className="text-white text-center">
          <p className="text-white text-center">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-violet-700 text-center ">
              Login
            </Link>
          </p>
        </section>
      </form>
    </div>
  );
}
