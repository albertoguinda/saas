import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dbConnect from "../lib/dbConnect.js";
import User from '../lib/models/user.js'


async function main() {
  await dbConnect();

  const email = "alberto@gmail.com";
  const password = "123456"; // mínimo 6 caracteres
  const name = "alberto";
  const plan = "pro";

  await User.deleteOne({ email });

  // Aquí puedes crear con contraseña en claro, el pre('save') la hashea automáticamente
  await User.create({ email, password, name, plan });

  console.log("✅ Usuario admin creado:", email, password);

  mongoose.connection.close();
}

main().catch((err) => {
  console.error("Error en seed:", err);
  mongoose.connection.close();
});
