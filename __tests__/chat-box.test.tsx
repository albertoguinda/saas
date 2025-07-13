import { fireEvent, render, screen } from "@testing-library/react";

import ChatBox from "@/components/premium/chat/ChatBox";

const send = jest.fn();
const hookReturn = {
  data: { id: "1", text: "hello", userId: "support" },
  send,
};

jest.mock("@/components/hooks/useSocket", () => () => hookReturn);

jest.mock("next-auth/react", () => ({
  useSession: () => ({ data: { user: { id: "user1" } } }),
}));

test("renders incoming message and sends new one", async () => {
  render(<ChatBox wsUrl="ws://test" />);
  expect(await screen.findByText(/hello/)).toBeInTheDocument();

  fireEvent.change(screen.getByRole("textbox"), { target: { value: "hi" } });
  fireEvent.click(screen.getByRole("button"));

  expect(send).toHaveBeenCalled();
});
