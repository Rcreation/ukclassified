import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { CategoryCard } from "@/components/category-card"
import { ListingCard } from "@/components/listing-card"
import { FeaturedCarousel } from "@/components/featured-carousel"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { Category, Listing } from "@/lib/types"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Find Everything You Need
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Jobs, Events, Real Estate, Services, Matrimony & More Across the UK
            </p>
          </div>
          <SearchBar />

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            <div className="text-center p-4 rounded-lg bg-background/50 backdrop-blur">
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-muted-foreground">Active Listings</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50 backdrop-blur">
              <div className="text-3xl font-bold text-primary">5K+</div>
              <div className="text-sm text-muted-foreground">Happy Users</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50 backdrop-blur">
              <div className="text-3xl font-bold text-primary">10+</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-background/50 backdrop-blur">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Free to Use</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings Carousel */}
      {featuredListings && featuredListings.length > 0 && (
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Listings</h2>
              <p className="text-muted-foreground">Handpicked premium listings just for you</p>
            </div>
            <FeaturedCarousel listings={featuredListings} />
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Browse by Category</h2>
            <p className="text-muted-foreground">Explore our wide range of classified categories</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories?.map((category: Category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button size="lg" variant="outline" asChild>
              <Link href="/categories">View All Categories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Recent Listings */}
      {recentListings && recentListings.length > 0 && (
        <section className="py-16 px-4 bg-muted/20">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Latest Listings</h2>
                <p className="text-muted-foreground">Fresh ads posted recently</p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/browse">View All</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentListings.map((listing: Listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Post Your Ad?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Reach thousands of potential customers across the UK today - completely free
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-6">
            <Link href="/post">Post Free Ad Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">About Us</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your trusted UK classifieds platform for buying, selling, and connecting.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/browse" className="text-muted-foreground hover:text-foreground">
                    Browse Ads
                  </Link>
                </li>
                <li>
                  <Link href="/post" className="text-muted-foreground hover:text-foreground">
                    Post Ad
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-muted-foreground hover:text-foreground">
                    Categories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Popular Areas</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/area/london" className="text-muted-foreground hover:text-foreground">
                    London
                  </Link>
                </li>
                <li>
                  <Link href="/area/manchester" className="text-muted-foreground hover:text-foreground">
                    Manchester
                  </Link>
                </li>
                <li>
                  <Link href="/area/birmingham" className="text-muted-foreground hover:text-foreground">
                    Birmingham
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <p className="text-sm text-muted-foreground">
                Email: info@classifieds.uk
                <br />
                Phone: +44 20 1234 5678
              </p>
            </div>
          </div>
          <div className="text-center pt-8 border-t text-sm text-muted-foreground">
            <p>&copy; 2026 UK Classifieds. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
