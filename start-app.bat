@echo off
cd /d "%~dp0"
call pnpm build || goto end
call pnpm start
:end
pause
