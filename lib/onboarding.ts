export interface OnboardingProgress {
  branding: boolean;
  domain: boolean;
  analytics: boolean;
}

export function isOnboardingComplete(progress: OnboardingProgress) {
  return progress.branding && progress.domain && progress.analytics;
}

export function nextOnboardingStep(progress: OnboardingProgress) {
  if (!progress.branding) return "branding";
  if (!progress.domain) return "domain";
  if (!progress.analytics) return "analytics";

  return null;
}
