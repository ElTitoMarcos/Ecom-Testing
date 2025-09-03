import { prisma } from "@/lib/db"
import Link from "next/link"
import ScoreBadge from "@/components/ScoreBadge"

export default async function Products() {
  let products: { id: string; title: string; platform: string | null; source: string | null; analysis: any }[] = []
  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: { analysis: true }
    })
  } catch (err) {
    console.error('Fallo al acceder a la base de datos', err)
  }

  return (
    <main>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-xl font-semibold text-teal-400">
          📦 Productos
        </h1>
        <Link className="text-sm text-indigo-300 underline" href="/sources">
          + Importar
        </Link>
      </div>
      <div className="grid gap-3">
        {products.map(p => (
          <Link
            key={p.id}
            href={`/products/${p.id}`}
            className="rounded-xl border border-neutral-800 p-4 transition hover:bg-neutral-900"
          >
            <div className="font-medium">{p.title}</div>
            <div className="text-xs text-gray-400">
              {p.platform ?? '—'} · {p.source ?? 'manual'}
            </div>
            <div className="mt-2">
              <ScoreBadge score={p.analysis?.score ?? null} />
            </div>
          </Link>
        ))}
        {products.length === 0 && (
          <div className="text-sm text-gray-500">😕 Sin productos todavía.</div>
        )}
      </div>
    </main>
  )
}
