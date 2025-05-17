import { formatDistanceToNow } from "date-fns"
import { Globe, Smartphone, Laptop } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const recentActivity = [
  {
    id: 1,
    qrName: "Product Landing Page",
    location: "New York, USA",
    device: "mobile",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
  },
  {
    id: 2,
    qrName: "Event Registration",
    location: "London, UK",
    device: "desktop",
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
  },
  {
    id: 3,
    qrName: "Promotional Offer",
    location: "Toronto, Canada",
    device: "mobile",
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
  },
  {
    id: 4,
    qrName: "Contact Information",
    location: "Sydney, Australia",
    device: "tablet",
    timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
  },
  {
    id: 5,
    qrName: "Digital Menu",
    location: "Paris, France",
    device: "mobile",
    timestamp: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {recentActivity.map((activity) => (
        <div key={activity.id} className="flex items-center gap-4">
          <Avatar className="h-9 w-9 border">
            <AvatarFallback className="bg-primary/10 text-primary">
              {activity.device === "mobile" ? (
                <Smartphone className="h-4 w-4" />
              ) : activity.device === "desktop" ? (
                <Laptop className="h-4 w-4" />
              ) : (
                <Globe className="h-4 w-4" />
              )}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.qrName}</p>
            <p className="text-xs text-muted-foreground">{activity.location}</p>
          </div>
          <div className="text-xs text-muted-foreground">
            {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
          </div>
        </div>
      ))}
    </div>
  )
}
