# 🗄️ Backups automáticos

Los usuarios del plan PREMIUM pueden generar una copia de seguridad manualmente o restaurar la última con un clic.

## Uso local

```bash
npm run backup:local
```

Genera `backup.json` con una exportación básica para pruebas.

### Endpoints

- `POST /api/backup/create` → descarga `backup.zip` con tus sitios y perfil.
- `POST /api/backup/restore` → sube `backup.zip` o JSON para restaurar tu cuenta.
