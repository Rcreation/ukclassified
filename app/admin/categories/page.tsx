import { getSupabaseServerClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin/admin-header"
import { CategoriesTable } from "@/components/admin/categories-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default async function AdminCategoriesPage() {
  const supabase = await getSupabaseServerClient()

  const { data: categories } = await supabase.from("categories").select("*").order("sort_order")

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Categories</h1>
            <p className="text-muted-foreground">Add, edit, or remove listing categories</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>

        <CategoriesTable categories={categories || []} />
      </div>
    </div>
  )
}
