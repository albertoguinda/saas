import type { Document } from "mongoose";

import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Interface for TypeScript
export interface IEvent extends Document {
  userId: string;
  event: string;
  page?: string;
  timestamp?: number;
  duration?: number;
  x?: number;
  y?: number;
  createdAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    userId: { type: String, required: true, index: true },
    event: { type: String, required: true },
    page: { type: String },
    timestamp: { type: Number },
    duration: { type: Number },
    x: { type: Number },
    y: { type: Number },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export default models.Event || model<IEvent>("Event", EventSchema);
