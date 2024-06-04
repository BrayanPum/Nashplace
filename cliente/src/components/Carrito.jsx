import React, { useState } from "react";
import { useTasks } from "../context/TasksContext";
import { useNavigate } from "react-router-dom";
import "../pages/LoginForm.css";

function Carrito({ isOpen, toggleCart }) {
  const { cart, removeFromCart } = useTasks();
  const navigate = useNavigate();

  const [contadores, setContadores] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const incrementarContador = (id) => {
    const currentCount = contadores[id] || 0;
    const maxCount = cart.find((task) => task._id === id).stock; // Obtener el stock disponible
    if (currentCount < maxCount) {
      setContadores((prevContadores) => ({
        ...prevContadores,
        [id]: currentCount + 1,
      }));
    }
  };

  const disminuirContador = (id) => {
    const currentCount = contadores[id] || 1;
    if (currentCount > 1) {
      setContadores((prevContadores) => ({
        ...prevContadores,
        [id]: currentCount - 1,
      }));
    }
  };

  const handlerDeleteToCart = (id) => {
    removeFromCart(id);
  };

  const calcularTotal = (task) => {
    const contador = contadores[task._id] || 1;
    return contador * task.precio;
  };

  // Restar la cantidad seleccionada del stock disponible
  const handleCheckout = () => {
    const selectedProducts = cart.map((task) => ({
      ...task,
      cantidad: contadores[task._id] || 1,
      total: calcularTotal(task),
    }));

    // Verificar si hay suficiente stock
    const insufficientStock = selectedProducts.some(
      (product) => product.cantidad > product.stock
    );

    if (insufficientStock) {
      setErrorMessage("No hay suficiente stock para completar el pedido.");
    }
    else{
      navigate("/order", { state: { cart: selectedProducts } });
      toggleCart();
    }
    
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl relative">
      <button onClick={toggleCart} className="absolute top-4 right-4 text-red-600 bg-white rounded-full p-2 shadow-md text-2xl">
  X
</button>


        <h2 className="text-2xl mb-4 text-black">Carrito De Compras</h2>
        {cart.length === 0 ? (
          <p className="text-black">Tu carrito está vacío</p>
        ) : (
          <div>
            {cart.map((task) => (
              <div
                key={task._id}
                className="flex justify-between items-center mb-4 border-b pb-4"
              >
                <img
                  src={task.link}
                  className="w-20 h-20 object-cover rounded"
                  alt={task.nombre}
                />
                <div className="flex-grow ml-4">
                  <h3 className="font-semibold text-black">{task.nombre}</h3>
                  <p className="text-black">{task.descripcion}</p>
                  <p className="text-black">${task.precio}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => disminuirContador(task._id)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span className="mx-2 text-black">
                      {contadores[task._id] || 1}
                    </span>
                    <button
                      onClick={() => incrementarContador(task._id)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <button
                    onClick={() => handlerDeleteToCart(task._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Eliminar
                  </button>
                  <p className="font-semibold text-black">
                    Total: ${calcularTotal(task)}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-6">
              <h3 className="text-xl text-black">Subtotal</h3>
              <p className="text-xl text-black">
                ${cart.reduce((total, task) => total + calcularTotal(task), 0)}
              </p>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-4 bg-indigo-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Hacer Pedido
            </button>
          </div>
        )}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Carrito;
