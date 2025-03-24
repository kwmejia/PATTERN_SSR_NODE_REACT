import React, { useState } from "react";
import { useRouter } from "@client/hooks/useRouter";
import { useAlert } from "@client/context/AlertContext";

interface Props {
  error?: string;
}

export const LoginPage: React.FC<Props> = ({ error }) => {
  const [errMsg, setErrMsg] = useState(error || "");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const { notify } = useAlert();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();

    if (res.ok) {
      notify("success", "Reservado correctamente");
      if (data.user.role === "admin") router.navigate("/books/admin");
      else router.navigate("/users/dashboard");
    } else {
      setErrMsg(data.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Iniciar sesión
        </h2>

        {errMsg && (
          <p className="text-red-600 text-sm mb-4 text-center">{errMsg}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              required
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              required
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600">
          ¿No tienes una cuenta?{" "}
          <a href="/users/register" className="text-blue-600 hover:underline">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
};
