export interface InventoryItem {
  id: string
  item_name: string
  category: string | null
  quantity: number
  min_stock_level: number
  location: string | null
  updated_at: string // ISO timestamp
}

export interface Tool {
  id: string
  tool_name: string
  status: 'available' | 'borrowed' | 'maintenance'
  current_holder_id: string | null
  qr_code_id: string | null
}

export interface CheckoutLog {
  id: string
  tool_id: string
  user_id: string
  checkout_date: string // ISO timestamp
  expected_return_date: string | null
  actual_return_date: string | null
}

export interface PrintJob {
  id: string
  user_id: string | null
  filename: string | null
  material_type: 'PLA' | 'PETG' | 'TPU' | null
  estimated_hours: number | null
  status: 'pending' | 'printing' | 'completed' | 'failed'
  created_at: string // ISO timestamp
}
