import { act, renderHook } from "@testing-library/react";

import useSocket from "@/lib/hooks/useSocket";

describe("useSocket", () => {
  test("generates mock data when no url provided", () => {
    jest.useFakeTimers();
    const mockGenerator = jest.fn(() => ({ hello: "world" }));
    const { result } = renderHook(() =>
      useSocket<{ hello: string }>({ mockGenerator, mockInterval: 500 }),
    );

    expect(result.current.data).toBeNull();
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current.data).toEqual({ hello: "world" });
    expect(mockGenerator).toHaveBeenCalled();
    jest.useRealTimers();
  });

  test("sends payload via WebSocket", () => {
    const sendMock = jest.fn();
    const closeMock = jest.fn();

    // @ts-ignore
    global.WebSocket = jest.fn(() => ({
      send: sendMock,
      close: closeMock,
      readyState: WebSocket.OPEN,
      onmessage: null,
    }));

    const { result } = renderHook(() => useSocket({ url: "ws://localhost" }));

    act(() => {
      result.current.send({ foo: "bar" });
    });

    expect(sendMock).toHaveBeenCalledWith(JSON.stringify({ foo: "bar" }));
  });
});
