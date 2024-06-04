import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
  res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Producto no encontrado" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, link } = req.body;
  

  const newTask = new Task({
    nombre,
    descripcion,
    precio,
    stock,
    link,
    user: req.user.id
  });
  const savedTask = await newTask.save();
  res.json(savedTask);
  } catch (error) {
    return res.status(500).json({message: "Un error creando task"})
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Producto no encontrado" });
  res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: "Producto no encontrado" });
  return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }
};
