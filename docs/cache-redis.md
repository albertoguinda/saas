# Cache de sitios con Upstash Redis

Tras la primera carga de un sitio, su JSON se guarda en Redis con un TTL según el plan:

- **PREMIUM**: 24h
- **FREE**: 5min

Para invalidar manualmente:

```bash
curl -X POST /api/cache/invalidate -d '{"slug":"mi-sitio"}'
```

Revisa tu panel de Upstash para monitorizar el uso y los logs de la API para confirmar la limpieza.
