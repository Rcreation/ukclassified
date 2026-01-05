import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminHeader } from "@/components/admin/admin-header"
import { FileText, CheckCircle, Clock, XCircle, Eye, Users } from "lucide-react"

export default async function AdminDashboard() {
  const supabase = await getSupabaseServerClient()

  // Check if user is admin (simplified for now)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get statistics
  const { count: totalListings } = await supabase.from("listings").select("*", { count: "exact", head: true })

  const { count: approvedListings } = await supabase
    .from("listings")
    .select("*", { count: "exact", head: true })
    .eq("status", "approved")

  const { count: pendingListings } = await supabase
    .from("listings")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")

  const { count: rejectedListings } = await supabase
    .from("listings")
    .select("*", { count: "exact", head: true })
    .eq("status", "rejected")

  const { count: totalUsers } = await supabase.from("users").select("*", { count: "exact", head: true })

  // Get total views
  const { data: viewsData } = await supabase.from("listings").select("views")
  const totalViews = viewsData?.reduce((acc, item) => acc + (item.views || 0), 0) || 0

  // Get recent listings
  const { data: recentListings } = await supabase
    .from("listings")
    .select("*, categories(*)")
    .order("created_at", { ascending: false })
    .limit(5)

  const stats = [
    {
      title: "Total Listings",
      value: totalListings || 0,
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Approved",
      value: approvedListings || 0,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Pending Review",
      value: pendingListings || 0,
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Rejected",
      value: rejectedListings || 0,
      icon: XCircle,
      color: "text-red-600",
    },
    {
      title: "Total Views",
      value: totalViews,
      icon: Eye,
      color: "text-purple-600",
    },
    {
      title: "Total Users",
      value: totalUsers || 0,
      icon: Users,
      color: "text-indigo-600",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your classified listings and monitor site activity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recent Listings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentListings && recentListings.length > 0 ? (
                recentListings.map((listing: any) => (
                  <div key={listing.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{listing.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>{listing.categories?.name}</span>
                        <span>{new Date(listing.created_at).toLocaleDateString()}</span>
                        <span className="capitalize">{listing.status}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {listing.status === "pending" && (
                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                      )}
                      {listing.status === "approved" && (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Approved</span>
                      )}
                      {listing.status === "rejected" && (
                        <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">Rejected</span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-8">No listings yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
