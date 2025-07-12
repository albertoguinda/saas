import type { Document } from "mongoose";

import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface IEmailLog extends Document {
  userId?: string;
  to: string;
  subject: string;
  type: string;
  success: boolean;
  error?: string;
  createdAt: Date;
}

const EmailLogSchema = new Schema<IEmailLog>(
  {
    userId: { type: String },
    to: { type: String, required: true },
    subject: { type: String, required: true },
    type: { type: String, required: true },
    success: { type: Boolean, default: false },
    error: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export default models.EmailLog || model<IEmailLog>("EmailLog", EmailLogSchema);
