-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_metadata ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view all profiles" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Categories policies (public read, admin write)
CREATE POLICY "Anyone can view active categories" ON categories FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage categories" ON categories FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Listings policies
CREATE POLICY "Anyone can view approved listings" ON listings FOR SELECT USING (status = 'approved');
CREATE POLICY "Users can view own listings" ON listings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all listings" ON listings FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Users can create listings" ON listings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own listings" ON listings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can update all listings" ON listings FOR UPDATE USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Users can delete own listings" ON listings FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Admins can delete all listings" ON listings FOR DELETE USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);

-- Listing images policies
CREATE POLICY "Anyone can view images of approved listings" ON listing_images FOR SELECT USING (
  EXISTS (SELECT 1 FROM listings WHERE id = listing_id AND status = 'approved')
);
CREATE POLICY "Users can view images of own listings" ON listing_images FOR SELECT USING (
  EXISTS (SELECT 1 FROM listings WHERE id = listing_id AND user_id = auth.uid())
);
CREATE POLICY "Users can manage own listing images" ON listing_images FOR ALL USING (
  EXISTS (SELECT 1 FROM listings WHERE id = listing_id AND user_id = auth.uid())
);

-- Listing metadata policies
CREATE POLICY "Anyone can view metadata of approved listings" ON listing_metadata FOR SELECT USING (
  EXISTS (SELECT 1 FROM listings WHERE id = listing_id AND status = 'approved')
);
CREATE POLICY "Users can manage own listing metadata" ON listing_metadata FOR ALL USING (
  EXISTS (SELECT 1 FROM listings WHERE id = listing_id AND user_id = auth.uid())
);
