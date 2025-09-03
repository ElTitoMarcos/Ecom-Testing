import { prisma } from "@/lib/db"
import Link from "next/link"

export default async function Page() {
  let count = 0
  let latest: { id: string; title: string; platform: string | null; source: string | null }[] = []

  try {
    count = await prisma.product.count()
    latest = await prisma.product.findMany({ orderBy: { createdAt: 'desc' }, take: 5 })
  } catch (err) {
    console.error('Fallo al acceder a la base de datos', err)
  }

  return (
    <main>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-teal-500/40 bg-slate-800/40 p-4 shadow-soft">
          <div className="flex items-center gap-1 text-sm text-teal-400">
            <span>📦</span> Productos
          </div>
          <div className="mt-2 text-3xl font-semibold text-white">{count}</div>
        </div>
        <div className="rounded-2xl border border-purple-500/40 bg-slate-800/40 p-4 shadow-soft">
          <div className="flex items-center gap-1 text-sm text-purple-400">
            <span>🧩</span> Integraciones
          </div>
          <div className="mt-2 text-3xl font-semibold">OpenAI ✅ · CSV ✅</div>
        </div>
        <div className="rounded-2xl border border-indigo-500/40 bg-slate-800/40 p-4 shadow-soft">
          <div className="flex items-center gap-1 text-sm text-indigo-400">
            <span>⏭️</span> Siguiente
          </div>
          <div className="mt-2 text-sm">
            Añade productos en
            <Link className="text-indigo-300 underline" href="/sources">
              {' '}Importar
            </Link>{' '}y analízalos con IA.
          </div>
        </div>
      </div>

      <h2 className="mt-8 mb-2 flex items-center gap-2 font-semibold text-teal-400">
        🌟 Últimos añadidos
      </h2>
      <div className="grid gap-3">
        {latest.map(p => (
          <Link
            key={p.id}
            href={`/products/${p.id}`}
            className="rounded-xl border border-neutral-800 p-4 transition hover:bg-neutral-900"
          >
            <div className="font-medium">{p.title}</div>
            <div className="text-xs text-gray-400">
              {p.platform ?? '—'} · {p.source ?? 'manual'}
            </div>
          </Link>
        ))}
        {latest.length === 0 && (
          <div className="text-sm text-gray-500">😕 Sin productos todavía.</div>
        )}
      </div>
    </main>
  )
}
