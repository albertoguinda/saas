import type { Document } from "mongoose";

import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface IBackup extends Document {
  userId: string;
  type: "manual" | "auto";
  data: Buffer;
  size: number;
  createdAt: Date;
}

const BackupSchema = new Schema<IBackup>(
  {
    userId: { type: String, required: true, index: true },
    type: { type: String, enum: ["manual", "auto"], default: "manual" },
    data: { type: Buffer, required: true },
    size: { type: Number, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export default models.Backup || model<IBackup>("Backup", BackupSchema);
