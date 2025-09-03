import CSVImporter from "@/components/CSVImporter"

export default function Sources() {
  return (
    <main>
      <h1 className="text-xl font-semibold mb-2">Importar datos</h1>
      <p className="text-sm text-gray-400 mb-4">
        Carga CSV/JSON desde PiPiADS, Dropispy, AdSpy, TikTok, etc. También puedes mapear columnas personalizadas.
      </p>
      <CSVImporter />
      <div className="mt-8 text-xs text-gray-500">
        Consejo: añade URLs de los anuncios (adUrl) para abrirlos desde la Ficha del producto.
      </div>
    </main>
  )
}
