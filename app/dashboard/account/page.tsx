"use client"

import { CreditCard, Download, User } from "lucide-react"
import { format } from "date-fns"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function AccountPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Account</h1>
          <p className="text-muted-foreground">Manage your account and subscription</p>
        </div>
      </div>
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>View and update your profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col gap-6 sm:flex-row">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">John Doe</h3>
                  <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                  <div className="flex items-center gap-2 pt-2">
                    <Badge>Pro Plan</Badge>
                    <Badge variant="outline">Admin</Badge>
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="mb-2 text-sm font-medium">Personal Information</h4>
                  <dl className="grid gap-2">
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="text-sm text-muted-foreground">Full Name</dt>
                      <dd className="text-sm font-medium">John Doe</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="text-sm text-muted-foreground">Email</dt>
                      <dd className="text-sm font-medium">john.doe@example.com</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="text-sm text-muted-foreground">Phone</dt>
                      <dd className="text-sm font-medium">+1 (555) 123-4567</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="text-sm text-muted-foreground">Location</dt>
                      <dd className="text-sm font-medium">New York, USA</dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-medium">Account Information</h4>
                  <dl className="grid gap-2">
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="text-sm text-muted-foreground">Account ID</dt>
                      <dd className="text-sm font-medium">ACC123456789</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="text-sm text-muted-foreground">Plan</dt>
                      <dd className="text-sm font-medium">Pro Plan</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="text-sm text-muted-foreground">Member Since</dt>
                      <dd className="text-sm font-medium">January 15, 2023</dd>
                    </div>
                    <div className="grid grid-cols-2 gap-1">
                      <dt className="text-sm text-muted-foreground">Last Login</dt>
                      <dd className="text-sm font-medium">Today at 10:45 AM</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <a href="/settings">
                  <User className="mr-2 h-4 w-4" />
                  Edit Profile
                </a>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>Manage your subscription and billing details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold">Pro Plan</h3>
                    <p className="text-sm text-muted-foreground">$29/month, billed monthly</p>
                  </div>
                  <Badge>Current Plan</Badge>
                </div>
                <div className="mt-4 grid gap-2">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="text-sm">Unlimited QR codes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="text-sm">Advanced analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="text-sm">API access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span className="text-sm">Priority support</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <Button>Upgrade Plan</Button>
                  <Button variant="outline">Cancel Subscription</Button>
                </div>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-medium">Payment Method</h4>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Update
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View your recent invoices and payment history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { id: "INV-001", date: new Date(2023, 4, 1), amount: 29.0, status: "Paid" },
                  { id: "INV-002", date: new Date(2023, 3, 1), amount: 29.0, status: "Paid" },
                  { id: "INV-003", date: new Date(2023, 2, 1), amount: 29.0, status: "Paid" },
                  { id: "INV-004", date: new Date(2023, 1, 1), amount: 29.0, status: "Paid" },
                  { id: "INV-005", date: new Date(2023, 0, 1), amount: 29.0, status: "Paid" },
                ].map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-medium">Invoice {invoice.id}</p>
                      <p className="text-sm text-muted-foreground">{format(invoice.date, "MMMM d, yyyy")}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                      <Badge variant="outline" className="ml-auto">
                        {invoice.status}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download Invoice</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage Statistics</CardTitle>
              <CardDescription>Monitor your QR code usage and analytics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <div className="text-sm font-medium text-muted-foreground">Total QR Codes</div>
                  <div className="mt-2 text-3xl font-bold">24</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    <span className="text-green-500">+2</span> from last month
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="text-sm font-medium text-muted-foreground">Total Scans</div>
                  <div className="mt-2 text-3xl font-bold">1,284</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    <span className="text-green-500">+12%</span> from last month
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="text-sm font-medium text-muted-foreground">API Requests</div>
                  <div className="mt-2 text-3xl font-bold">5,432</div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    <span className="text-green-500">+8%</span> from last month
                  </div>
                </div>
              </div>
              <div>
                <h4 className="mb-4 text-sm font-medium">Usage Limits</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">QR Codes</div>
                      <div className="text-sm text-muted-foreground">24 / Unlimited</div>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "24%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">API Requests</div>
                      <div className="text-sm text-muted-foreground">5,432 / 10,000</div>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "54%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">Storage</div>
                      <div className="text-sm text-muted-foreground">256 MB / 1 GB</div>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "25%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Download Usage Report</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
