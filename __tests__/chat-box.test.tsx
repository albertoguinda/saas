import { act, fireEvent, render, screen } from "@testing-library/react";

jest.mock("@heroui/ripple", () => ({
  __esModule: true,
  Ripple: ({ children }: any) => <>{children}</>,
  useRipple: () => ({ onPress: jest.fn(), onClear: jest.fn(), ripples: [] }),
}));

import ChatBox from "@/components/premium/chat/ChatBox";

test("renders initial messages", () => {
  render(<ChatBox initialMessages={[{ id: 1, text: "hello" }]} />);
  expect(screen.getByText("hello")).toBeInTheDocument();
});

test("sends and receives messages via WebSocket", () => {
  const sendMock = jest.fn();
  let onMessage: ((event: MessageEvent) => void) | null = null;

  // @ts-ignore
  global.WebSocket = jest.fn(() => ({
    send: sendMock,
    close: jest.fn(),
    readyState: WebSocket.OPEN,
    set onmessage(cb) {
      onMessage = cb;
    },
    get onmessage() {
      return onMessage;
    },
  }));

  render(<ChatBox wsUrl="ws://localhost" />);

  fireEvent.change(screen.getByPlaceholderText("Type a message"), {
    target: { value: "hi" },
  });
  fireEvent.click(screen.getByText("Send"));

  expect(sendMock).toHaveBeenCalled();

  act(() => {
    onMessage?.({
      data: JSON.stringify({ id: 2, text: "pong" }),
    } as MessageEvent);
  });

  expect(screen.getByText("pong")).toBeInTheDocument();
});
