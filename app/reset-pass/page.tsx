"use client"
import { useState, Suspense } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { forgetPassword, checkResetOtp, resetPassword } from "@/services/AuthServices"
import { useRouter, useSearchParams } from "next/navigation"

// Schemas for each step
const emailSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
})

const otpSchema = z.object({
    otp: z.string().min(6, { message: "OTP must be 6 characters" }),
})

const passwordSchema = z.object({
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})


type EmailFormValues = z.infer<typeof emailSchema>
type OtpFormValues = z.infer<typeof otpSchema>
type PasswordFormValues = z.infer<typeof passwordSchema>

function ResetPasswordFormContent() {
    const [step, setStep] = useState<"email" | "otp" | "password">("email")
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")

    const router = useRouter()
    const searchParams = useSearchParams()

    // Check if email is passed via URL (e.g. from login page "Forgot Password" link)
    // If so, and we haven't set state yet, we could auto-fill. 
    // But since we want to follow the flow "enter email -> send code", 
    // we can pre-fill the email input but still require the user to click "Send Code".
    const emailParam = searchParams.get("email")

    // --- STEP 1: EMAIL ---
    const emailForm = useForm<EmailFormValues>({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: emailParam || "" },
    })

    const onEmailSubmit = async (data: EmailFormValues) => {
        setIsLoading(true)
        try {
            const res = await forgetPassword(data)
            if (res.success) {
                setEmail(data.email)
                toast.success("Verification code sent", { description: "Check your email." })
                setStep("otp")
            } else {
                toast.error(res.message || "Failed to send code")
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    // --- STEP 2: OTP ---
    const otpForm = useForm<OtpFormValues>({
        resolver: zodResolver(otpSchema),
        defaultValues: { otp: "" },
    })

    const onOtpSubmit = async (data: OtpFormValues) => {
        setIsLoading(true)
        try {
            // Verify OTP without resetting password yet
            const res = await checkResetOtp({ email, otp: data.otp })
            if (res.success) {
                setOtp(data.otp)
                toast.success("Code verified")
                setStep("password")
            } else {
                toast.error(res.message || "Invalid code")
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    // --- STEP 3: PASSWORD ---
    const passwordForm = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: { password: "", confirmPassword: "" },
    })

    const onPasswordSubmit = async (data: PasswordFormValues) => {
        setIsLoading(true)
        try {
            const payload = {
                email,
                otp,
                newPassword: data.password
            }
            const res = await resetPassword(payload)
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
                <CardDescription>
                    {step === "email" && "Enter your email to receive a verification code."}
                    {step === "otp" && `Enter the 6-digit code sent to ${email}`}
                    {step === "password" && "Create a new password."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {step === "email" && (
                    <Form {...emailForm}>
                        <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4 pt-4">
                            <FormField
                                control={emailForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your email" {...field} disabled={isLoading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isLoading ? "Sending..." : "Send Code"}
                            </Button>
                        </form>
                    </Form>
                )}

                {step === "otp" && (
                    <Form {...otpForm}>
                        <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4 pt-4">
                            <FormField
                                control={otpForm.control}
                                name="otp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Verification Code</FormLabel>
                                        <FormControl>
                                            <div className="flex justify-center">
                                                <InputOTP maxLength={6} {...field} disabled={isLoading}>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={0} />
                                                        <InputOTPSlot index={1} />
                                                        <InputOTPSlot index={2} />
                                                        <InputOTPSlot index={3} />
                                                        <InputOTPSlot index={4} />
                                                        <InputOTPSlot index={5} />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isLoading ? "Verifying..." : "Verify Code"}
                            </Button>
                            <Button
                                type="button"
                                variant="ghost"
                                className="w-full"
                                onClick={() => setStep("email")}
                                disabled={isLoading}
                            >
                                Back
                            </Button>
                        </form>
                    </Form>
                )}

                {step === "password" && (
                    <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4 pt-4">
                            <FormField
                                control={passwordForm.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                placeholder="Create a password"
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
                                control={passwordForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <PasswordInput
                                                placeholder="Confirm your password"
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
                )}
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
