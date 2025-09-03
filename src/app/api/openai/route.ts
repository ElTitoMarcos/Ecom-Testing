import { prisma } from "@/lib/db"
import { analyzeWithOpenAI } from "@/lib/openai"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { productId } = await req.json()
  if (!productId) return NextResponse.json({ error: "Missing productId" }, { status: 400 })

  const product = await prisma.product.findUnique({ where: { id: productId } })
  if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 })

  const analysis = await analyzeWithOpenAI({
    title: product.title,
    description: product.description ?? undefined,
    metrics: (product.metricsJson ?? undefined) as any
  })

  const saved = await prisma.analysis.upsert({
    where: { productId: product.id },
    update: {
      ...analysis,
      raw: analysis as any
    },
    create: {
      productId: product.id,
      ...analysis,
      raw: analysis as any
    }
  })

  return NextResponse.json({ ok: true, analysis: saved })
}
