// lib/models/user.ts

import mongoose, { Document, Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

// Interfaz para TypeScript: extiende Document para compatibilidad con mongoose
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string; // Emoji o URL. Por ahora, solo emoji.
  plan: "free" | "pro" | "premium";
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Definición del esquema del usuario
const UserSchema = new Schema<IUser>({
  name:      { type: String, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:  { type: String, required: true, minlength: 6 },
  avatar:    { type: String, default: "😀" }, // Por defecto: emoji sonriente
  plan:      { type: String, enum: ["free", "pro", "premium"], default: "free" },
  createdAt: { type: Date, default: Date.now },
});

// Middleware: hashea el password solo si se modifica
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Método de instancia para comparar contraseñas
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Exporta el modelo, reutilizando si ya existe (hot reload friendly)
export default models.User || model<IUser>("User", UserSchema);

/*
  - avatar: por ahora se usa para guardar el emoji (string). Futuro: URL/base64.
  - Plan soportado: 'free', 'pro', 'premium'.
  - Middleware seguro para hashing de passwords.
  - Incluye typing estricto para APIs y lógica backend.
*/
