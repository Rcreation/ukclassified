"use client"

import { useEffect, useRef } from "react"

interface GoogleMapProps {
  latitude: number
  longitude: number
  title: string
}

export function GoogleMap({ latitude, longitude, title }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current || typeof window === "undefined") return

    // Load Google Maps script
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY`
    script.async = true
    script.defer = true

    script.onload = () => {
      if (!mapRef.current) return

      // Initialize map
      const map = new (window as any).google.maps.Map(mapRef.current, {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
      })

      // Add marker
      ;new (window as any).google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: title,
      })
    }

    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [latitude, longitude, title])

  return <div ref={mapRef} className="w-full h-full rounded-lg" />
}
