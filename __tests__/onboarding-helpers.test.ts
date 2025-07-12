import { isOnboardingComplete, nextOnboardingStep } from "@/lib/onboarding";

test("detects completion", () => {
  expect(
    isOnboardingComplete({ branding: true, domain: true, analytics: true }),
  ).toBe(true);
});

test("returns next step", () => {
  expect(
    nextOnboardingStep({ branding: false, domain: false, analytics: false }),
  ).toBe("branding");
  expect(
    nextOnboardingStep({ branding: true, domain: false, analytics: false }),
  ).toBe("domain");
  expect(
    nextOnboardingStep({ branding: true, domain: true, analytics: false }),
  ).toBe("analytics");
  expect(
    nextOnboardingStep({ branding: true, domain: true, analytics: true }),
  ).toBeNull();
});
