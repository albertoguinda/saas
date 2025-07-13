import { fireEvent, render, screen } from "@testing-library/react";
import { signIn, useSession } from "next-auth/react";

import ChatBox from "@/components/premium/chat/ChatBox";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key.split(".").pop(),
}));

jest.mock("@heroui/ripple", () => ({
  __esModule: true,
  Ripple: ({ children }: any) => <>{children}</>,
  useRipple: () => ({ onPress: jest.fn(), onClear: jest.fn(), ripples: [] }),
}));

const sendMock = jest.fn();

jest.mock("@/lib/hooks/useSocket", () => ({
  __esModule: true,
  default: () => ({ data: null, send: sendMock }),
}));

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
  useSession: jest.fn(),
}));

const useSessionMock = useSession as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
});

test("prompts login when unauthenticated", () => {
  useSessionMock.mockReturnValue({ data: null });
  render(<ChatBox />);
  fireEvent.click(screen.getByRole("button", { name: /signin/i }));
  expect(signIn).toHaveBeenCalled();
});

test("sends message when authenticated", () => {
  useSessionMock.mockReturnValue({ data: { user: { name: "Ada" } } });
  render(<ChatBox />);
  fireEvent.change(screen.getByPlaceholderText(/placeholder/i), {
    target: { value: "hello" },
  });
  fireEvent.click(screen.getByRole("button", { name: /send/i }));
  expect(sendMock).toHaveBeenCalled();
  expect(screen.getByText(/hello/)).toBeInTheDocument();
});
