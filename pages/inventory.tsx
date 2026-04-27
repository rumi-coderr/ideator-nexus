import { useEffect, useState } from 'react'
import { createClient } from '../utils/supabase/client'
import Link from 'next/link'

interface InventoryItem {
  id: string
  name: string
  quantity: number
  location: string
  sku: string
  category: string
}

export default function Inventory() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('inventory_items')
        .select('*')
        .order('name', { ascending: true })
      if (!error && data) setItems(data as InventoryItem[])
      setLoading(false)
    }
    fetchData()
  }, [])

  const filtered = search
    ? items.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
      )
    : items

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Inventory</h1>
        <Link href="/dashboard" className="text-emerald-400 hover:underline">
          Back to Dashboard
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, SKU, or category..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-lg px-4 py-2 rounded-md bg-slate-800 border border-slate-700 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-slate-400">Loading inventory...</p>
      ) : filtered.length === 0 ? (
        <p className="text-slate-400">No items match your search.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Item Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Location</th>
              </tr>
            </thead>
            <tbody className="bg-slate-900 divide-y divide-slate-800">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-slate-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-200">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{item.sku}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{item.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.quantity < 5 ? 'bg-red-900 text-red-200' : 'bg-green-900 text-green-200'
                    }`}>
                      {item.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">{item.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
