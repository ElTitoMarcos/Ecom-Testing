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
        <div className="flex items-center gap-3">
          <button className="rounded-md bg-rose-700 px-3 py-1 text-xs font-medium text-white hover:bg-rose-600">
            Eliminar seleccionados
          </button>
          <Link className="rounded-md bg-indigo-600 px-3 py-1 text-xs font-medium text-white hover:bg-indigo-500" href="/sources">
            + Importar
          </Link>
        </div>
      </div>
      <div className="grid gap-3">
        {products.map(p => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded-xl border border-neutral-800 p-4 transition hover:bg-neutral-900"
          >
            <div className="flex items-center gap-3">
              <input type="checkbox" className="accent-teal-500 rounded" />
              <div>
                <div className="font-medium">{p.title}</div>
                <div className="text-xs text-gray-400">
                  {p.platform ?? '—'} · {p.source ?? 'manual'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ScoreBadge score={p.analysis?.score ?? null} />
              <Link
                href={`/products/${p.id}`}
                className="rounded-md bg-teal-600 px-2 py-1 text-xs font-medium text-white hover:bg-teal-500"
              >
                Ver
              </Link>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="text-sm text-gray-500">😕 Sin productos todavía.</div>
        )}
      </div>
    </main>
  )
}
