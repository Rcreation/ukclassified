"use client"

import { useEffect } from "react"

export function IncrementViews({ listingId }: { listingId: string }) {
  useEffect(() => {
    // Increment view count
    fetch(`/api/listings/${listingId}/view`, { method: "POST" }).catch(() => {
      // Silently fail if view increment doesn't work
    })
  }, [listingId])

  return null
}
