import "./globals.css"
import Link from "next/link"

export const metadata = {
  title: "Trend Forge",
  description: "Product Research Copilot",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <nav className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-2xl font-bold text-teal-400">
              🧭 Trend Forge
            </div>
            <div className="flex gap-4 text-sm">
              <Link className="flex items-center gap-1 hover:text-teal-300" href="/">
                <span>🏠</span> Dashboard
              </Link>
              <Link className="flex items-center gap-1 hover:text-teal-300" href="/products">
                <span>📦</span> Productos
              </Link>
              <Link className="flex items-center gap-1 hover:text-teal-300" href="/sources">
                <span>📥</span> Importar
              </Link>
            </div>
          </nav>
          {children}
          <footer className="mt-10 text-xs text-gray-400 text-center">
            Hecho con Next.js + Prisma · Diseño colorido y útil · © {new Date().getFullYear()}
          </footer>
        </div>
      </body>
    </html>
  )
}
