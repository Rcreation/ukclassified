"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X, Eye, Trash2 } from "lucide-react"
import Link from "next/link"
import { updateListingStatus, deleteListing } from "@/app/actions/admin-actions"
import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ListingsTableProps {
  listings: any[]
}

export function ListingsTable({ listings }: ListingsTableProps) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [filter, setFilter] = useState("all")

  const filteredListings = filter === "all" ? listings : listings.filter((l) => l.status === filter)

  async function handleStatusUpdate(listingId: string, status: string) {
    setLoading(listingId)
    await updateListingStatus(listingId, status)
    setLoading(null)
    router.refresh()
  }

  async function handleDelete(listingId: string) {
    if (!confirm("Are you sure you want to delete this listing?")) return
    setLoading(listingId)
    await deleteListing(listingId)
    setLoading(null)
    router.refresh()
  }

  return (
    <div className="space-y-4">
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell className="font-medium">{listing.title}</TableCell>
                  <TableCell>{listing.categories?.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        listing.status === "approved"
                          ? "default"
                          : listing.status === "pending"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {listing.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{listing.views}</TableCell>
                  <TableCell>{new Date(listing.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/listing/${listing.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      {listing.status !== "approved" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStatusUpdate(listing.id, "approved")}
                          disabled={loading === listing.id}
                        >
                          <Check className="h-4 w-4 text-green-600" />
                        </Button>
                      )}
                      {listing.status !== "rejected" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStatusUpdate(listing.id, "rejected")}
                          disabled={loading === listing.id}
                        >
                          <X className="h-4 w-4 text-red-600" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(listing.id)}
                        disabled={loading === listing.id}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                  No listings found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
