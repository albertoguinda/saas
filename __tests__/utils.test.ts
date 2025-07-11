import { cn } from "@/lib/utils";

test("cn merges class names", () => {
  expect(cn("a", "b")).toBe("a b");
});
