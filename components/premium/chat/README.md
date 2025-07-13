# Premium Chat

Componente React para soporte en tiempo real mediante WebSockets.

## Props

- `wsUrl` (string): URL del WebSocket.
- `user` (string): identificador del usuario emisor.

## Dependencias

- Hook `useWebSocket` interno para la comunicación.
- Componentes `@heroui/input` y `@heroui/button` para la interfaz.

## Ejemplo de uso

```tsx
import Chat from "@/components/premium/chat";

<Chat wsUrl="wss://example.com/chat" user="Ada" />;
```

La página `/demo/chat` ofrece una demostración básica.
