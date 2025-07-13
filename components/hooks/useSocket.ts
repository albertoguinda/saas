import type { UseWebSocketOptions } from "./useWebSocket";

import useWebSocket from "./useWebSocket";

export default function useSocket<T = unknown>(
  options: UseWebSocketOptions<T>,
) {
  return useWebSocket<T>(options);
}
