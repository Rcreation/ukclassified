import { Header } from "@/components/header"
import { CategoryCard } from "@/components/category-card"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import type { Category } from "@/lib/types"

export default async function CategoriesPage() {
  const supabase = await getSupabaseServerClient()

  const { data: categories } = await supabase.from("categories").select("*").eq("is_active", true).order("sort_order")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Categories</h1>
          <p className="text-muted-foreground">Browse classified listings by category</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories?.map((category: Category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  )
}
