# Guia de contribucion

Gracias por contribuir al **Coca-Cola Stock Portal**.

## Estructura del repositorio

Antes de enviar cambios, revisa la arquitectura en [`docs/architecture.md`](docs/architecture.md).

## Flujo de trabajo

1. Crea una rama desde `main`.
2. Instala dependencias: `npm install`
3. Instala git hooks: `npm run hooks:install`
4. Desarrolla en `src/` y agrega pruebas en `tests/`.
5. Ejecuta pruebas: `npm test`
6. Abre un Pull Request hacia `main`.

## Convenciones

- Codigo fuente en `src/`
- Pruebas en `tests/` (nunca dentro de `src/`)
- Scripts de utilidad en `scripts/`
- Documentacion en `docs/`
- Pipeline CI en `.github/workflows/`

## Pruebas

Toda funcionalidad nueva debe incluir pruebas en `tests/`:

```bash
npm test
npm run coverage
```

## Git hooks

El hook `pre-push` ejecuta las pruebas antes de cada push. Instalalo con:

```bash
npm run hooks:install
```

## Pipeline CI

Cada PR dispara GitHub Actions automaticamente. El pipeline debe pasar en verde antes del merge.
