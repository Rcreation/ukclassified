import { getSupabaseServerClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin/admin-header"
import { ListingsTable } from "@/components/admin/listings-table"

export default async function AdminListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const params = await searchParams
  const supabase = await getSupabaseServerClient()

  let query = supabase.from("listings").select("*, categories(*), users(*)").order("created_at", { ascending: false })

  // Filter by status if provided
  if (params.status && params.status !== "all") {
    query = query.eq("status", params.status)
  }

  const { data: listings } = await query

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Manage Listings</h1>
          <p className="text-muted-foreground">Review, approve, or reject classified listings</p>
        </div>

        <ListingsTable listings={listings || []} />
      </div>
    </div>
  )
}
