export interface Category {
  id: string
  name: string
  slug: string
  icon: string | null
  description: string | null
  created_at: string
}

export interface Listing {
  id: string
  title: string
  description: string
  category_id: string
  user_id: string
  price: number | null
  location: string | null
  images: string[] | null
  contact_email: string | null
  contact_phone: string | null
  status: "pending" | "approved" | "rejected" | "expired"
  views: number
  is_featured: boolean
  expires_at: string | null
  created_at: string
  updated_at: string
  categories?: Category
}
