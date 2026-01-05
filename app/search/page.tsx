import { Header } from "@/components/header"
import { ListingCard } from "@/components/listing-card"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { Listing } from "@/lib/types"
import { SearchBar } from "@/components/search-bar"

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const params = await searchParams
  const query = params.q || ""
  const supabase = await getSupabaseServerClient()

  let listings: Listing[] = []

  if (query.trim()) {
    // Perform full-text search
    const { data } = await supabase
      .from("listings")
      .select("*, categories(*)")
      .eq("status", "approved")
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order("created_at", { ascending: false })
      .limit(50)

    listings = data || []
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar />
        </div>

        {/* Results */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{query ? `Search Results for "${query}"` : "Search Listings"}</h1>
          {query && <p className="text-muted-foreground">{listings.length} listings found</p>}
        </div>

        {query ? (
          listings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {listings.map((listing: Listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No listings found matching your search</p>
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Enter a search term to find listings</p>
          </div>
        )}
      </div>
    </div>
  )
}
