import type { Document } from "mongoose";

import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface IConfirmationToken extends Document {
  userId: string;
  token: string;
  expiresAt: Date;
  used: boolean;
  createdAt: Date;
}

const ConfirmationTokenSchema = new Schema<IConfirmationToken>(
  {
    userId: { type: String, required: true, index: true },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

ConfirmationTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default models.ConfirmationToken ||
  model<IConfirmationToken>("ConfirmationToken", ConfirmationTokenSchema);
