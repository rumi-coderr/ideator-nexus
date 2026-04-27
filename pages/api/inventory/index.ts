import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabaseClient'

const THRESHOLD = 5 // default; could use env var

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, description, sku, category, location, quantity, unit_cost } = req.body
    const { data, error } = await supabase
      .from('inventory_items')
      .insert([
        {
          name,
          description,
          sku,
          category,
          location,
          quantity,
          unit_cost,
          low_supply: quantity < THRESHOLD,
        },
      ])
    if (error) return res.status(400).json({ error: error.message })
    if (data && data[0]) return res.status(201).json(data[0])
    return res.status(500).json({ error: 'Insert failed' })
  }
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('inventory_items').select('*')
    if (error) return res.status(400).json({ error: error.message })
    return res.json(data)
  }
  return res.status(405).end()
}
