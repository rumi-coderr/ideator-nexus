-- Seed test data for IDEATOR Nexus

-- Insert inventory items
INSERT INTO inventory (item_name, category, quantity, min_stock_level, location)
VALUES
  ('ESP32-S3', 'Electronics', 20, 5, 'Shelf A'),
  ('PLA Filament 1kg', '3D Printing', 10, 5, 'Shelf B'),
  ('M3 Screw Set', 'Tools', 30, 5, 'Cabinet 1');

-- Insert tools
INSERT INTO tools (tool_name, status, qr_code_id)
VALUES
  ('Drill', 'available', 'QR001'),
  ('Soldering Iron', 'available', 'QR002');

-- Insert printer queue entries (using a demo user ID or NULL)
INSERT INTO printer_queue (filename, material_type, estimated_hours, status)
VALUES
  ('test_print.gcode', 'PLA', 2.5, 'pending'),
  ('another_print.gcode', 'PETG', 1.2, 'printing');
