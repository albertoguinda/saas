import type { Document } from "mongoose";

import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface ILegal extends Document {
  userId: string;
  siteId: string;
  type: "cookies" | "privacy" | "terms";
  content: string;
}

const LegalSchema = new Schema<ILegal>(
  {
    userId: { type: String, required: true, index: true },
    siteId: { type: String, required: true, index: true },
    type: {
      type: String,
      enum: ["cookies", "privacy", "terms"],
      required: true,
    },
    content: { type: String, required: true },
  },
  { timestamps: true },
);

export default models.Legal || model<ILegal>("Legal", LegalSchema);
