# Premium ChatBox

Reusable widget to build chat interfaces.

## Props

- `initialMessages` (`ChatMessage[]`): preloaded conversation messages.
- `onSend(text: string)`: callback invoked when the user submits a message.
- `className` (`string`): extra wrapper classes.

Each `ChatMessage` has `{ id: number, text: string, sender?: "user" | "bot" }`.

## Dependencies

- `@heroui/input` and `@heroui/button` for the input field and submit button.
- The optional `Chat` variant uses the internal `useWebSocket` hook.

## Variants

### Chat

Wraps `ChatBox` adding WebSocket support.

Props:

- `wsUrl` (`string`): WebSocket endpoint.
- `user` (`string`): sender identifier.

## Examples

Basic usage:

```tsx
import ChatBox from "@/components/premium/chat/ChatBox";

function Example() {
  return <ChatBox onSend={(text) => console.log(text)} />;
}
```

WebSocket variant:

```tsx
import Chat from "@/components/premium/chat";

<Chat wsUrl="wss://example.com/chat" user="Ada" />;
```

A minimal demo is available at `/demo/chat`.
