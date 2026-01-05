import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { CategoryCard } from "@/components/category-card"
import { ListingCard } from "@/components/listing-card"
import { FeaturedCarousel } from "@/components/featured-carousel"
import { HeroSlider } from "@/components/hero-slider"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { Category, Listing } from "@/lib/types"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default async function HomePage() {
  const supabase = await getSupabaseServerClient()

  // Fetch categories
  const { data: categories } = await supabase.from("categories").select("*").order("name")

  // Fetch featured listings
  const { data: featuredListings } = await supabase
    .from("listings")
    .select("*, categories(*)")
    .eq("status", "approved")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(8)

  // Fetch recent listings
  const { data: recentListings } = await supabase
    .from("listings")
    .select("*, categories(*)")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(8)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section with Background Slider */}
      <section className="relative text-white py-20 md:py-32 px-4 overflow-hidden min-h-[600px] flex items-center">
        <HeroSlider />

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-10">
            <Badge variant="secondary" className="mb-6 px-5 py-2 text-sm font-semibold shadow-lg">
              🔥 Over 50,000 Active Listings
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-balance drop-shadow-2xl">
              Find It. Buy It. Sell It.
            </h1>
            <p className="text-xl md:text-2xl opacity-95 text-balance max-w-3xl mx-auto drop-shadow-lg">
              The UK's favourite classifieds site for buying and selling
            </p>
          </div>

          <SearchBar />
        </div>
      </section>

      {/* Featured Listings Carousel */}
      {featuredListings && featuredListings.length > 0 && (
        <section className="py-12 px-4 bg-muted/40">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
                  Featured Listings
                  <Badge variant="secondary" className="text-xs">
                    Premium
                  </Badge>
                </h2>
                <p className="text-muted-foreground">Handpicked premium listings just for you</p>
              </div>
              <Button variant="outline" asChild className="hidden md:flex bg-transparent">
                <Link href="/browse?featured=true">View All Featured</Link>
              </Button>
            </div>
            <FeaturedCarousel listings={featuredListings} />
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="py-12 px-4 bg-background">
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Discover Popular Categories</h2>
            <p className="text-muted-foreground">Find exactly what you're looking for</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories?.map((category: Category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Listings */}
      {recentListings && recentListings.length > 0 && (
        <section className="py-12 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Latest Listings</h2>
                <p className="text-muted-foreground">Fresh ads posted in the last 24 hours</p>
              </div>
              <Button variant="outline" asChild className="hidden md:flex bg-transparent">
                <Link href="/browse">View All</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {recentListings.map((listing: Listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
            <div className="text-center mt-8 md:hidden">
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/browse">View All Listings</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-secondary via-accent to-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">Ready to Post Your Ad?</h2>
          <p className="text-lg md:text-xl mb-8 opacity-95 max-w-2xl mx-auto text-balance">
            Reach thousands of potential customers across the UK today - completely free
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6 w-full sm:w-auto">
              <Link href="/post">Post Free Ad Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 py-6 w-full sm:w-auto bg-white/10 border-white/30 hover:bg-white/20"
            >
              <Link href="/browse">Browse Ads</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">About UK Classifieds</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your trusted UK classifieds platform for buying, selling, and connecting with your community.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/browse" className="text-muted-foreground hover:text-primary transition-colors">
                    Browse Ads
                  </Link>
                </li>
                <li>
                  <Link href="/post" className="text-muted-foreground hover:text-primary transition-colors">
                    Post Ad
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-muted-foreground hover:text-primary transition-colors">
                    All Categories
                  </Link>
                </li>
                <li>
                  <Link href="/search" className="text-muted-foreground hover:text-primary transition-colors">
                    Advanced Search
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Popular Cities</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/browse?location=London"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    London Classifieds
                  </Link>
                </li>
                <li>
                  <Link
                    href="/browse?location=Manchester"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Manchester Classifieds
                  </Link>
                </li>
                <li>
                  <Link
                    href="/browse?location=Birmingham"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Birmingham Classifieds
                  </Link>
                </li>
                <li>
                  <Link
                    href="/browse?location=Leeds"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Leeds Classifieds
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Get in Touch</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Email: info@ukclassifieds.co.uk
                <br />
                Phone: +44 20 1234 5678
                <br />
                <br />
                Mon-Fri: 9am-6pm GMT
              </p>
            </div>
          </div>
          <div className="text-center pt-8 border-t text-sm text-muted-foreground">
            <p>&copy; 2026 UK Classifieds. All rights reserved. | Terms | Privacy | Safety Tips</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
