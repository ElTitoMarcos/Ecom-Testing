import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const created = await prisma.product.create({ data: {
    title: String(body.title ?? 'Untitled'),
    description: body.description ?? null,
    price: typeof body.price === 'number' ? body.price : (body.price ? parseFloat(body.price) : null),
    currency: body.currency ?? 'USD',
    source: body.source ?? null,
    platform: body.platform ?? null,
    adUrl: body.adUrl ?? null,
    supplierUrl: body.supplierUrl ?? null,
    metricsJson: body.metrics ?? body.metricsJson ?? null,
    images: Array.isArray(body.images) ? body.images : (typeof body.images === 'string' ? body.images.split('|').filter(Boolean) : []),
    notes: body.notes ?? null
  }})
  return NextResponse.json(created, { status: 201 })
}
