# Trend Forge — Product Research Copilot

App web (Next.js + Prisma + Tailwind) para **unificar señales** de múltiples herramientas y **analizar productos** con ayuda de IA (OpenAI), usando como marco mental *Breakthrough Advertising* (conciencia, sofisticación, deseo, USP, ángulos, objeciones, riesgo reverso).

## Qué hace
- Importa datos desde CSV/JSON (PiPiADS, Dropispy, TikTok, etc.) o crea productos manualmente.
- Guarda productos en SQLite y permite verlos en un dashboard visual.
- Envía cada producto a un endpoint `/api/openai` que puntúa y sugiere ángulos con un prompt inspirado en *Breakthrough Advertising*.
- Visualiza un **Score** con explicación y acciones sugeridas.
- Modular: conéctale APIs cuando existan; mientras tanto, soporta cargas manuales.

> **Nota:** Muchas de las herramientas listadas no exponen API públicas. Este proyecto incluye conectores **de importación** (CSV/JSON) y estructura de código para añadir APIs cuando estén disponibles.

## Arranque
1. **Instalar deps**
   ```bash
   pnpm i   # o npm i / yarn
   ```
2. **Variables de entorno**
   ```bash
   cp .env.example .env
   # Edita OPENAI_API_KEY=sk-...
   ```
3. **Base de datos (SQLite + Prisma)**
   ```bash
   pnpm run db:push
   pnpm run db:seed   # opcional, datos de ejemplo
   ```
4. **Dev server**
   ```bash
   pnpm dev
   ```
   Abre http://localhost:3000

5. **Producción rápida**
   ```bash
   ./start-app.sh
   ```
   Construye y lanza el servidor en modo producción.

## Estructura
- `src/app` — rutas (app router). `/` dashboard, `/sources` importador, `/products` lista.
- `src/lib` — prisma, openai, scoring.
- `src/prompts` — prompt de Breakthrough Advertising.
- `src/components` — UI (Tailwind).

## Integraciones (siguientes pasos)
- Añadir **OpenAI Responses API** con herramientas (web/file search) cuando aplique.
- Conectar **Shopify Admin GraphQL** (si necesitas sincronizar productos/landings).
- Añadir SDKs de **ElevenLabs / Play.ht / Heygen** para prototipos de voz/video en anuncios.
- Crear parsers específicos por export (PiPiADS, AdSpy, Dropispy) y normalizar campos.

## Licencia
MIT
