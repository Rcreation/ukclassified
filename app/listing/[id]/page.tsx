import { Header } from "@/components/header"
import { GoogleMap } from "@/components/google-map"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Eye, Calendar, Mail, Phone, Tag } from "lucide-react"
import { IncrementViews } from "@/components/increment-views"
import Link from "next/link"

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await getSupabaseServerClient()

  // Fetch listing with category
  const { data: listing } = await supabase.from("listings").select("*, categories(*)").eq("id", id).single()

  if (!listing) {
    notFound()
  }

  // Fetch listing metadata
  const { data: metadata } = await supabase.from("listing_metadata").select("*").eq("listing_id", id)

  // Fetch listing images
  const { data: images } = await supabase.from("listing_images").select("*").eq("listing_id", id).order("sort_order")

  const displayImages = images && images.length > 0 ? images : listing.images ? listing.images : []

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <IncrementViews listingId={id} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="aspect-video relative bg-muted">
                {displayImages.length > 0 ? (
                  <img
                    src={displayImages[0].image_url || "/placeholder.svg?height=600&width=800"}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-muted-foreground">No image available</p>
                  </div>
                )}
                {listing.is_featured && <Badge className="absolute top-4 right-4">Featured</Badge>}
              </div>
              {displayImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2 p-4">
                  {displayImages.slice(1, 5).map((img: any, idx: number) => (
                    <div key={idx} className="aspect-video bg-muted rounded overflow-hidden">
                      <img
                        src={img.image_url || "/placeholder.svg"}
                        alt={`${listing.title} ${idx + 2}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Title and Description */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                      {listing.categories && (
                        <Badge variant="secondary">
                          {listing.categories.icon} {listing.categories.name}
                        </Badge>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(listing.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {listing.views} views
                      </div>
                    </div>
                  </div>
                  {listing.price && (
                    <div className="text-right">
                      <p className="text-3xl font-bold text-primary">£{listing.price.toFixed(2)}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 mb-4 flex-wrap">
                  {listing.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {listing.location}
                    </div>
                  )}
                  {listing.area && (
                    <Link href={`/area/${encodeURIComponent(listing.area)}`}>
                      <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                        <MapPin className="h-3 w-3 mr-1" />
                        {listing.area}
                      </Badge>
                    </Link>
                  )}
                  {listing.brand && (
                    <Link href={`/brand/${encodeURIComponent(listing.brand)}`}>
                      <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                        <Tag className="h-3 w-3 mr-1" />
                        {listing.brand}
                      </Badge>
                    </Link>
                  )}
                </div>

                {listing.facilities && listing.facilities.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold mb-2">Facilities</h3>
                    <div className="flex flex-wrap gap-2">
                      {listing.facilities.map((facility: string, idx: number) => (
                        <Badge key={idx} variant="secondary" className="capitalize">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="prose max-w-none">
                  <h2 className="text-xl font-semibold mb-3">Description</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{listing.description}</p>
                </div>

                {/* Additional Metadata */}
                {metadata && metadata.length > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <h2 className="text-xl font-semibold mb-3">Additional Details</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {metadata.map((item: any) => (
                        <div key={item.id}>
                          <p className="text-sm text-muted-foreground capitalize">{item.key.replace(/_/g, " ")}</p>
                          <p className="font-medium">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {listing.latitude && listing.longitude && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Location</h3>
                  <div className="h-80 rounded-lg overflow-hidden bg-muted">
                    <GoogleMap
                      latitude={Number.parseFloat(listing.latitude)}
                      longitude={Number.parseFloat(listing.longitude)}
                      title={listing.title}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    Note: This is an approximate location. Contact seller for exact address.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Contact Seller</h3>
                <div className="space-y-3">
                  {listing.contact_name && (
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-medium">{listing.contact_name}</p>
                    </div>
                  )}
                  {listing.contact_email && (
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                      <a href={`mailto:${listing.contact_email}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </a>
                    </Button>
                  )}
                  {listing.contact_phone && (
                    <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                      <a href={`tel:${listing.contact_phone}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call Now
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Safety Tips Card */}
            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Safety Tips</h3>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• Meet in a public place</li>
                  <li>• Check the item before purchase</li>
                  <li>• Pay only after collecting item</li>
                  <li>• Beware of unrealistic offers</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
