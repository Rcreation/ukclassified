"use client"

import type React from "react"

import { Search, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [location, setLocation] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()

    if (query.trim()) {
      params.set("q", query)
    }
    if (category && category !== "all") {
      params.set("category", category)
    }
    if (location.trim()) {
      params.set("location", location)
    }

    router.push(`/search?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-2xl p-2 flex flex-col md:flex-row gap-2">
        {/* Keyword Search */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="What are you looking for?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 h-14 border-0 focus-visible:ring-0 text-base bg-transparent"
          />
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px bg-border self-stretch my-2" />

        {/* Category Dropdown */}
        <div className="flex-shrink-0 md:w-48">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="h-14 border-0 focus:ring-0 text-base bg-transparent">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="jobs">Jobs</SelectItem>
              <SelectItem value="property">Property</SelectItem>
              <SelectItem value="vehicles">Vehicles</SelectItem>
              <SelectItem value="products">Products</SelectItem>
              <SelectItem value="matrimony">Matrimony</SelectItem>
              <SelectItem value="events">Events</SelectItem>
              <SelectItem value="services">Services</SelectItem>
              <SelectItem value="community">Community</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px bg-border self-stretch my-2" />

        {/* Location Search */}
        <div className="relative flex-shrink-0 md:w-56">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-12 h-14 border-0 focus-visible:ring-0 text-base bg-transparent"
          />
        </div>

        {/* Search Button */}
        <Button
          type="submit"
          size="lg"
          className="h-14 px-10 text-base font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
        >
          <Search className="mr-2 h-5 w-5" />
          Search
        </Button>
      </div>

      {/* Quick Links */}
      <div className="flex flex-wrap gap-3 mt-4 justify-center">
        {[
          { label: "Jobs in London", link: "/browse?category=jobs&location=London" },
          { label: "Property for Sale", link: "/browse?category=property" },
          { label: "Cars", link: "/browse?category=vehicles" },
          { label: "Electronics", link: "/browse?category=products" },
          { label: "Services", link: "/browse?category=services" },
        ].map((quickLink, index) => (
          <a
            key={index}
            href={quickLink.link}
            className="text-sm text-white/90 hover:text-white underline underline-offset-4 transition-colors"
          >
            {quickLink.label}
          </a>
        ))}
      </div>
    </form>
  )
}
