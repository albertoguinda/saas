import type { Document } from "mongoose";

import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface IGeneratedContent extends Document {
  userId: string;
  prompt: string;
  content: string;
}

const GeneratedContentSchema = new Schema<IGeneratedContent>(
  {
    userId: { type: String, required: true, index: true },
    prompt: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true },
);

export default models.GeneratedContent ||
  model<IGeneratedContent>("GeneratedContent", GeneratedContentSchema);
