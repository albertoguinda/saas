import type { Document } from "mongoose";

import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface IOnboarding extends Document {
  userId: string;
  branding?: boolean;
  domain?: boolean;
  analytics?: boolean;
  onboardingStep?: number;
  onboardingCompleted?: boolean;
}

const OnboardingSchema = new Schema<IOnboarding>({
  userId: { type: String, required: true, unique: true },
  branding: { type: Boolean, default: false },
  domain: { type: Boolean, default: false },
  analytics: { type: Boolean, default: false },
  onboardingStep: { type: Number, default: 1 },
  onboardingCompleted: { type: Boolean, default: false },
});

export default models.Onboarding ||
  model<IOnboarding>("Onboarding", OnboardingSchema);
