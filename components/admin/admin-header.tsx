import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, FileText, Tag, ArrowLeft } from "lucide-react"

export function AdminHeader() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold">
              A
            </div>
            <span className="text-xl font-bold">Admin Panel</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/admin" className="text-sm font-medium hover:text-primary flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link href="/admin/listings" className="text-sm font-medium hover:text-primary flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Listings
            </Link>
            <Link href="/admin/categories" className="text-sm font-medium hover:text-primary flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Categories
            </Link>
          </nav>

          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Site
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
