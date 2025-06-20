"use client"

import { useEffect, useState } from "react"
import { Bell, Copy, Key, Lock, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { useTheme } from "next-themes"
import { toast } from "sonner"

export default function SettingsPage({ data }: any) {
  const [apiKey, setApiKey] = useState("CLEANED_SECRET")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Fix hydration issue
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey)
    // toast({
    //   title: "API Key Copied",
    //   description: "Your API key has been copied to the clipboard.",
    // })
  }

  const regenerateApiKey = () => {
    setApiKey("sk_live_" + Math.random().toString(36).substring(2, 15))
    // toast({
    //   title: "API Key Regenerated",
    //   description: "Your API key has been regenerated successfully.",
    // })
  }

  const saveSettings = () => {
    toast.success("Signup successful", {
      description: "Your account has been created successfully.",
    })
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input disabled id="name" defaultValue={data.data.name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input disabled id="email" type="email" defaultValue={data.data.email} />
              </div>
              {/* <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="Acme Inc" />
              </div> */}
            </CardContent>
            <CardFooter>
              <Button disabled onClick={saveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input disabled autoComplete="off"  id="current-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input disabled  autoComplete="off" id="new-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input disabled autoComplete="off"  id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled onClick={saveSettings}>
                <Lock className="mr-2 h-4 w-4" />
                Update Password
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the appearance of the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <RadioGroup defaultValue={theme} onValueChange={setTheme}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label htmlFor="theme-light">Light</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label htmlFor="theme-dark">Dark</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="theme-system" />
                    <Label htmlFor="theme-system">System</Label>
                  </div>
                </RadioGroup>
              </div>

            </CardContent>
            <CardFooter>
              <Button onClick={saveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <div className="text-sm text-muted-foreground">Receive email notifications for important events</div>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="scan-alerts">Scan Alerts</Label>
                  <div className="text-sm text-muted-foreground">Get notified when your QR codes are scanned</div>
                </div>
                <Switch id="scan-alerts" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">Marketing Emails</Label>
                  <div className="text-sm text-muted-foreground">Receive updates about new features and promotions</div>
                </div>
                <Switch id="marketing-emails" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="weekly-digest">Weekly Digest</Label>
                  <div className="text-sm text-muted-foreground">
                    Receive a weekly summary of your QR code performance
                  </div>
                </div>
                <Switch id="weekly-digest" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled onClick={saveSettings}>
                <Bell className="mr-2 h-4 w-4" />
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>Manage your API keys and access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex items-center gap-2">
                  <Input id="api-key" value={apiKey} readOnly type="password" />
                  <Button disabled variant="outline" size="icon" onClick={copyApiKey}>
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy API Key</span>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your API key provides full access to your account. Keep it secure.
                </p>
              </div>
              <Button disabled variant="outline" onClick={regenerateApiKey}>
                <Key className="mr-2 h-4 w-4" />
                Regenerate API Key
              </Button>
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input disabled id="webhook-url" placeholder="https://your-server.com/webhook" />
                <p className="text-sm text-muted-foreground">We'll send scan events to this URL in real-time.</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="allowed-domains">Allowed Domains</Label>
                <Textarea disabled
                  id="allowed-domains"
                  placeholder="example.com&#10;app.example.com"
                  className="min-h-[100px]"
                />
                <p className="text-sm text-muted-foreground">
                  Enter one domain per line. Only these domains will be allowed to use your API key.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled onClick={saveSettings}>
                <Save className="mr-2 h-4 w-4" />
                Save API Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
