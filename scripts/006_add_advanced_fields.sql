-- Add brand and additional filter fields to listings table
ALTER TABLE listings
ADD COLUMN IF NOT EXISTS brand TEXT,
ADD COLUMN IF NOT EXISTS area TEXT,
ADD COLUMN IF NOT EXISTS facilities TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8),
ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8),
ADD COLUMN IF NOT EXISTS contact_name TEXT;

-- Create index for better search performance
CREATE INDEX IF NOT EXISTS idx_listings_brand ON listings(brand);
CREATE INDEX IF NOT EXISTS idx_listings_area ON listings(area);
CREATE INDEX IF NOT EXISTS idx_listings_price ON listings(price);
CREATE INDEX IF NOT EXISTS idx_listings_location ON listings(location);

-- Update existing metadata fields to be more structured
COMMENT ON COLUMN listings.facilities IS 'Array of facility/feature tags like ["wifi", "parking", "garden"]';
COMMENT ON COLUMN listings.latitude IS 'Latitude for Google Maps integration';
COMMENT ON COLUMN listings.longitude IS 'Longitude for Google Maps integration';
