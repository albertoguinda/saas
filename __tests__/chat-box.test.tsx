import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";

import ChatBox from "@/components/premium/chat/ChatBox";

jest.mock("next-auth/react", () => ({ useSession: jest.fn() }));

const mockedUseSession = useSession as jest.Mock;

test("renders messages when authenticated", () => {
  mockedUseSession.mockReturnValue({ data: { user: { id: "1" } } });

  render(<ChatBox initialMessages={[{ id: 1, text: "hello" }]} />);

  expect(screen.getByText("hello")).toBeInTheDocument();
});

test("shows login prompt when not authenticated", () => {
  mockedUseSession.mockReturnValue({ data: null });

  render(<ChatBox initialMessages={[{ id: 1, text: "hello" }]} />);

  expect(screen.queryByText("hello")).not.toBeInTheDocument();
  expect(screen.getByText(/log in to chat/i)).toBeInTheDocument();
});
