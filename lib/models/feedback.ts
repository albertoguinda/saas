import type { Document } from "mongoose";

import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface IFeedback extends Document {
  userId: string;
  message: string;
  createdAt: Date;
}

const FeedbackSchema = new Schema<IFeedback>(
  {
    userId: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true },
);

export default models.Feedback || model<IFeedback>("Feedback", FeedbackSchema);
