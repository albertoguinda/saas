import type { Document } from "mongoose";

import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

export interface IPayment extends Document {
  userId: string;
  stripeId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: Date;
}

const PaymentSchema = new Schema<IPayment>(
  {
    userId: { type: String, required: true, index: true },
    stripeId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export default models.Payment || model<IPayment>("Payment", PaymentSchema);
