import type { Document } from "mongoose";

import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface IBranding extends Document {
  userId: string;
  logo?: string;
  favicon?: string;
  color?: string;
  font?: string;
}

const BrandingSchema = new Schema<IBranding>(
  {
    userId: { type: String, required: true, index: true },
    logo: { type: String },
    favicon: { type: String },
    color: { type: String },
    font: { type: String },
  },
  { timestamps: true },
);

export default models.Branding || model<IBranding>("Branding", BrandingSchema);
