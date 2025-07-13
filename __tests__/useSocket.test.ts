import { act, renderHook, waitFor } from "@testing-library/react";

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

  test("sends payload via WebSocket", async () => {
    const sendMock = jest.fn();
    const closeMock = jest.fn();

    // @ts-ignore
    const OriginalWS = WebSocket;
    const socket = {
      send: sendMock,
      close: closeMock,
      readyState: WebSocket.OPEN,
      onmessage: null,
      onopen: null,
      onclose: null,
    };

    // @ts-ignore
    global.WebSocket = jest.fn(() => socket);
    // @ts-ignore
    global.WebSocket.OPEN = OriginalWS.OPEN;

    const { result } = renderHook(() => useSocket({ url: "ws://localhost" }));

    await waitFor(() => expect(global.WebSocket).toHaveBeenCalled());

    act(() => {
      socket.onopen?.();
    });

    expect(result.current.connected).toBe(true);

    act(() => {
      result.current.send({ foo: "bar" });
    });

    expect(sendMock).toHaveBeenCalledWith(JSON.stringify({ foo: "bar" }));
    // restore
    global.WebSocket = OriginalWS;
  });

  test("handles connect and disconnect events", () => {
    const onConnect = jest.fn();
    const onDisconnect = jest.fn();
    const socket = {
      send: jest.fn(),
      close: jest.fn(),
      readyState: WebSocket.OPEN,
      onmessage: null,
      onopen: null,
      onclose: null,
    };

    // @ts-ignore
    global.WebSocket = jest.fn(() => socket);

    const { result } = renderHook(() =>
      useSocket({ url: "ws://localhost", onConnect, onDisconnect }),
    );

    act(() => {
      socket.onopen?.();
    });

    expect(onConnect).toHaveBeenCalled();
    expect(result.current.connected).toBe(true);

    act(() => {
      socket.onclose?.({} as CloseEvent);
    });

    expect(onDisconnect).toHaveBeenCalled();
    expect(result.current.connected).toBe(false);
  });
});
