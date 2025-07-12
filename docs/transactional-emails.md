# 📧 Emails transaccionales

Este proyecto utiliza **Resend** para el envío de correos en momentos clave: registro con confirmación, cambios de plan y backups/restauraciones.

## Variables de entorno

- `RESEND_API_KEY`: clave de API generada en el panel de Resend.

## Ejemplo de uso

```ts
import { sendEmail } from "@/lib/emails";

await sendEmail({
  to: "user@example.com",
  subject: "Bienvenido",
  html: "<b>Gracias por registrarte</b>",
});
```

Las plantillas básicas se generan en `lib/emails.ts` y pueden adaptarse al idioma gracias a los mensajes de `messages/*.json`.
Cada envío se registra en la colección `EmailLog` para auditar errores y reintentos.
