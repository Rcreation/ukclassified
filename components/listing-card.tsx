import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Eye } from "lucide-react"
import type { Listing } from "@/lib/types"

interface ListingCardProps {
  listing: Listing
  featured?: boolean
}

export function ListingCard({ listing, featured = false }: ListingCardProps) {
  const imageUrl = listing.images?.[0] || "/classified-ad.jpg"

  return (
    <Link href={`/listing/${listing.id}`}>
      <Card className={`hover:shadow-lg transition-shadow overflow-hidden ${featured ? "ring-2 ring-primary" : ""}`}>
        <div className="aspect-video relative overflow-hidden bg-muted">
          <img src={imageUrl || "/placeholder.svg"} alt={listing.title} className="object-cover w-full h-full" />
          {listing.is_featured && <Badge className="absolute top-2 right-2">Featured</Badge>}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{listing.title}</h3>
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{listing.description}</p>

          <div className="flex items-center justify-between">
            <div>
              {listing.price && <p className="text-lg font-bold text-primary">£{listing.price.toFixed(2)}</p>}
              {listing.location && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <MapPin className="h-3 w-3" />
                  {listing.location}
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Eye className="h-3 w-3" />
              {listing.views}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
