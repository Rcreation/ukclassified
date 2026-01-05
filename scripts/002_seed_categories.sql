-- Insert default categories
INSERT INTO categories (name, slug, description, icon, color, sort_order) VALUES
  ('Jobs', 'jobs', 'Find or post job opportunities', '💼', '#3b82f6', 1),
  ('Real Estate', 'real-estate', 'Buy, sell, or rent properties', '🏠', '#10b981', 2),
  ('Products', 'products', 'Buy and sell products', '🛍️', '#f59e0b', 3),
  ('Services', 'services', 'Offer or find services', '🔧', '#8b5cf6', 4),
  ('Events', 'events', 'Discover or create events', '🎉', '#ec4899', 5),
  ('Matrimony', 'matrimony', 'Marriage matchmaking profiles', '💑', '#ef4444', 6),
  ('Education', 'education', 'Courses, tutoring, and training', '📚', '#06b6d4', 7),
  ('Vehicles', 'vehicles', 'Cars, bikes, and other vehicles', '🚗', '#6366f1', 8),
  ('Electronics', 'electronics', 'Gadgets, computers, and electronics', '💻', '#14b8a6', 9),
  ('Community', 'community', 'Community notices and announcements', '🤝', '#a855f7', 10)
ON CONFLICT (slug) DO NOTHING;
