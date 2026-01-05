import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { Category } from "@/lib/types"

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  const categoryColors: Record<string, string> = {
    jobs: "from-blue-500 to-blue-600",
    "real-estate": "from-purple-500 to-purple-600",
    vehicles: "from-red-500 to-red-600",
    products: "from-green-500 to-green-600",
    matrimony: "from-pink-500 to-pink-600",
    events: "from-orange-500 to-orange-600",
    services: "from-teal-500 to-teal-600",
    community: "from-indigo-500 to-indigo-600",
  }

  const gradient = categoryColors[category.slug] || "from-primary to-primary/80"

  return (
    <Link href={`/category/${category.slug}`}>
      <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-0">
        <div className={`h-28 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          <div className="text-6xl group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
        </div>
        <CardContent className="p-5 bg-card">
          <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">{category.name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{category.description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
