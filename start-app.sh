#!/usr/bin/env sh
pnpm db:push && pnpm db:seed && pnpm build && pnpm start
