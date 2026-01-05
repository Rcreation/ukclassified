"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Category } from "@/lib/types"
import { submitListing } from "@/app/actions/submit-listing"
import { Loader2 } from "lucide-react"

interface PostListingFormProps {
  categories: Category[]
}

export function PostListingForm({ categories }: PostListingFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError("")

    try {
      const result = await submitListing(formData)

      if (result.error) {
        setError(result.error)
      } else if (result.success) {
        router.push(`/listing/${result.listingId}`)
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <form action={handleSubmit} className="space-y-6">
          {error && <div className="bg-destructive/10 text-destructive px-4 py-3 rounded">{error}</div>}

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select name="category_id" required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="title">Title *</Label>
            <Input id="title" name="title" placeholder="Enter a descriptive title" required maxLength={100} />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Provide detailed information about your listing"
              rows={6}
              required
              maxLength={2000}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" type="number" step="0.01" min="0" placeholder="0.00" />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" placeholder="City, State" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact_name">Your Name *</Label>
              <Input id="contact_name" name="contact_name" placeholder="John Doe" required />
            </div>

            <div>
              <Label htmlFor="contact_email">Email *</Label>
              <Input id="contact_email" name="contact_email" type="email" placeholder="you@example.com" required />
            </div>
          </div>

          <div>
            <Label htmlFor="contact_phone">Phone</Label>
            <Input id="contact_phone" name="contact_phone" type="tel" placeholder="+1 (555) 000-0000" />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Submitting..." : "Submit Listing"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            * Required fields. Your listing will be reviewed before being published.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
