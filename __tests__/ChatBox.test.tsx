import { render, screen } from "@testing-library/react";

import ChatBox from "@/components/premium/chat/ChatBox";

jest.mock("@/lib/hooks/useSocket", () => ({
  useSocket: () => ({ messages: [], sendMessage: jest.fn() }),
}));

jest.mock("next-themes", () => ({ useTheme: () => ({ theme: "light" }) }));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key.split(".").pop(),
}));

test("renders input field", () => {
  render(<ChatBox channel="demo" user={{ id: "1", name: "Ada" }} />);
  expect(screen.getByPlaceholderText("placeholder")).toBeInTheDocument();
});
