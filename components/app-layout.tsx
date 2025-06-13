"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { BarChart3, LogOut, QrCode, Settings, User, Moon, Sun, Menu, LayoutDashboardIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { handleClientLogout } from "@/hooks/handleClientLogout"
import { getActiveUserClient } from "@/hooks/getActiveUserClient"
import { getUserAvatarFallbackLetters } from "@/helpers/getUserAvatarFallback"
import { useTheme } from "next-themes"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon },
  { name: "QR Codes", href: "/dashboard/qr-codes", icon: QrCode },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Account", href: "/dashboard/account", icon: User },
]

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [activeUser, setActiveUser] = useState({})
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userdata = await getActiveUserClient();
        setActiveUser(userdata || {});
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
  
    fetchUser();
  }, []); 

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <div className="flex flex-col gap-4 py-4">
              <div className="flex items-center gap-2 px-2">
                <QrCode className="h-6 w-6" />
                <span className="text-lg font-semibold">QR Platform</span>
              </div>
              <nav className="grid gap-2 px-2">
                {navigation.map((item) => (
                  <Button
                    key={item.name}
                    variant={pathname === item.href ? "default" : "ghost"}
                    className={cn("justify-start", pathname === item.href && "bg-primary text-primary-foreground")}
                    onClick={() => setIsMobileNavOpen(false)}
                    asChild
                  >
                    <a href={item.href}>
                      <item.icon className="mr-2 h-5 w-5" />
                      {item.name}
                    </a>
                  </Button>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <QrCode className="h-6 w-6" />
          <span className="text-lg font-semibold hidden md:inline-flex">QR Platform</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>{getUserAvatarFallbackLetters(activeUser)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a href="/dashboard/account">Profile</a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/dashboard/settings">Settings</a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex justify-center items-center">
                <button  className="flex justify-center items-center"  onClick={handleClientLogout}> <LogOut className="mr-2 h-4 w-4 " />
                <span>Log out</span></button>
               
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 shrink-0 border-r md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <nav className="grid gap-1">
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  variant={pathname === item.href ? "default" : "ghost"}
                  className={cn("justify-start", pathname === item.href && "bg-primary text-primary-foreground")}
                  asChild
                >
                  <a href={item.href}>
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.name}
                  </a>
                </Button>
              ))}
            </nav>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
