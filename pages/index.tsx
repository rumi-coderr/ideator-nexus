import { useEffect, useState } from 'react'
import { createClient } from '../utils/supabase/client'
import Link from 'next/link'

export default function Home() {
  const [inventoryCount, setInventoryCount] = useState<number | null>(null)
  const [activePrintCount, setActivePrintCount] = useState<number | null>(null)

  useEffect(() => {
    const fetchCounts = async () => {
      const supabase = createClient()
      const { count: invCount } = await supabase
        .from('inventory_items')
        .select('*', { count: 'exact', head: true })
      setInventoryCount(invCount ?? 0)
      const { count: printCount } = await supabase
        .from('printer_queue')
        .select('*', { count: 'exact', head: true })
        .neq('status', 'done')
      setActivePrintCount(printCount ?? 0)
    }
    fetchCounts()
  }, [])

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center py-16 bg-slate-900 rounded-lg">
        <h1 className="text-5xl font-extrabold text-emerald-400 mb-4">IDEATOR Nexus</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Empowering engineering labs with modern tools – manage inventory, 3D printing, and tool checkout in one place.
        </p>
        <div className="mt-8 space-x-4">
          <Link href="/dashboard" className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 px-6 rounded-md text-lg">
            Go to Dashboard
          </Link>
          <Link href="/inventory" className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium py-2 px-6 rounded-md text-lg">
            View Inventory
          </Link>
        </div>
      </section>

      {/* Status at a Glance */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-emerald-400 mb-2">3D Printer Status</h2>
          {activePrintCount === null ? (
            <p className="text-slate-400">Loading...</p>
          ) : (
            <p className="text-3xl font-bold text-white">{activePrintCount} active {activePrintCount === 1 ? 'job' : 'jobs'}</p>
          )}
          <p className="text-slate-400 mt-2">Currently in the queue</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold text-emerald-400 mb-2">Total Inventory</h2>
          {inventoryCount === null ? (
            <p className="text-slate-400">Loading...</p>
          ) : (
            <p className="text-3xl font-bold text-white">{inventoryCount} items</p>
          )}
          <p className="text-slate-400 mt-2">Tracked in the lab database</p>
        </div>
      </section>

      {/* Safety Documentation Links */}
      <section className="bg-slate-800 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-emerald-400 mb-4">Lab Safety Documentation</h2>
        <ul className="list-disc list-inside space-y-2 text-slate-300">
          <li><a href="/safety/general.pdf" className="text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">General Safety Guidelines</a></li>
          <li><a href="/safety/3d-printing.pdf" className="text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">3D Printing Safety Protocol</a></li>
          <li><a href="/safety/tool-checkout.pdf" className="text-emerald-400 hover:underline" target="_blank" rel="noopener noreferrer">Tool Checkout & Handling</a></li>
        </ul>
      </section>
    </div>
  )
}
