-- Seed UK Sample Users
INSERT INTO users (email, full_name, phone, created_at) VALUES
('john.smith@example.co.uk', 'John Smith', '+44 20 7946 0958', NOW() - INTERVAL '30 days'),
('sarah.jones@example.co.uk', 'Sarah Jones', '+44 161 496 0345', NOW() - INTERVAL '25 days'),
('david.brown@example.co.uk', 'David Brown', '+44 121 496 0789', NOW() - INTERVAL '20 days'),
('emma.wilson@example.co.uk', 'Emma Wilson', '+44 113 496 0123', NOW() - INTERVAL '15 days'),
('michael.taylor@example.co.uk', 'Michael Taylor', '+44 131 496 0456', NOW() - INTERVAL '10 days'),
('olivia.davies@example.co.uk', 'Olivia Davies', '+44 29 2018 0234', NOW() - INTERVAL '8 days'),
('james.evans@example.co.uk', 'James Evans', '+44 151 496 0567', NOW() - INTERVAL '5 days'),
('sophie.thomas@example.co.uk', 'Sophie Thomas', '+44 114 496 0890', NOW() - INTERVAL '3 days')
ON CONFLICT (email) DO NOTHING;

-- Seed UK Jobs
INSERT INTO listings (category_id, user_id, title, description, price, location, status, metadata, created_at) VALUES
(
  (SELECT id FROM categories WHERE slug = 'jobs'),
  (SELECT id FROM users WHERE email = 'john.smith@example.co.uk'),
  'Senior Software Engineer - Fintech',
  'We are seeking an experienced Senior Software Engineer to join our growing fintech team in London. You will be working on cutting-edge payment solutions using React, Node.js, and AWS.

Requirements:
- 5+ years of full-stack development experience
- Strong knowledge of TypeScript, React, and Node.js
- Experience with microservices architecture
- Excellent communication skills

Benefits:
- Competitive salary up to £90,000
- Remote/hybrid working options
- 25 days holiday + bank holidays
- Private healthcare
- Pension scheme',
  90000,
  'London, Greater London',
  'approved',
  '{"job_type": "Full-time", "salary_period": "Annual", "remote": true, "company": "TechFinance Ltd", "city": "London", "postcode": "EC1A 1BB"}',
  NOW() - INTERVAL '5 days'
),
(
  (SELECT id FROM categories WHERE slug = 'jobs'),
  (SELECT id FROM users WHERE email = 'sarah.jones@example.co.uk'),
  'Registered Nurse - NHS Hospital',
  'Manchester Royal Infirmary is looking for dedicated Registered Nurses to join our Emergency Department. We offer excellent training and career progression opportunities.

Requirements:
- Valid NMC registration
- Experience in acute care settings
- Strong interpersonal skills
- Ability to work shifts including nights and weekends

Benefits:
- NHS pay scale Band 5: £28,407 - £34,581
- NHS pension scheme
- 27 days annual leave plus bank holidays
- Excellent training opportunities',
  34581,
  'Manchester, Greater Manchester',
  'approved',
  '{"job_type": "Full-time", "salary_period": "Annual", "company": "Manchester Royal Infirmary", "city": "Manchester", "postcode": "M13 9WL"}',
  NOW() - INTERVAL '7 days'
),
(
  (SELECT id FROM categories WHERE slug = 'jobs'),
  (SELECT id FROM users WHERE email = 'david.brown@example.co.uk'),
  'Delivery Driver - Own Van Required',
  'Busy courier company in Birmingham seeking reliable delivery drivers with own van. Immediate start available for the right candidates.

Requirements:
- Valid UK driving licence (no more than 6 points)
- Own van (SWB or LWB)
- Smartphone for route planning
- Good knowledge of Birmingham area

Earnings:
- £130-£160 per day
- 5-6 days per week available
- Fuel card provided',
  150,
  'Birmingham, West Midlands',
  'approved',
  '{"job_type": "Contract", "salary_period": "Daily", "company": "Express Logistics", "city": "Birmingham", "postcode": "B1 1AA"}',
  NOW() - INTERVAL '2 days'
);

-- Seed UK Real Estate
INSERT INTO listings (category_id, user_id, title, description, price, location, status, metadata, created_at) VALUES
(
  (SELECT id FROM categories WHERE slug = 'real-estate'),
  (SELECT id FROM users WHERE email = 'emma.wilson@example.co.uk'),
  'Beautiful 3 Bedroom Semi-Detached House',
  'Stunning family home in a sought-after area of Leeds. This well-maintained property features a spacious living room, modern kitchen, three generous bedrooms, family bathroom, and a lovely rear garden.

Features:
- Gas central heating
- Double glazing throughout
- Off-street parking
- Large rear garden
- Close to excellent schools
- Near public transport links

Council Tax Band: C
EPC Rating: B',
  285000,
  'Leeds, West Yorkshire',
  'approved',
  '{"property_type": "House", "bedrooms": 3, "bathrooms": 1, "listing_type": "Sale", "city": "Leeds", "postcode": "LS17 8QY", "square_feet": 1200}',
  NOW() - INTERVAL '4 days'
),
(
  (SELECT id FROM categories WHERE slug = 'real-estate'),
  (SELECT id FROM users WHERE email = 'michael.taylor@example.co.uk'),
  'Modern 2 Bed Flat with Parking - Edinburgh',
  'Contemporary two-bedroom apartment in the heart of Edinburgh. Perfect for professionals or first-time buyers. Features open-plan living, modern fitted kitchen, two double bedrooms, and allocated parking.

Features:
- Open-plan kitchen/living area
- Master bedroom with en-suite
- Private balcony
- Allocated parking space
- Secure entry system
- Close to city centre and Waverley Station

Council Tax Band: D
EPC Rating: B',
  245000,
  'Edinburgh, Scotland',
  'approved',
  '{"property_type": "Flat", "bedrooms": 2, "bathrooms": 2, "listing_type": "Sale", "city": "Edinburgh", "postcode": "EH1 3EG", "square_feet": 850}',
  NOW() - INTERVAL '6 days'
),
(
  (SELECT id FROM categories WHERE slug = 'real-estate'),
  (SELECT id FROM users WHERE email = 'olivia.davies@example.co.uk'),
  'City Centre Studio Apartment to Rent',
  'Modern studio flat in Cardiff city centre. Ideal for young professionals. Fully furnished with contemporary fixtures and fittings.

Features:
- All bills included (electricity, water, internet)
- Fully furnished
- Secure building with intercom
- 5 minutes walk to Cardiff Central Station
- Available immediately

Deposit: £950
Council Tax Band: A',
  850,
  'Cardiff, Wales',
  'approved',
  '{"property_type": "Flat", "bedrooms": 0, "bathrooms": 1, "listing_type": "Rent", "rent_period": "Monthly", "city": "Cardiff", "postcode": "CF10 1DD", "square_feet": 400}',
  NOW() - INTERVAL '1 day'
);

-- Seed UK Matrimony
INSERT INTO listings (category_id, user_id, title, description, price, location, status, metadata, created_at) VALUES
(
  (SELECT id FROM categories WHERE slug = 'matrimony'),
  (SELECT id FROM users WHERE email = 'sophie.thomas@example.co.uk'),
  'Professional Female, 28, Seeking Life Partner',
  'About Me:
I am a 28-year-old doctor working in the NHS. I am family-oriented, enjoy travelling, reading, and staying active. Looking for someone who shares similar values and is ready for a serious relationship.

Looking For:
- Age: 28-35
- Education: Graduate or above
- Profession: Established career
- Values: Family-oriented, honest, respectful

Religion: Hindu
Mother Tongue: English
Height: 5''5"

Serious enquiries only please.',
  NULL,
  'London, Greater London',
  'approved',
  '{"age": 28, "gender": "Female", "religion": "Hindu", "education": "Medical Doctor", "profession": "Doctor", "height": "5''5\"", "city": "London"}',
  NOW() - INTERVAL '8 days'
),
(
  (SELECT id FROM categories WHERE slug = 'matrimony'),
  (SELECT id FROM users WHERE email = 'james.evans@example.co.uk'),
  'Business Professional, 32, Seeking Match',
  'About Me:
32-year-old business owner based in Manchester. I value family, honesty, and mutual respect. In my spare time, I enjoy sports, cooking, and spending time with family.

Looking For:
- Age: 25-32
- Education: Graduate
- Someone who values family and tradition
- Must be ready for marriage

Religion: Muslim
Mother Tongue: English
Height: 5''11"

Family is very important to me. Looking for someone with similar values.',
  NULL,
  'Manchester, Greater Manchester',
  'approved',
  '{"age": 32, "gender": "Male", "religion": "Muslim", "education": "MBA", "profession": "Business Owner", "height": "5''11\"", "city": "Manchester"}',
  NOW() - INTERVAL '12 days'
);

-- Seed UK Vehicles
INSERT INTO listings (category_id, user_id, title, description, price, location, status, metadata, created_at) VALUES
(
  (SELECT id FROM categories WHERE slug = 'vehicles'),
  (SELECT id FROM users WHERE email = 'john.smith@example.co.uk'),
  '2019 BMW 3 Series 320d M Sport - Low Mileage',
  'Excellent condition BMW 3 Series for sale. One owner from new, full service history, recently serviced.

Specifications:
- Year: 2019 (69 Plate)
- Mileage: 32,000
- Fuel Type: Diesel
- Transmission: Automatic
- Colour: Mineral White
- Body Type: Saloon

Features:
- M Sport Package
- Pro Navigation
- Heated leather seats
- Reversing camera
- Parking sensors
- 19" alloy wheels

MOT valid until September 2025. HPI clear. Two keys. No px, no swaps.

Open to sensible offers.',
  22995,
  'London, Greater London',
  'approved',
  '{"make": "BMW", "model": "3 Series", "year": 2019, "mileage": 32000, "fuel_type": "Diesel", "transmission": "Automatic", "city": "London", "postcode": "SW1A 1AA"}',
  NOW() - INTERVAL '3 days'
),
(
  (SELECT id FROM categories WHERE slug = 'vehicles'),
  (SELECT id FROM users WHERE email = 'david.brown@example.co.uk'),
  '2016 Ford Transit Custom 290 L1 H1 - Well Maintained',
  'Reliable Ford Transit Custom van. Perfect for tradesmen or small business. Clean inside and out.

Specifications:
- Year: 2016 (66 Plate)
- Mileage: 98,000
- Fuel Type: Diesel
- Transmission: Manual
- Colour: White
- Body Type: Panel Van

Features:
- Euro 6 engine
- Ply-lined
- Roof bars and ladder rack
- Bluetooth connectivity
- Full service history
- New tyres all round

MOT until March 2025. Ready for work. £11,500 ono.',
  11500,
  'Birmingham, West Midlands',
  'approved',
  '{"make": "Ford", "model": "Transit Custom", "year": 2016, "mileage": 98000, "fuel_type": "Diesel", "transmission": "Manual", "city": "Birmingham", "postcode": "B5 4AA"}',
  NOW() - INTERVAL '5 days'
);

-- Seed UK Electronics
INSERT INTO listings (category_id, user_id, title, description, price, location, status, metadata, created_at) VALUES
(
  (SELECT id FROM categories WHERE slug = 'electronics'),
  (SELECT id FROM users WHERE email = 'emma.wilson@example.co.uk'),
  'iPhone 14 Pro Max 256GB Space Black - Unlocked',
  'Selling my iPhone 14 Pro Max in excellent condition. Upgraded to new model so no longer needed.

Specifications:
- Model: iPhone 14 Pro Max
- Storage: 256GB
- Colour: Space Black
- Network: Unlocked (works with all UK networks)
- Condition: Excellent (9/10)

Includes:
- Original box
- Charging cable
- Case and screen protector fitted

Battery health: 96%
Always had screen protector and case on. No scratches or dents. Collection preferred but can post with tracked delivery for extra £5.',
  825,
  'Leeds, West Yorkshire',
  'approved',
  '{"brand": "Apple", "condition": "Excellent", "warranty": false, "city": "Leeds"}',
  NOW() - INTERVAL '2 days'
),
(
  (SELECT id FROM categories WHERE slug = 'electronics'),
  (SELECT id FROM users WHERE email = 'michael.taylor@example.co.uk'),
  'Samsung 65" QLED 4K Smart TV - Barely Used',
  'Samsung 65" QLED TV for sale. Bought 6 months ago but moving abroad so need to sell.

Specifications:
- Size: 65 inches
- Resolution: 4K Ultra HD
- Technology: QLED
- Smart TV: Yes (Tizen OS)
- HDR: Yes
- Year: 2023 Model

Features:
- Quantum Processor 4K
- 100% Colour Volume with Quantum Dot
- Built-in Alexa
- Multiple HDMI ports
- Ambient Mode

Still under manufacturer warranty. Original box available. Immaculate condition. Cost £1,200 new, selling for £650. Buyer collects.',
  650,
  'Edinburgh, Scotland',
  'approved',
  '{"brand": "Samsung", "condition": "Like New", "warranty": true, "city": "Edinburgh"}',
  NOW() - INTERVAL '4 days'
);

-- Seed UK Events
INSERT INTO listings (category_id, user_id, title, description, price, location, status, metadata, created_at) VALUES
(
  (SELECT id FROM categories WHERE slug = 'events'),
  (SELECT id FROM users WHERE email = 'sarah.jones@example.co.uk'),
  'Manchester Food Festival - Weekend Passes',
  'Join us for the biggest food festival in the North West! Three days of amazing food, drink, and entertainment.

Event Details:
- Date: 15-17 March 2026
- Location: Cathedral Gardens, Manchester
- Time: 11:00 AM - 9:00 PM daily

Features:
- 50+ food vendors
- Live cooking demonstrations
- Celebrity chef appearances
- Craft beer and cocktail bars
- Live music all weekend
- Kids activities zone

Weekend Pass: £25 (save £10 vs daily tickets)
Children under 12: Free

Early bird discount ends soon! Book now.',
  25,
  'Manchester, Greater Manchester',
  'approved',
  '{"event_type": "Festival", "event_date": "2026-03-15", "event_time": "11:00", "city": "Manchester", "postcode": "M3 1SX"}',
  NOW() - INTERVAL '10 days'
),
(
  (SELECT id FROM categories WHERE slug = 'events'),
  (SELECT id FROM users WHERE email = 'olivia.davies@example.co.uk'),
  'Welsh Dragon Rugby - Six Nations Match Viewing',
  'Watch Wales vs England Six Nations match on big screens at Cardiff Arms Park Fan Zone!

Event Details:
- Date: 8 February 2026
- Kick-off: 4:45 PM
- Location: Cardiff Arms Park Fan Zone

Includes:
- Big screen viewing
- Pre-match entertainment
- Food and drink available
- Live music after the match
- Family-friendly atmosphere

Tickets: £15 per person
Under 16s: £5

Come dressed in red and support the boys! Cymru am byth!',
  15,
  'Cardiff, Wales',
  'approved',
  '{"event_type": "Sports", "event_date": "2026-02-08", "event_time": "16:45", "city": "Cardiff", "postcode": "CF10 1JA"}',
  NOW() - INTERVAL '6 days'
);

-- Seed UK Services
INSERT INTO listings (category_id, user_id, title, description, price, location, status, metadata, created_at) VALUES
(
  (SELECT id FROM categories WHERE slug = 'services'),
  (SELECT id FROM users WHERE email = 'james.evans@example.co.uk'),
  'Professional Plumbing Services - 24/7 Emergency',
  'Qualified and insured plumber covering Liverpool and surrounding areas. Over 15 years experience.

Services Offered:
- Emergency repairs (24/7)
- Bathroom installations
- Boiler servicing and repairs
- Leak detection and repairs
- Radiator installations
- Tap and toilet repairs
- Gas Safe registered

Rates:
- Standard callout: £60
- Emergency callout: £90
- Hourly rate: £45
- Free quotes for larger jobs

All work guaranteed. No job too small. Same-day service available. Call or text for free quote.',
  60,
  'Liverpool, Merseyside',
  'approved',
  '{"service_type": "Home Services", "availability": "24/7", "city": "Liverpool", "postcode": "L1 8JQ"}',
  NOW() - INTERVAL '15 days'
),
(
  (SELECT id FROM categories WHERE slug = 'services'),
  (SELECT id FROM users WHERE email = 'sophie.thomas@example.co.uk'),
  'Mobile Dog Grooming - Fully Equipped Van',
  'Professional mobile dog grooming service. We come to you! No stress for your pet, and convenient for you.

Services:
- Full groom (bath, cut, nail trim, ear clean)
- Bath and brush
- Puppy introduction grooming
- Nail trimming only
- Ear cleaning and plucking
- De-shedding treatment

Pricing:
- Small dogs: £35-£45
- Medium dogs: £45-£55
- Large dogs: £55-£70
- Extra large dogs: £70-£85

All breeds welcome. Fully insured. Qualified and experienced groomer. Covering Sheffield and within 10 miles. Book your appointment today!',
  45,
  'Sheffield, South Yorkshire',
  'approved',
  '{"service_type": "Pet Services", "mobile": true, "city": "Sheffield", "postcode": "S1 2JE"}',
  NOW() - INTERVAL '9 days'
);

-- Seed UK Community
INSERT INTO listings (category_id, user_id, title, description, price, location, status, metadata, created_at) VALUES
(
  (SELECT id FROM categories WHERE slug = 'community'),
  (SELECT id FROM users WHERE email = 'john.smith@example.co.uk'),
  'Free: Ikea Malm Bed Frame - Collection Only',
  'Giving away Ikea Malm bed frame (double size) due to moving house. In good condition, some minor marks but structurally sound.

Details:
- Size: Double (140cm x 200cm)
- Colour: Black-brown
- Includes slats
- Easy to dismantle

Must be able to collect and dismantle yourself. Available this weekend. First come, first served.',
  0,
  'London, Greater London',
  'approved',
  '{"post_type": "Free Stuff", "condition": "Good", "city": "London"}',
  NOW() - INTERVAL '1 day'
),
(
  (SELECT id FROM categories WHERE slug = 'community'),
  (SELECT id FROM users WHERE email = 'emma.wilson@example.co.uk'),
  'Leeds Hiking Group - New Members Welcome',
  'Friendly hiking group based in Leeds looking for new members! We organize walks every Sunday around Yorkshire.

About Us:
- Mixed ability group (all fitness levels welcome)
- Ages 25-50
- Usually 8-12 mile walks
- Pub lunch after most walks
- Friendly and social atmosphere

Upcoming Walks:
- 19 Jan: Yorkshire Three Peaks
- 26 Jan: Malham Cove circular
- 2 Feb: Ilkley Moor

Join our WhatsApp group for details and to meet other members. No membership fee, just turn up!',
  0,
  'Leeds, West Yorkshire',
  'approved',
  '{"post_type": "Groups & Clubs", "activity": "Hiking", "city": "Leeds"}',
  NOW() - INTERVAL '7 days'
);
