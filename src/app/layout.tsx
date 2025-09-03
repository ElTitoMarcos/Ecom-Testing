import "./globals.css"
import Link from "next/link"

export const metadata = {
  title: "Trend Forge",
  description: "Product Research Copilot",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <nav className="flex items-center justify-between mb-6">
            <div className="text-xl font-semibold">🧭 Trend Forge</div>
            <div className="flex gap-4 text-sm">
              <Link href="/">Dashboard</Link>
              <Link href="/products">Productos</Link>
              <Link href="/sources">Importar</Link>
            </div>
          </nav>
          {children}
          <footer className="mt-10 text-xs text-gray-400">
            Hecho con Next.js + Prisma · Diseño sobrio y útil · © {new Date().getFullYear()}
          </footer>
        </div>
      </body>
    </html>
  )
}
