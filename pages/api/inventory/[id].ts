import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabaseClient'

const THRESHOLD = 5

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string }

  if (req.method === 'PUT') {
    const { quantity } = req.body
    // Update quantity and recalc low_supply
    const { data, error } = await supabase
      .from('inventory_items')
      .update({ quantity, low_supply: quantity < THRESHOLD })
      .eq('id', id)
    if (error) return res.status(400).json({ error: error.message })
    if (data && data[0]) return res.json(data[0])
    return res.status(404).json({ error: 'Item not found' })
  }
  if (req.method === 'DELETE') {
    const { error } = await supabase.from('inventory_items').delete().eq('id', id)
    if (error) return res.status(400).json({ error: error.message })
    return res.status(204).end()
  }
  return res.status(405).end()
}
