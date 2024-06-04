import { Router } from 'express';
import { createOrder, getOrders, getOrder, updateOrder, deleteOrder } from '../controllers/order.controller.js';

const router = Router();

router.post('/orders', createOrder);
router.get('/orders', getOrders);
router.get('/orders/:id', getOrder);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);

export default router;
