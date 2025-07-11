# 📧 Emails transaccionales

Este proyecto utiliza **Resend** para el envío de correos en momentos clave (registro, cambio de plan, alertas).

## Variables de entorno

- `RESEND_API_KEY`: clave de API generada en el panel de Resend.

## Ejemplo de uso

```ts
import { sendEmail } from "@/lib/email";

await sendEmail({
  to: "user@example.com",
  subject: "Bienvenido",
  html: "<b>Gracias por registrarte</b>",
});
```
