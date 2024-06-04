import Order from '../models/order.model.js';
import Task from '../models/task.model.js'; // Cambiamos el nombre a Task según tu modelo de producto

const updateStock = async (cart) => {
  for (const item of cart) {
    const product = await Task.findById(item._id);
    if (!product) {
      throw new Error(`Product with id ${item._id} not found`);
    }
    if (product.stock < item.cantidad) {
      throw new Error(`Not enough stock for product ${product.nombre}`);
    }
    product.stock -= item.cantidad;
    await product.save();
  }
};

export const createOrder = async (req, res) => {
  try {
    const { nombre, email, telefono, cart } = req.body;

    // Actualizar el stock de los productos
    await updateStock(cart);

    const newOrder = new Order({
      nombre,
      email,
      telefono,
      cart
    });

    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Error creating order' });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching orders' });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching order' });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating order' });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting order' });
  }
};
