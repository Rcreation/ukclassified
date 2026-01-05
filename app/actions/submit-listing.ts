"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function submitListing(formData: FormData) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: "You must be logged in to submit a listing" }
    }

    const category_id = formData.get("category_id") as string
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const price = formData.get("price") as string
    const location = formData.get("location") as string
    const contact_name = formData.get("contact_name") as string
    const contact_email = formData.get("contact_email") as string
    const contact_phone = formData.get("contact_phone") as string

    // Insert listing
    const { data, error } = await supabase
      .from("listings")
      .insert({
        category_id,
        title,
        description,
        price: price ? Number.parseFloat(price) : null,
        location: location || null,
        contact_name,
        contact_email,
        contact_phone: contact_phone || null,
        status: "pending",
        user_id: user.id, // Use actual user ID
      })
      .select()
      .single()

    if (error) {
      console.error("[v0] Error submitting listing:", error)
      return { error: "Failed to submit listing. Please try again." }
    }

    revalidatePath("/")
    revalidatePath("/browse")

    return { success: true, listingId: data.id }
  } catch (err) {
    console.error("[v0] Unexpected error:", err)
    return { error: "An unexpected error occurred." }
  }
}
