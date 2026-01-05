import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import type { Category } from "@/lib/types"

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/category/${category.slug}`}>
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-6 flex flex-col items-center gap-3 text-center">
          <div className="text-4xl">{category.icon}</div>
          <h3 className="font-semibold text-lg">{category.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{category.description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}
