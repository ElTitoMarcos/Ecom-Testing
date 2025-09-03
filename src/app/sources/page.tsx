import CSVImporter from "@/components/CSVImporter"

export default function Sources() {
  return (
    <main>
      <h1 className="mb-2 flex items-center gap-2 text-xl font-semibold text-teal-400">
        📥 Importar datos
      </h1>
      <p className="mb-4 text-sm text-gray-300">
        Carga CSV/JSON desde PiPiADS, Dropispy, AdSpy, TikTok, etc. También puedes mapear columnas personalizadas.
      </p>
      <CSVImporter />
      <div className="mt-8 text-xs text-gray-500">
        Consejo: añade URLs de los anuncios (adUrl) para abrirlos desde la Ficha del producto.
      </div>
    </main>
  )
}
