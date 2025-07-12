import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function OnboardingGate() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function check() {
      if (session?.user?.plan !== "premium") return;
      if (router.pathname.startsWith("/dashboard/onboarding")) return;
      try {
        const res = await fetch("/api/onboarding");
        const data = await res.json();
        const ob = data.onboarding || {};

        if (!ob.branding || !ob.domain || !ob.analytics) {
          router.push("/dashboard/onboarding");
        }
      } catch {
        // ignore
      }
    }
    check();
  }, [session, router.pathname]);

  return null;
}
