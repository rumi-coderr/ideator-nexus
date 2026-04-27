import { useEffect, useState } from 'react'
import { createClient } from '../utils/supabase/client'

export const dynamic = 'force-dynamic'
import Link from 'next/link'

interface InventoryItem {
  id: string
  name: string
  quantity: number
  sku: string
}

interface PrintJob {
  id: string
  job_name: string
  filament_type: string
  estimated_dur: number
  status: string
  queued_at: string
}

interface Checkout { id: string; item_id: string; due_at: string }

export default function Dashboard() {
  const [lowInventory, setLowInventory] = useState<InventoryItem[]>([])
  const [activePrints, setActivePrints] = useState<PrintJob[]>([])
  const [pendingReturns, setPendingReturns] = useState<Checkout[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      // Low inventory where quantity < 5
      const { data: inv, error: invErr } = await supabase
        .from('inventory_items')
        .select('*')
        .lt('quantity', 5)
      if (!invErr) setLowInventory(inv as InventoryItem[])

      // Active 3D print jobs from printer_queue where status != 'done'
      const { data: pjobs, error: pjErr } = await supabase
        .from('printer_queue')
        .select('*')
        .neq('status', 'done')
      if (!pjErr) setActivePrints(pjobs as PrintJob[])

      // Pending tool returns where return_at is null
      const { data: returns, error: retErr } = await supabase
        .from('tool_checkout')
        .select('*')
        .is('return_at', null)
      if (!retErr) setPendingReturns(returns as Checkout[])
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Primary Dashboard</h1>
{lowInventory.length===0 && activePrints.length===0 && pendingReturns.length===0 && (
  <div className="bg-yellow-400 text-gray-900 px-4 py-2 rounded mb-4">
    System Ready / Awaiting Data
  </div>
)}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Print Jobs Panel */}
          <div className="bg-gray-800 rounded-lg shadow p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Active 3D Print Jobs</h2>
            {activePrints.length === 0 ? (
              <p className="text-gray-400">No active jobs.</p>
            ) : (
              <ul className="space-y-2">
                {activePrints.map((job) => (
                  <li key={job.id} className="bg-gray-700 p-3 rounded">
                    <strong>{job.job_name}</strong> – {job.filament_type}
                    <div className="text-xs text-gray-400">Estimated Dur: {job.estimated_dur} min</div>
                    <div className="text-xs text-gray-400">Status: {job.status}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Low Inventory Panel */}
          <div className="bg-gray-800 rounded-lg shadow p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Low Inventory Alerts</h2>
            {lowInventory.length === 0 ? (
              <p className="text-gray-400">All items are sufficiently stocked.</p>
            ) : (
              <ul className="space-y-2">
                {lowInventory.map((item) => (
                  <li key={item.id} className="bg-gray-700 p-3 rounded">
                    {item.name} – {item.quantity} left
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Returns Panel */}
          <div className="bg-gray-800 rounded-lg shadow p-6 flex flex-col">
            <h2 className="text-xl font-semibold mb-4">Pending Tool Returns</h2>
            {pendingReturns.length === 0 ? (
              <p className="text-gray-400">No items pending return.</p>
            ) : (
              <ul className="space-y-2">
                {pendingReturns.map((ret) => (
                  <li key={ret.id} className="bg-gray-700 p-3 rounded">
                    Item ID: {ret.item_id}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
