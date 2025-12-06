import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
    return (
        <div className="container py-20">
            <div className="mx-auto max-w-2xl space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
                    <p className="text-muted-foreground text-lg">
                        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Send us a message</CardTitle>
                            <CardDescription>
                                Fill out the form below and our team will get back to you within 24 hours.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="first-name">First name</Label>
                                        <Input id="first-name" placeholder="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="last-name">Last name</Label>
                                        <Input id="last-name" placeholder="Doe" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" placeholder="john@example.com" type="email" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea
                                        id="message"
                                        placeholder="How can we help you?"
                                        className="min-h-[150px]"
                                    />
                                </div>
                                <Button className="w-full">Send Message</Button>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="grid gap-6 md:grid-cols-3 text-center">
                        <div className="flex flex-col items-center space-y-2">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <Mail className="h-6 w-6" />
                            </div>
                            <h3 className="font-semibold">Email</h3>
                            <p className="text-sm text-muted-foreground">support@qrmonitor.com</p>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <Phone className="h-6 w-6" />
                            </div>
                            <h3 className="font-semibold">Phone</h3>
                            <p className="text-sm text-muted-foreground">+1 (555) 000-0000</p>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <div className="p-3 rounded-full bg-primary/10 text-primary">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <h3 className="font-semibold">Office</h3>
                            <p className="text-sm text-muted-foreground">123 QR Street, Tech City</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
