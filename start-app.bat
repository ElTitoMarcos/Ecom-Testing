@echo off
cd /d "%~dp0"

if not exist .env (
  echo Creating .env from example...
  copy .env.example .env >nul
)

call pnpm db:push
if %errorlevel% neq 0 exit /b %errorlevel%
call pnpm db:seed
if %errorlevel% neq 0 exit /b %errorlevel%
call pnpm build
if %errorlevel% neq 0 exit /b %errorlevel%

start "" cmd /k "cd /d ^"%~dp0^" && pnpm start"

timeout /t 5 /nobreak >nul
start "" http://localhost:3000
