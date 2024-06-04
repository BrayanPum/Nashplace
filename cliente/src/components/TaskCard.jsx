import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import { useAuth } from "../context/AuthContext";
import Carrito from './Carrito';

function TaskCard({ task }) {
  const { deleteTask, addToCart, cart } = useTasks();
  const { isAuthenticated, logout, user } = useAuth();
  const authorizedUsers = ['bmantilla', 'administrador'];
  const [showAlert, setShowAlert] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handlerAddToCart = () => {
    const alreadyInCart = cart.some(item => item._id === task._id);
    if (alreadyInCart) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } else {
      addToCart(task);
    }
  };

  if (task.stock === 0) {
    deleteTask(task._id);
    return null;
  }

  return (
    <div>
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <img src={task.link} className="card-img-top rounded-sm" style={{ width: "250px", height: "200px" }}/>
        <h1 className="text-2x1 font-bold">
          Producto: <a className="text-slate-300">{task.nombre}</a>
        </h1>
        <p className="text-2x1 font-bold">
          Descripcion: <a className="text-slate-300">{task.descripcion}</a>
        </p>
        <p className="text-2x1 font-bold">
          Precio: <a className="text-slate-300">{task.precio}</a>
        </p>
        <p className="text-2x1 font-bold">
          Stock: <a className="text-slate-300">{task.stock}</a>
        </p>
        <div className="flex gap-x-2 items-center">
          <button className="bg-indigo-500 hover:bg-green-600 px-4 py-2 rounded-md text-white" onClick={handlerAddToCart}>Comprar</button>
          {authorizedUsers.includes(user.username) && (
            <Link className="bg-blue-500 hover:bg-gray-600 px-4 py-2 rounded-md text-white" to={`/tasks/${task._id}`}>
              Editar
            </Link>
          )}
          {authorizedUsers.includes(user.username) && (
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md" onClick={() => deleteTask(task._id)}>
              Borrar
            </button>
          )}
        </div>
        {showAlert && (
          <div className="bg-red-500 text-white px-4 py-2 rounded-md mt-4">
            Este producto ya ha sido añadido al carrito.
          </div>
        )}
      </div>
      <button onClick={toggleCart} className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.879 3.514M7 13h10l4-8H5.21m0 0L7 13m0 0L4 17h16m-3-10h3m-6 0h-2m-4 0H7m0 0L5.21 5.21M5.21 5.21l1.8-2.2M3 3h2l1.4 5.614M7 13h10l3-6H7m0 0L5.21 5.21"></path>
        </svg> 
        <span className="absolute top-0 right-0 inline-block w-6 h-6 bg-red-600 text-white text-xs text-center rounded-full">
          {cart.length}
        </span>
      </button>
      <Carrito isOpen={isCartOpen} toggleCart={toggleCart} />
    </div>



  );
}

export default TaskCard;
