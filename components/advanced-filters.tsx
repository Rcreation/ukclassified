"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import type { Category } from "@/lib/types"

interface AdvancedFiltersProps {
  categories?: Category[]
  areas?: string[]
  brands?: string[]
  facilities?: string[]
  showCategoryFilter?: boolean
}

export function AdvancedFilters({
  categories = [],
  areas = [],
  brands = [],
  facilities = [],
  showCategoryFilter = true,
}: AdvancedFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "")
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>(
    searchParams.get("facilities")?.split(",").filter(Boolean) || [],
  )

  const currentCategory = searchParams.get("category") || ""
  const currentSort = searchParams.get("sort") || "newest"
  const currentArea = searchParams.get("area") || ""
  const currentBrand = searchParams.get("brand") || ""

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`?${params.toString()}`)
  }

  const handlePriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (minPrice) params.set("minPrice", minPrice)
    else params.delete("minPrice")
    if (maxPrice) params.set("maxPrice", maxPrice)
    else params.delete("maxPrice")
    router.push(`?${params.toString()}`)
  }

  const handleFacilityToggle = (facility: string) => {
    const updated = selectedFacilities.includes(facility)
      ? selectedFacilities.filter((f) => f !== facility)
      : [...selectedFacilities, facility]
    setSelectedFacilities(updated)
    const params = new URLSearchParams(searchParams.toString())
    if (updated.length > 0) {
      params.set("facilities", updated.join(","))
    } else {
      params.delete("facilities")
    }
    router.push(`?${params.toString()}`)
  }

  const handleReset = () => {
    setMinPrice("")
    setMaxPrice("")
    setSelectedFacilities([])
    const basePath = window.location.pathname
    router.push(basePath)
  }

  return (
    <div className="space-y-4">
      {showCategoryFilter && categories.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Categories</CardTitle>
          </CardHeader>
          <CardContent className="max-h-64 overflow-y-auto">
            <RadioGroup value={currentCategory} onValueChange={(v) => updateParams("category", v)}>
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
      )}

      {areas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Area</CardTitle>
          </CardHeader>
          <CardContent className="max-h-64 overflow-y-auto">
            <RadioGroup value={currentArea} onValueChange={(v) => updateParams("area", v)}>
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="" id="area-all" />
                <Label htmlFor="area-all" className="cursor-pointer">
                  All Areas
                </Label>
              </div>
              {areas.map((area) => (
                <div key={area} className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value={area} id={`area-${area}`} />
                  <Label htmlFor={`area-${area}`} className="cursor-pointer">
                    {area}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      {brands.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Brand</CardTitle>
          </CardHeader>
          <CardContent className="max-h-64 overflow-y-auto">
            <RadioGroup value={currentBrand} onValueChange={(v) => updateParams("brand", v)}>
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="" id="brand-all" />
                <Label htmlFor="brand-all" className="cursor-pointer">
                  All Brands
                </Label>
              </div>
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value={brand} id={`brand-${brand}`} />
                  <Label htmlFor={`brand-${brand}`} className="cursor-pointer">
                    {brand}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label htmlFor="min-price" className="text-sm">
              Min Price (£)
            </Label>
            <Input
              id="min-price"
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="max-price" className="text-sm">
              Max Price (£)
            </Label>
            <Input
              id="max-price"
              type="number"
              placeholder="Any"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="mt-1"
            />
          </div>
          <Button onClick={handlePriceFilter} className="w-full" size="sm">
            Apply Price Filter
          </Button>
        </CardContent>
      </Card>

      {facilities.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Facilities</CardTitle>
          </CardHeader>
          <CardContent className="max-h-64 overflow-y-auto">
            <div className="space-y-2">
              {facilities.map((facility) => (
                <div key={facility} className="flex items-center space-x-2">
                  <Checkbox
                    id={`facility-${facility}`}
                    checked={selectedFacilities.includes(facility)}
                    onCheckedChange={() => handleFacilityToggle(facility)}
                  />
                  <Label htmlFor={`facility-${facility}`} className="cursor-pointer capitalize">
                    {facility}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sort By</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={currentSort} onValueChange={(v) => updateParams("sort", v)}>
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
        Reset All Filters
      </Button>
    </div>
  )
}
