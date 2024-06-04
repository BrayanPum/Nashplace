import Cliente from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  const {
    nombre,
    identificacion,
    correoElectronico,
    telefono,
    username,
    password,
  } = req.body;

  try {
    const userFound = await Cliente.findOne({ username });
    if (userFound) {
      return res.status(400).json(["El usuario ya existe"] );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUsuario = new Cliente({
      nombre,
      identificacion,
      correoElectronico,
      telefono,
      username,
      password: passwordHash,
    });

    const userSaved = await newUsuario.save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      nombre: userSaved.nombre,
      identificacion: userSaved.identificacion,
      correoElectronico: userSaved.correoElectronico,
      telefono: userSaved.telefono,
      username: userSaved.username,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const userFound = await Cliente.findOne({ username });

    if (!userFound)
      return res.status(400).json({ message: "Usuario NO encontrado" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json({ message: "Contraseña Incorrecta ñero" });

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);

    res.json({
      id: userFound._id,
      nombre: userFound.nombre,
      identificacion: userFound.identificacion,
      correoElectronico: userFound.correoElectronico,
      telefono: userFound.telefono,
      username: userFound.username,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await Cliente.findById(req.user.id);

  if (!userFound)
    return res.status(400).json({ message: "Usuario no encontrado" });

  return res.json({
    id: userFound._id,
    nombre: userFound.nombre,
    identificacion: userFound.identificacion,
    correoElectronico: userFound.correoElectronico,
    telefono: userFound.telefono,
    username: userFound.username,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
  res.send("profile");
};

export const verifyToken = async (req, res) => {
  const {token} = req.cookies

  if(!token) return res.status(401).json({message:"No autorizado ñero"});

  jwt.verify(token,TOKEN_SECRET, async (err, user) =>{
    if(err) return res.status(401).json({message: "No Autorizado"})

    const userFound = await Cliente.findById(user.id)
    if(!userFound) return res.status(401).json({message: "No autorizado"});
    return res.json({
      id: userFound._id,
      nombre: userFound.nombre,
      identificacion: userFound.identificacion,
      correoElectronico: userFound.correoElectronico,
      username: userFound.username,
    })
    });
}