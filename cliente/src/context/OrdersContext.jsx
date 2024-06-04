import { createContext, useContext, useState } from "react";
import {
  createOrderRequest,
  getOrdersRequest,
  deleteOrderRequest,
  getOrderRequest,
  updateOrderRequest,
} from "../api/orders";

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await getOrdersRequest();
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createOrder = async (order) => {
    try {
      await createOrderRequest(order);
    } catch (error) {
      console.error(error);
    }
  };

  const getOrder = async (id) => {
    try {
      const res = await getOrderRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateOrder = async (id, order) => {
    try {
      await updateOrderRequest(id, order);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      const res = await deleteOrderRequest(id);
      if (res.status === 204) setOrders(orders.filter((order) => order._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OrderContext.Provider value={{ orders, createOrder, getOrders, getOrder, updateOrder, deleteOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
