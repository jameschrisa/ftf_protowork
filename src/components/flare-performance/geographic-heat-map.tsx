import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

interface Location {
  id: string
  name: string
  lat: number
  lng: number
  value: number
}

const locations: Location[] = [
  { id: "1", name: "Eagle Ford 1", lat: 28.7041, lng: -99.9018, value: 95 },
  { id: "2", name: "Eagle Ford 2", lat: 28.9041, lng: -99.7018, value: 88 },
  { id: "3", name: "Permian Basin 1", lat: 31.7555, lng: -102.0205, value: 92 },
  { id: "4", name: "Permian Basin 2", lat: 31.9555, lng: -102.2205, value: 97 },
]

function getColor(value: number): string {
  if (value >= 95) return "#22c55e"
  if (value >= 90) return "#eab308"
  return "#ef4444"
}

export function GeographicHeatMap() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Geographic Performance Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[500px] rounded-md border">
          <MapContainer
            center={[31.7555, -102.0205]}
            zoom={6}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {locations.map((location) => (
              <CircleMarker
                key={location.id}
                center={[location.lat, location.lng]}
                radius={20}
                fillColor={getColor(location.value)}
                color={getColor(location.value)}
                weight={1}
                opacity={0.8}
                fillOpacity={0.6}
                eventHandlers={{
                  click: () => setSelectedLocation(location),
                }}
              >
                {selectedLocation?.id === location.id && (
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-medium">{location.name}</h3>
                      <p className="text-sm">Efficiency: {location.value}%</p>
                    </div>
                  </Popup>
                )}
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </CardContent>
    </Card>
  )
}
