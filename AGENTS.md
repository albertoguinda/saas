Para cada pull request asegúrate de:

- Ordenar y agrupar imports: externos, internos y estilos.
- Dejar una línea en blanco entre bloques de imports y tras declaraciones importantes.
- Eliminar imports y variables sin uso.
- Ordenar props en JSX: `key`, `ref`, props normales, callbacks y por último spread/rest.
- Ejecutar ESLint y Prettier, corrigiendo warnings.
- Desactivar reglas solo si es imposible cumplirlas sin romper lógica y explica el motivo.
- En server components usa tipos inline recomendados por Next.js 15.
- Resumir en el PR si se ha desactivado alguna regla de forma temporal.

Opcionalmente instala Husky + lint-staged para lanzar lint antes de cada commit.
