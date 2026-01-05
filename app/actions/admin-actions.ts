"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateListingStatus(listingId: string, status: string) {
  try {
    const supabase = await getSupabaseServerClient()

    const { error } = await supabase.from("listings").update({ status }).eq("id", listingId)

    if (error) {
      console.error("[v0] Error updating listing status:", error)
      return { error: "Failed to update listing status" }
    }

    revalidatePath("/admin")
    revalidatePath("/admin/listings")
    revalidatePath("/browse")
    revalidatePath("/")

    return { success: true }
  } catch (err) {
    console.error("[v0] Unexpected error:", err)
    return { error: "An unexpected error occurred" }
  }
}

export async function deleteListing(listingId: string) {
  try {
    const supabase = await getSupabaseServerClient()

    const { error } = await supabase.from("listings").delete().eq("id", listingId)

    if (error) {
      console.error("[v0] Error deleting listing:", error)
      return { error: "Failed to delete listing" }
    }

    revalidatePath("/admin")
    revalidatePath("/admin/listings")
    revalidatePath("/browse")
    revalidatePath("/")

    return { success: true }
  } catch (err) {
    console.error("[v0] Unexpected error:", err)
    return { error: "An unexpected error occurred" }
  }
}
