import { Header } from "@/components/header"
import { PostListingForm } from "@/components/post-listing-form"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export default async function PostPage() {
  const supabase = await getSupabaseServerClient()

  // Fetch categories
  const { data: categories } = await supabase.from("categories").select("*").eq("is_active", true).order("name")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Post a Free Ad</h1>
          <p className="text-muted-foreground">Fill in the details below to post your classified ad</p>
        </div>

        <PostListingForm categories={categories || []} />
      </div>
    </div>
  )
}
