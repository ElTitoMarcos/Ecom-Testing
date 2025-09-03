@echo off
cd /d "%~dp0"

rem ensure database is ready
call pnpm db:push
call pnpm db:seed

rem start server in new window and open browser automatically
start "" cmd /c "pnpm build && pnpm start"
timeout /t 5 /nobreak >nul
start "" http://localhost:3000
