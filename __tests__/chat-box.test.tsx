import { fireEvent, render, screen } from "@testing-library/react";

import ChatBox from "@/components/premium/chat/ChatBox";

test("adds message after submit", () => {
  render(<ChatBox />);
  fireEvent.change(screen.getByPlaceholderText("Type a message"), {
    target: { value: "hello" },
  });
  fireEvent.click(screen.getByRole("button", { name: /send/i }));
  expect(screen.getByText("hello")).toBeInTheDocument();
});
