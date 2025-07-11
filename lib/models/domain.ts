import type { Document } from "mongoose";

import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface IDomain extends Document {
  userId: string;
  name: string;
  status: "pending" | "validating" | "active";
  createdAt: Date;
  updatedAt: Date;
}

const DomainSchema = new Schema<IDomain>(
  {
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["pending", "validating", "active"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default models.Domain || model<IDomain>("Domain", DomainSchema);
