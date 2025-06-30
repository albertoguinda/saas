// lib/models/site.ts

import mongoose from "mongoose";
import type { Document } from "mongoose";
const { Schema, model, models } = mongoose;

/**
 * Interfaz TypeScript para el modelo de Sitio Web.
 * Permite tipado estricto en toda la app y autocompletado.
 */
export interface ISite extends Document {
  userId: string;      // ID del usuario propietario del sitio
  slug: string;        // Slug único para acceder al sitio (/slug)
  title: string;       // Título o nombre principal del sitio (visible en dashboard)
  structure: any;      // Configuración del generador de sitios (puede tiparse mejor después)
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Esquema Mongoose para los documentos de sitios web generados.
 * Incluye índices, unicidad de slug y timestamps automáticos.
 */
const SiteSchema = new Schema<ISite>(
  {
    userId: { type: String, required: true, index: true }, // Para búsquedas rápidas por usuario
    slug:   { type: String, required: true, unique: true }, // Unicidad global de URLs
    title:  { type: String, required: true },               // Nombre amigable del sitio
    structure: { type: Schema.Types.Mixed, default: {} },   // Flexible para el wizard
  },
  { timestamps: true } // Añade automáticamente createdAt y updatedAt
);

// Exporta el modelo, reutilizándolo si ya existe (evita errores en hot-reload)
export default models.Site || model<ISite>("Site", SiteSchema);
