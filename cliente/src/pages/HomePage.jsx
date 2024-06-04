import React from "react";
import "./LoginForm.css"; // Importar estilos personalizados

// Definir el componente de la página de inicio
function HomePage() {
    return (
        <div className="wrapper mx-auto">
            <div className="row">
                <div className="col-md-12 text-center">
                    {/* Título de bienvenida */}
                    <h1>Bienvenido a La Tienda NashPlace</h1>
                    {/* Descripción de la tienda */}
                    <p>Encuentra los mejores productos al mejor precio</p>
                    <img src={"https://i.ibb.co/0yKywHS/bladimir.png"} className="card-img-top" style={{ width: "350px", height: "250px" }}/>
                </div>
            </div>
        </div>
    );
}

// Exportar el componente de la página de inicio
export default HomePage;
