"use client"; // Este archivo será un componente cliente

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Para redirigir a otra página después de login

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Para mostrar errores
  const router = useRouter(); // Para navegar a otra página después de login

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizar la solicitud POST al backend
      const response = await fetch("http://localhost:5000/login", {  // Cambia la URL a la de tu backend
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: email,  // O 'email' si en el backend lo esperas así
          password: password,
        }),
      });

      // Si la respuesta es exitosa, almacenar el JWT en localStorage
      if (response.ok) {
        const { token } = await response.json();  // Asegúrate que el backend devuelva el token correctamente
        localStorage.setItem("jwt", token); // Almacena el JWT

        // Verificar el rol del usuario (opcional)
        const decodedToken = JSON.parse(atob(token.split(".")[1]));  // Decodificar el JWT
        const role = decodedToken.role;  // Suponiendo que el JWT tenga un campo `role`

        if (role === "ADMIN") {
          router.push("/dashboard/admin"); // Redirigir a un panel de administración si el usuario es admin
        } else {
          router.push("/dashboard"); // Redirigir al dashboard común
        }
      } else {
        // Si las credenciales son incorrectas
        setError("Credenciales inválidas");
      }
    } catch (error) {
      // Manejo de errores en la solicitud
      setError("Error al intentar iniciar sesión");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de correo electrónico */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Correo Electrónico
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 rounded-md border focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Ingresa tu correo"
            />
          </div>

          {/* Campo de contraseña */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 rounded-md border focus:ring focus:ring-blue-200 focus:outline-none"
              placeholder="Ingresa tu contraseña"
            />
          </div>

          {/* Mostrar error si es necesario */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Botón de enviar */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>

        {/* Enlace para registro */}
        <p className="text-sm text-gray-600 text-center mt-4">
          ¿No tienes una cuenta?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:underline focus:outline-none focus:underline"
          >
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}
