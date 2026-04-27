-- Enable uuid extension if not already enabled
create extension if not exists "uuid-ossp";

-- 1. Inventory & Consumables
create table if not exists inventory (
  id uuid primary key default uuid_generate_v4(),
  item_name text not null,
  category text, -- e.g., 'Electronics', '3D Printing', 'Tools'
  quantity integer default 0,
  min_stock_level integer default 5, -- Triggers the 'Low Inventory' alert
  location text, -- e.g., 'Shelf A', 'Cabinet 4'
  updated_at timestamp with time zone default now()
);

-- 2. Tools
create table if not exists tools (
  id uuid primary key default uuid_generate_v4(),
  tool_name text not null,
  status text default 'available', -- 'available', 'borrowed', 'maintenance'
  current_holder_id uuid references auth.users(id),
  qr_code_id text unique
);

-- 3. Checkout Logs
create table if not exists checkout_logs (
  id uuid primary key default uuid_generate_v4(),
  tool_id uuid references tools(id),
  user_id uuid references auth.users(id),
  checkout_date timestamp with time zone default now(),
  expected_return_date timestamp with time zone,
  actual_return_date timestamp with time zone
);

-- 4. 3D Printer Queue
create table if not exists printer_queue (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  filename text,
  material_type text, -- 'PLA', 'PETG', 'TPU'
  estimated_hours float,
  status text default 'pending', -- 'pending', 'printing', 'completed', 'failed'
  created_at timestamp with time zone default now()
);

-- Add indexes for performance
create index if not exists idx_checkout_logs_tool on checkout_logs(tool_id);
create index if not exists idx_printer_queue_status on printer_queue(status);
