// lib/models/user.ts

import type { Document } from "mongoose";

import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

import { hashPassword, comparePassword } from "../utils";

// Interfaz para TypeScript: extiende Document para compatibilidad con mongoose
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string; // Emoji o URL del avatar
  plan: "free" | "pro" | "premium";
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Definición del esquema del usuario
const UserSchema = new Schema<IUser>({
  name: { type: String, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true, minlength: 6 },
  avatar: { type: String, default: "😀" }, // Por defecto: emoji sonriente
  plan: { type: String, enum: ["free", "pro", "premium"], default: "free" },
  createdAt: { type: Date, default: Date.now },
});

// Middleware: hashea el password solo si se modifica
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashPassword(this.password);
  next();
});

// Método de instancia para comparar contraseñas
UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  return comparePassword(candidatePassword, this.password);
};

// Exporta el modelo, reutilizando si ya existe (hot reload friendly)
export default models.User || model<IUser>("User", UserSchema);

/*
  - avatar: puede ser emoji o URL (Cloudinary/S3).
  - Plan soportado: 'free', 'pro', 'premium'.
  - Middleware seguro para hashing de passwords.
  - Incluye typing estricto para APIs y lógica backend.
*/
