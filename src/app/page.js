"use client"; // Este archivo será un componente cliente

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";  // Importamos axios para hacer la solicitud

export default function Home() {
  const [products, setProducts] = useState([]); // Estado para almacenar los productos
  const [loading, setLoading] = useState(true);  // Estado para controlar la carga
  const [error, setError] = useState(null);      // Estado para errores en la solicitud
  const router = useRouter(); // Hook para navegación

  // Función para hacer la solicitud de productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5002/productos"); // Cambia la URL según el backend
        setProducts(response.data); // Guardamos los productos en el estado
        setLoading(false);           // Terminamos de cargar
      } catch (err) {
        setError("Error al cargar los productos"); // Manejo de errores
        setLoading(false);  // Terminamos de cargar incluso si hay error
      }
    };

    fetchProducts(); // Llamamos a la función cuando el componente se monte
  }, []); // El arreglo vacío hace que solo se ejecute al montar el componente

  if (loading) return <p>Cargando productos...</p>; // Mientras cargan los productos
  if (error) return <p>{error}</p>; // Si hay un error, lo mostramos

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barra superior */}
      <nav className="bg-green-800 text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold">DentiCommerce</h1>
          <ul className="flex items-center space-x-4">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              {/* Botón que redirige al login */}
              <button
                onClick={() => router.push("/login")}
                className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Available Products
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
                <p className="text-gray-600 mt-2">$ {parseFloat(product.price).toFixed(2)}</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  Add
                </button>
                <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
