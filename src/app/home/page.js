// /app/home/page.js
"use client"; 

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const products = [
  { id: 1, name: "Fresa Dental", price: 25.0 },
  { id: 2, name: "Jeringa Dental", price: 12.5 },
  { id: 3, name: "Empaste Resina", price: 40.0 },
  { id: 4, name: "Turbina de Alta Velocidad", price: 120.0 },
];

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Verificar si el usuario está autenticado
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUser(decodedToken);
    } else {
      router.push("/login"); // Si no hay token, redirige al login
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barra superior */}
      <nav className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold">Tienda Odontológica</h1>
          <ul className="flex items-center space-x-4">
            <li>
              <a href="#" className="hover:underline">
                Inicio
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Productos
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contacto
              </a>
            </li>
            <li>
              {user && (
                <span className="text-white">Bienvenido, {user.username}</span>
              )}
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Productos Disponibles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-700">
                  {product.name}
                </h3>
                <p className="text-gray-600 mt-2">$ {product.price.toFixed(2)}</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  Agregar
                </button>
                <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300">
                  Ver Detalle
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
