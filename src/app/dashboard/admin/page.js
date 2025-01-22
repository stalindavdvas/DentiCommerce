"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [username, setUsername] = useState(""); // Estado para el nombre de usuario
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      router.push("/login"); // Redirige al login si no hay token
    } else {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setUsername(decodedToken.username); // Obtén el nombre del usuario del token
        if (decodedToken.role !== "ADMIN") {
          router.push("/dashboard"); // Si no es admin, redirige al dashboard general
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        router.push("/login"); // Si hay error con el token, redirige al login
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwt"); // Elimina el token
    router.push("/login"); // Redirige al login
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-600 text-white shadow-md p-6">
        <h2 className="text-xl font-bold mb-6">Menú</h2>
        <ul className="space-y-4">
          <li>
            <a
              href="/admin/products"
              className="block px-4 py-2 rounded hover:bg-blue-700"
            >
              Productos
            </a>
          </li>
          <li>
            <a
              href="/admin/users"
              className="block px-4 py-2 rounded hover:bg-blue-700"
            >
              Usuarios
            </a>
          </li>
          <li>
            <a
              href="/admin/categories"
              className="block px-4 py-2 rounded hover:bg-blue-700"
            >
              Categorías
            </a>
          </li>
        </ul>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Bienvenido, {username}
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
          >
            Logout
          </button>
        </header>

        <main>
          <h2 className="text-lg font-bold text-gray-700 mb-4">
            Panel de Administración
          </h2>
          <p className="text-gray-600">
            Aquí puedes gestionar productos, usuarios y categorías.
          </p>
        </main>
      </div>
    </div>
  );
}
