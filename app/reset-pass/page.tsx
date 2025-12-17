"use client"
import { useState, Suspense } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { resetPassword } from "@/services/AuthServices"
import { useRouter, useSearchParams } from "next/navigation"

const resetSchema = z
    .object({
        password: z.string().min(6, { message: "Password must be at least 6 characters" }),
        confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

type ResetFormValues = z.infer<typeof resetSchema>

function ResetPasswordFormContent() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const searchParams = useSearchParams()

    // Get token and userId from URL query params (matches backend logic)
    const token = searchParams.get("token")
    const userId = searchParams.get("userId")

    const form = useForm<ResetFormValues>({
        resolver: zodResolver(resetSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })

    // Handle reset submission
    const onSubmit = async (data: ResetFormValues) => {
        if (!token || !userId) {
            toast.error("Invalid reset link")
            return
        }

        setIsLoading(true)
        try {
            const payload = {
                id: userId,
                newPassword: data.password
            }

            const res = await resetPassword(payload, token)

            if (res.success) {
                toast.success("Password reset successful", {
                    description: "You can now login with your new password.",
                })
                router.push("/login")
            } else {
                toast.error(res.message || "Reset failed")
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>Enter your new password below</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Create a password"
                                            type="password"
                                            autoComplete="new-password"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Confirm your password"
                                            type="password"
                                            autoComplete="new-password"
                                            disabled={isLoading}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isLoading ? "Resetting..." : "Reset Password"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default function ResetPasswordPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
            <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin" />}>
                <ResetPasswordFormContent />
            </Suspense>
        </div>
    )
}
