# 🗄️ Backups automáticos

Los usuarios del plan PREMIUM pueden generar una copia de seguridad manualmente o restaurar la última con un clic.

## Uso local

```bash
npm run backup:local
```

Genera `backup.json` con una exportación básica para pruebas.

### Endpoints

- `GET /api/backup` → lista tus backups.
- `POST /api/backup` → genera copia (`Accept: application/zip` para descargarla).
- `POST /api/restore` → restaura un backup por ID.
