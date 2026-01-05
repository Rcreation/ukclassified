import { Header } from "@/components/header"
import { ListingCard } from "@/components/listing-card"
import { AdvancedFilters } from "@/components/advanced-filters"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { Listing } from "@/lib/types"
import { Tag } from "lucide-react"

export default async function BrandPage({
  params,
  searchParams,
}: {
  params: Promise<{ brand: string }>
  searchParams: Promise<{
    category?: string
    area?: string
    minPrice?: string
    maxPrice?: string
    facilities?: string
    sort?: string
  }>
}) {
  const { brand } = await params
  const filters = await searchParams
  const supabase = await getSupabaseServerClient()

  const decodedBrand = decodeURIComponent(brand)

  // Build query with filters
  let query = supabase.from("listings").select("*, categories(*)").eq("brand", decodedBrand).eq("status", "approved")

  // Apply filters
  if (filters.category) {
    query = query.eq("category_id", filters.category)
  }
  if (filters.area) {
    query = query.eq("area", filters.area)
  }
  if (filters.minPrice) {
    query = query.gte("price", Number.parseFloat(filters.minPrice))
  }
  if (filters.maxPrice) {
    query = query.lte("price", Number.parseFloat(filters.maxPrice))
  }
  if (filters.facilities) {
    const facilitiesArray = filters.facilities.split(",")
    query = query.contains("facilities", facilitiesArray)
  }

  // Apply sorting
  const sortBy = filters.sort || "newest"
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

  // Get filter data
  const { data: categories } = await supabase.from("categories").select("*").eq("is_active", true).order("name")

  const { data: allListings } = await supabase
    .from("listings")
    .select("area, facilities")
    .eq("brand", decodedBrand)
    .eq("status", "approved")

  const areas = [...new Set(allListings?.map((l) => l.area).filter(Boolean))] as string[]
  const allFacilities = allListings?.flatMap((l) => l.facilities || []) || []
  const facilities = [...new Set(allFacilities)] as string[]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Tag className="h-10 w-10 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">{decodedBrand}</h1>
              <p className="text-muted-foreground">Browse all {decodedBrand} listings</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{listings?.length || 0} listings found</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-72 flex-shrink-0">
            <AdvancedFilters categories={categories || []} areas={areas} facilities={facilities} />
          </aside>

          <div className="flex-1">
            {listings && listings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing: Listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No {decodedBrand} listings found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
