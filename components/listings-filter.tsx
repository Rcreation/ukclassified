"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import type { Category } from "@/lib/types"

interface ListingsFilterProps {
  categories: Category[]
}

export function ListingsFilter({ categories }: ListingsFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategory = searchParams.get("category") || ""
  const currentSort = searchParams.get("sort") || "newest"

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (categoryId) {
      params.set("category", categoryId)
    } else {
      params.delete("category")
    }
    router.push(`/browse?${params.toString()}`)
  }

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sort", sort)
    router.push(`/browse?${params.toString()}`)
  }

  const handleReset = () => {
    router.push("/browse")
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={currentCategory} onValueChange={handleCategoryChange}>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="" id="cat-all" />
              <Label htmlFor="cat-all" className="cursor-pointer">
                All Categories
              </Label>
            </div>
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value={category.id} id={`cat-${category.id}`} />
                <Label htmlFor={`cat-${category.id}`} className="cursor-pointer">
                  {category.icon} {category.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sort By</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={currentSort} onValueChange={handleSortChange}>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="newest" id="sort-newest" />
              <Label htmlFor="sort-newest" className="cursor-pointer">
                Newest First
              </Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="oldest" id="sort-oldest" />
              <Label htmlFor="sort-oldest" className="cursor-pointer">
                Oldest First
              </Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="price-low" id="sort-low" />
              <Label htmlFor="sort-low" className="cursor-pointer">
                Price: Low to High
              </Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="price-high" id="sort-high" />
              <Label htmlFor="sort-high" className="cursor-pointer">
                Price: High to Low
              </Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="popular" id="sort-popular" />
              <Label htmlFor="sort-popular" className="cursor-pointer">
                Most Viewed
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Button onClick={handleReset} variant="outline" className="w-full bg-transparent">
        Reset Filters
      </Button>
    </div>
  )
}
