#!/usr/bin/env sh
[ -f .env ] || cp .env.example .env
pnpm db:push && pnpm db:seed && pnpm build && pnpm start
