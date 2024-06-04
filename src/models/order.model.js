import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  cart: [
    {
      nombre: String,
      cantidad: Number,
      total: Number
    }
  ]
}, {
  timestamps: true
});

export default mongoose.model('Order', orderSchema);
