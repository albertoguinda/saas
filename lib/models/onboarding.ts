import type { Document } from "mongoose";

import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface IOnboarding extends Document {
  userId?: string;
  siteId?: string;
  branding?: boolean;
  domain?: boolean;
  analytics?: boolean;
  onboardingStep?: string;
  onboardingCompleted?: boolean;
}

const OnboardingSchema = new Schema<IOnboarding>({
  userId: { type: String },
  siteId: { type: String },
  branding: { type: Boolean, default: false },
  domain: { type: Boolean, default: false },
  analytics: { type: Boolean, default: false },
  onboardingStep: { type: String, default: "" },
  onboardingCompleted: { type: Boolean, default: false },
});

export default models.Onboarding ||
  model<IOnboarding>("Onboarding", OnboardingSchema);
