import React, { createContext, useContext } from 'react';
import axios from 'axios';

const OrdersContext = createContext();

export const useOrders = () => {
  return useContext(OrdersContext);
};

export const OrdersProvider = ({ children }) => {
  const createOrder = async (orderData) => {
    await axios.post('/api/orders', orderData);
  };

  const updateStock = async (productId, cantidad) => {
    try {
      const response = await axios.get(`/api/products/${productId}`);
      const product = response.data;

      const newStock = product.stock - cantidad;
      await axios.put(`/api/products/${productId}`, { stock: newStock });
    } catch (error) {
      console.error('Error al actualizar el stock:', error);
    }
  };

  return (
    <OrdersContext.Provider value={{ createOrder, updateStock }}>
      {children}
    </OrdersContext.Provider>
  );
};
