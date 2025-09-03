import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const body = await req.json()
  const items = body.items as any[]
  if (!Array.isArray(items)) return NextResponse.json({ error: "items must be array" }, { status: 400 })

  for (const it of items) {
    await prisma.product.create({ data: {
      title: String(it.title ?? 'Untitled'),
      description: it.description ?? null,
      price: typeof it.price === 'number' ? it.price : (it.price ? parseFloat(it.price) : null),
      currency: it.currency ?? 'USD',
      source: it.source ?? null,
      platform: it.platform ?? null,
      adUrl: it.adUrl ?? null,
      supplierUrl: it.supplierUrl ?? null,
      metricsJson: it.metrics ?? it.metricsJson ?? null,
      images: Array.isArray(it.images) ? it.images : (typeof it.images === 'string' ? it.images.split('|').filter(Boolean) : []),
      notes: it.notes ?? null
    }})
  }

  return NextResponse.json({ ok: true, count: items.length })
}
