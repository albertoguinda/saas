import { render, screen } from "@testing-library/react";

import ChatBox from "@/components/premium/chat/ChatBox";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

test("renders initial messages", () => {
  render(<ChatBox initialMessages={[{ id: 1, text: "hello" }]} />);
  expect(screen.getByText("hello")).toBeInTheDocument();
});
