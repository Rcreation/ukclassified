import { Header } from "@/components/header"
import { ListingCard } from "@/components/listing-card"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { Listing } from "@/lib/types"
import { AdvancedFilters } from "@/components/advanced-filters"

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string
    area?: string
    brand?: string
    minPrice?: string
    maxPrice?: string
    facilities?: string
    sort?: string
  }>
}) {
  const params = await searchParams
  const supabase = await getSupabaseServerClient()

  let query = supabase.from("listings").select("*, categories(*)").eq("status", "approved")

  if (params.category) {
    query = query.eq("category_id", params.category)
  }
  if (params.area) {
    query = query.eq("area", params.area)
  }
  if (params.brand) {
    query = query.eq("brand", params.brand)
  }
  if (params.minPrice) {
    query = query.gte("price", Number.parseFloat(params.minPrice))
  }
  if (params.maxPrice) {
    query = query.lte("price", Number.parseFloat(params.maxPrice))
  }
  if (params.facilities) {
    const facilitiesArray = params.facilities.split(",")
    query = query.contains("facilities", facilitiesArray)
  }

  // Apply sorting
  const sortBy = params.sort || "newest"
  switch (sortBy) {
    case "newest":
      query = query.order("created_at", { ascending: false })
      break
    case "oldest":
      query = query.order("created_at", { ascending: true })
      break
    case "price-low":
      query = query.order("price", { ascending: true, nullsFirst: false })
      break
    case "price-high":
      query = query.order("price", { ascending: false, nullsFirst: false })
      break
    case "popular":
      query = query.order("views", { ascending: false })
      break
  }

  const { data: listings } = await query

  // Fetch categories for filter
  const { data: categories } = await supabase.from("categories").select("*").eq("is_active", true).order("name")

  const { data: allListings } = await supabase
    .from("listings")
    .select("area, brand, facilities")
    .eq("status", "approved")

  const areas = [...new Set(allListings?.map((l) => l.area).filter(Boolean))] as string[]
  const brands = [...new Set(allListings?.map((l) => l.brand).filter(Boolean))] as string[]
  const allFacilities = allListings?.flatMap((l) => l.facilities || []) || []
  const facilities = [...new Set(allFacilities)] as string[]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-72 flex-shrink-0">
            <AdvancedFilters categories={categories || []} areas={areas} brands={brands} facilities={facilities} />
          </aside>

          {/* Listings Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Browse Listings</h1>
              <p className="text-muted-foreground">{listings?.length || 0} listings found</p>
            </div>

            {listings && listings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing: Listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No listings found matching your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
