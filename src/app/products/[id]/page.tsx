import { prisma } from "@/lib/db"
import ScoreBadge from "@/components/ScoreBadge"

function Field({ label, children }: any) {
  return (
    <div className="text-sm">
      <div className="text-gray-400">{label}</div>
      <div>{children || '—'}</div>
    </div>
  )
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id }, include: { analysis: true } })
  if (!product) return <div>Producto no encontrado.</div>

  async function analyze() {
    "use server"
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/openai`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: product.id })
    })
    if (!res.ok) throw new Error('Error al analizar')
  }

  return (
    <main>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{product.title}</h1>
        <form action={analyze}>
          <button className="rounded-xl border border-neutral-700 px-4 py-2 hover:bg-neutral-900">Analizar con IA</button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
        <div className="md:col-span-2 space-y-3">
          <Field label="Descripción">{product.description}</Field>
          <Field label="Precio">{product.price ? `${product.price} ${product.currency}` : '—'}</Field>
          <Field label="Plataforma">{product.platform}</Field>
          <Field label="Fuente">{product.source}</Field>
          <Field label="Anuncio">
            {product.adUrl ? <a className="underline" href={product.adUrl} target="_blank">Abrir</a> : '—'}
          </Field>
          <Field label="Proveedor">
            {product.supplierUrl ? <a className="underline" href={product.supplierUrl} target="_blank">Abrir</a> : '—'}
          </Field>
          <Field label="Notas">{product.notes}</Field>
          <Field label="Métricas"><pre className="text-xs bg-neutral-900 p-3 rounded-xl overflow-x-auto">{JSON.stringify(product.metricsJson, null, 2)}</pre></Field>
        </div>
        <div className="space-y-3">
          <div className="rounded-2xl border border-neutral-800 p-4">
            <div className="flex items-center gap-3">
              <ScoreBadge score={product.analysis?.score ?? 0} />
              <div className="text-sm text-gray-400">Puntaje potencial</div>
            </div>
            {product.analysis?.rationale && (
              <div className="mt-3 text-sm text-gray-200 whitespace-pre-wrap">{product.analysis?.rationale}</div>
            )}
            {product.analysis && (
              <div className="mt-4 text-xs text-gray-400">
                <div><b>Conciencia:</b> {product.analysis.stageOfAwareness ?? '—'}</div>
                <div><b>Sofisticación:</b> {product.analysis.sophistication ?? '—'}</div>
                <div><b>Deseo:</b> {product.analysis.massDesire ?? '—'}</div>
                <div><b>USP:</b> {product.analysis.usp ?? '—'}</div>
                <div><b>Ángulos:</b> {product.analysis.angles?.join(' · ') ?? '—'}</div>
                <div><b>Objeciones:</b> {product.analysis.objections?.join(' · ') ?? '—'}</div>
                <div><b>Riesgo Reverso:</b> {product.analysis.riskReversals?.join(' · ') ?? '—'}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
