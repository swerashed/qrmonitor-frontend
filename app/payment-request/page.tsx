"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { createPaymentRequest } from "@/services/PaymentServices"
import { toast } from "sonner"
import { motion } from "framer-motion"

export default function PaymentRequestPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData)

        try {
            const res = await createPaymentRequest(data)
            if (res?.success) {
                setIsSuccess(true)
                toast.success("Request received successfully!")
            } else {
                toast.error(res?.message || "Something went wrong")
            }
        } catch (error) {
            toast.error("Failed to submit request")
        } finally {
            setIsLoading(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4 py-12 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="w-full max-w-md text-center border-green-200 bg-green-50/50">
                        <CardHeader>
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                <CheckCircle2 className="h-8 w-8 text-green-600" />
                            </div>
                            <CardTitle className="text-2xl text-green-800">Request Received</CardTitle>
                            <CardDescription className="text-green-700">
                                Thank you for your interest! We have received your request and will reach out to you shortly to finalize your subscription.
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className="justify-center">
                            <Button asChild className="bg-green-600 hover:bg-green-700">
                                <Link href="/">Return to Home</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4 py-12 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg"
            >
                <div className="mb-8">
                    <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Link>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Start Your Journey</CardTitle>
                        <CardDescription>
                            Please provide your details to proceed with the subscription.
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={onSubmit}>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First name</Label>
                                    <Input id="firstName" name="firstName" required placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last name</Label>
                                    <Input id="lastName" name="lastName" required placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" required placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="company">Company (Optional)</Label>
                                <Input id="company" name="company" placeholder="Acme Inc." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone (Optional)</Label>
                                <Input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="plan">Interested Plan</Label>
                                <select
                                    id="plan"
                                    name="plan"
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <option value="Starter">Starter ($9/mo)</option>
                                    <option value="Professional">Professional ($29/mo)</option>
                                    <option value="Enterprise">Enterprise (Custom)</option>
                                </select>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" type="submit" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Submit Request
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </motion.div>
        </div>
    )
}
