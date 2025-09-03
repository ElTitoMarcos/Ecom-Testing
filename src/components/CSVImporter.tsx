'use client'

import Papa from "papaparse"
import { useState } from "react"

type Mapping = {
  title?: string
  price?: string
  currency?: string
  adUrl?: string
  platform?: string
  source?: string
  supplierUrl?: string
  images?: string
  notes?: string
}

export default function CSVImporter() {
  const [rows, setRows] = useState<any[]>([])
  const [mapping, setMapping] = useState<Mapping>({ title: 'title', price: 'price', currency: 'currency' })
  const [status, setStatus] = useState<string>('')

  function onFile(file: File) {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => setRows(res.data as any[])
    })
  }

  async function importNow() {
    setStatus('Importando...')
    const mapped = rows.map(r => ({
      title: r[mapping.title ?? 'title'] ?? 'Untitled',
      price: parseFloat(r[mapping.price ?? 'price']) || undefined,
      currency: r[mapping.currency ?? 'currency'] || undefined,
      adUrl: r[mapping.adUrl ?? 'adUrl'] || undefined,
      platform: r[mapping.platform ?? 'platform'] || undefined,
      source: r[mapping.source ?? 'source'] || 'CSV',
      supplierUrl: r[mapping.supplierUrl ?? 'supplierUrl'] || undefined,
      images: (r[mapping.images ?? 'images'] || '').split('|').filter(Boolean),
      notes: r[mapping.notes ?? 'notes'] || undefined
    }))

    const res = await fetch('/api/import', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: mapped })
    })
    if (!res.ok) {
      const t = await res.text()
      setStatus('Error: ' + t)
      return
    }
    setStatus('Importado ✅')
  }

  const headers = rows[0] ? Object.keys(rows[0]) : []

  return (
    <div className="space-y-4">
      <input type="file" accept=".csv" onChange={e => e.target.files?.[0] && onFile(e.target.files[0])} />
      {headers.length > 0 && (
        <div className="rounded-xl border border-neutral-800 p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.keys(mapping).map((k) => (
              <div key={k} className="text-sm">
                <div className="text-gray-400">{k}</div>
                <select className="bg-neutral-900 border border-neutral-700 rounded p-2 w-full"
                  value={(mapping as any)[k] ?? ''}
                  onChange={(e) => setMapping(m => ({ ...m, [k]: e.target.value }))}>
                  <option value="">—</option>
                  {headers.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
            ))}
          </div>
          <button onClick={importNow} className="mt-4 rounded-xl border border-neutral-700 px-4 py-2 hover:bg-neutral-900">
            Importar {rows.length} filas
          </button>
          <div className="text-xs text-gray-400 mt-2">{status}</div>
        </div>
      )}
      {rows.length === 0 && <p className="text-sm text-gray-400">Sube un CSV exportado de tus herramientas (ej., PiPiADS, Dropispy). Usa el mapeo para alinear columnas.</p>}
    </div>
  )
}
