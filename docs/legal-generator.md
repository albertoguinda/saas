# Generador de textos legales

Usa el endpoint `/api/legal` para crear textos de cookies, privacidad y términos.

Ejemplo de creación:

```bash
POST /api/legal
{
  "siteId": "abcd1234"
}
```

El sistema guarda tres documentos asociados al sitio. Puedes consultarlos con:

```bash
GET /api/legal?siteId=abcd1234
```
