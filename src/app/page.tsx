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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-neutral-800 p-4 shadow-soft">
          <div className="text-gray-400 text-sm">Productos</div>
          <div className="text-3xl font-semibold mt-2">{count}</div>
        </div>
        <div className="rounded-2xl border border-neutral-800 p-4 shadow-soft">
          <div className="text-gray-400 text-sm">Integraciones</div>
          <div className="text-3xl font-semibold mt-2">OpenAI ✅ · CSV ✅</div>
        </div>
        <div className="rounded-2xl border border-neutral-800 p-4 shadow-soft">
          <div className="text-gray-400 text-sm">Siguiente</div>
          <div className="mt-2 text-sm">Añade productos en <Link className="underline" href="/sources">Importar</Link> y analízalos con IA.</div>
        </div>
      </div>

      <h2 className="mt-8 mb-2 font-semibold">Últimos añadidos</h2>
      <div className="grid gap-3">
        {latest.map(p => (
          <Link key={p.id} href={`/products/${p.id}`} className="rounded-xl border border-neutral-800 p-4 hover:bg-neutral-900 transition">
            <div className="font-medium">{p.title}</div>
            <div className="text-xs text-gray-400">{p.platform ?? '—'} · {p.source ?? 'manual'}</div>
          </Link>
        ))}
        {latest.length === 0 && <div className="text-sm text-gray-500">Sin productos todavía.</div>}
      </div>
    </main>
  )
}
