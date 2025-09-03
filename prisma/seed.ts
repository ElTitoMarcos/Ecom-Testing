import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.product.create({
    data: {
      title: "Dog Hair Remover Pro 2.0",
      description: "Cepillo para quitar pelos de mascota, versión 2.0 con depósito.",
      price: 24.99,
      currency: "USD",
      source: "PiPiADS CSV",
      platform: "TikTok",
      adUrl: "https://example.com/ad/123",
      supplierUrl: "https://example.com/supplier/abc",
      metricsJson: { views: 1200000, likes: 45000, ctr: 2.3, cvr: 3.1 },
      images: ["https://picsum.photos/seed/dog/640/480"],
      notes: "Alto engagement; validar objeciones sobre limpieza del depósito."
    }
  })
}
main().finally(async () => await prisma.$disconnect())
