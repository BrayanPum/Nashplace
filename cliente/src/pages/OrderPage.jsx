import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';
import "./LoginForm.css";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function OrderPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { createOrder } = useOrders();
  const { cart } = location.state || {};
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [cupon, setCupon] = useState('');
  const [nombreError, setNombreError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [telefonoError, setTelefonoError] = useState('');
  const [cuponError, setCuponError] = useState('');
  const [descuento, setDescuento] = useState(0);

  const calcularTotalPedido = () => {
    return cart.reduce((total, product) => total + product.total, 0);
  };

  const validarEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleTelefonoChange = (e) => {
    const inputTelefono = e.target.value;
    const telefonoFiltrado = inputTelefono.replace(/\D/g, '');
    setTelefono(telefonoFiltrado);
  };

  const validarCupon = () => {
    if (cupon.trim().toUpperCase() === 'PRSTUIO') {
      const descuento = calcularTotalPedido() * 0.20;
      setDescuento(descuento);
      return true;
    } else {
      setDescuento(0);
      return true;
    }
  };

  const handleFinalizarPedido = async () => {
    let isValid = true;

    if (nombre.trim() === '') {
      setNombreError('El nombre es obligatorio');
      isValid = false;
    } else {
      setNombreError('');
    }

    if (!validarEmail(email)) {
      setEmailError('El email no es válido');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (telefono.trim() === '') {
      setTelefonoError('El teléfono es obligatorio');
      isValid = false;
    } else {
      setTelefonoError('');
    }

    if (!validarCupon()) {
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const totalPedidoConDescuento = calcularTotalPedido() - descuento;

    const doc = new jsPDF();
    const logoUrl = "https://i.ibb.co/bB8KNZQ/images.png";

    const addLogoAndText = async () => {
      const img = new Image();
      img.src = logoUrl;
      img.onload = () => {
        doc.addImage(img, 'PNG', 10, 10, 50, 50);
        doc.setFontSize(20); // Nombre de la tienda un poco más grande
        doc.text("Tienda Nashplace", 105, 20, null, null, 'center');
        doc.setFontSize(12);
        doc.text("Carrera 5 # 1b-08 Campo Verde - Piedecuesta", 105, 30, null, null, 'center');
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 105, 40, null, null, 'center');
        doc.setFontSize(14);
        doc.text(`No. Factura: ${Math.floor(Math.random() * 100000)}`, 105, 50, null, null, 'center');

        doc.setFillColor(255, 182, 193); // Color de fondo rosadito pastel
        doc.rect(15, 70, 180, 40, 'F'); // Dibuja el recuadro con color de fondo
        doc.setDrawColor(0, 0, 0); // Color del borde negro
        doc.rect(15, 70, 180, 40); // Dibuja el borde negro

        doc.setFontSize(12);
        doc.text(`Cliente: ${nombre}`, 20, 80);
        doc.text(`Teléfono: ${telefono}`, 20, 90);
        doc.text(`Correo Electrónico: ${email}`, 20, 100);

        doc.autoTable({
          startY: 120,
          head: [['Producto', 'Cantidad', 'Precio Unitario', 'Total']],
          body: cart.map(product => [
            product.nombre,
            product.cantidad,
            `$${product.precio.toFixed(0)}`,
            `$${product.total.toFixed(0)}`
          ]),
          theme: 'grid',
          headStyles: { fillColor: [153, 102, 255] } // Color morado para la cabecera
        });

        doc.setFontSize(16);
        doc.setTextColor(0, 102, 204); // Cambia el color a un azul llamativo
        doc.setFont('helvetica', 'bold'); // Negrita
        doc.text(`Total a Pagar: $${totalPedidoConDescuento.toFixed(0)}`, 105, doc.lastAutoTable.finalY + 20, null, null, 'center');

        doc.save('factura_venta.pdf');
      };
    };

    await addLogoAndText();

    try {
      await createOrder({ nombre, email, telefono, cart });
      console.log('Pedido guardado exitosamente');
      navigate('/tasks');
    } catch (error) {
      console.error('Error al guardar el pedido:', error);
    }
  };

  return (
    <div className='wrapper max-w-7xl px-4 md:px-5 lg-6 mx-auto'>
      <h1>Ingrese los detalles del pedido</h1>
      <form>
        <label>
          Nombre:
          <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          {nombreError && <span className="text-red-500">{nombreError}</span>}
        </label>
        <br />
        <label>
          Email:
          <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          {emailError && <span className="text-red-500">{emailError}</span>}
        </label>
        <br />
        <label>
          Teléfono:
          <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" type="text" value={telefono} onChange={handleTelefonoChange} />
          {telefonoError && <span className="text-red-500">{telefonoError}</span>}
        </label>
        <br />
        <label>
          Cupón:
          <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" type="text" value={cupon} onChange={(e) => setCupon(e.target.value)} />
          {cuponError && <span className="text-red-500">{cuponError}</span>}
        </label>
        <br />
        <button className='bg-indigo-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white' type="button" onClick={handleFinalizarPedido}>Finalizar Pedido</button>
      </form>
      <div>
        <h3>Productos Seleccionados:</h3>
        <ul>
          {cart && cart.length > 0 ? (
            cart.map(product => (
              <li key={product._id}>{product.nombre} - Cantidad: {product.cantidad} - Total: ${product.total}</li>
            ))
          ) : (
            <li>No hay productos seleccionados</li>
          )}
        </ul>
        <h3>Total del Pedido: ${calcularTotalPedido()}</h3>
      </div>
    </div>
  );
}

export default OrderPage;
