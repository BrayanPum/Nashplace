import Order from '../models/order.model.js';
import moment from 'moment';

export const getDailyReport = async (req, res) => {
  try {
    const startOfDay = moment().startOf('day');
    const endOfDay = moment().endOf('day');

    const orders = await Order.find({
      createdAt: {
        $gte: startOfDay.toDate(),
        $lte: endOfDay.toDate()
      }
    });

    res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Error generating daily report' });
  }
};

export const getWeeklyReport = async (req, res) => {
  try {
    const startOfWeek = moment().startOf('week');
    const endOfWeek = moment().endOf('week');

    const orders = await Order.find({
      createdAt: {
        $gte: startOfWeek.toDate(),
        $lte: endOfWeek.toDate()
      }
    });

    res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Error generating weekly report' });
  }
};

export const getMonthlyReport = async (req, res) => {
  try {
    const startOfMonth = moment().startOf('month');
    const endOfMonth = moment().endOf('month');

    const orders = await Order.find({
      createdAt: {
        $gte: startOfMonth.toDate(),
        $lte: endOfMonth.toDate()
      }
    });

    res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: 'Error generating monthly report' });
  }
};
