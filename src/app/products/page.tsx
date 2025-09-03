import { prisma } from "@/lib/db"
import Link from "next/link"
import ScoreBadge from "@/components/ScoreBadge"

export default async function Products() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: { analysis: true }
  })

  return (
    <main>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold mb-2">Productos</h1>
        <Link className="text-sm underline" href="/sources">+ Importar</Link>
      </div>
      <div className="grid gap-3">
        {products.map(p => (
          <Link key={p.id} href={`/products/${p.id}`} className="rounded-xl border border-neutral-800 p-4 hover:bg-neutral-900 transition">
            <div className="font-medium">{p.title}</div>
            <div className="text-xs text-gray-400">{p.platform ?? '—'} · {p.source ?? 'manual'}</div>
            <div className="mt-2"><ScoreBadge score={p.analysis?.score ?? null} /></div>
          </Link>
        ))}
        {products.length === 0 && <div className="text-sm text-gray-500">Sin productos todavía.</div>}
      </div>
    </main>
  )
}
