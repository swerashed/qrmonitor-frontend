"use client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { signInUser, signUpUser, verifyEmail, forgetPassword, resendOtp } from "@/services/AuthServices"
import { useRouter } from "next/navigation"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { PasswordInput } from "@/components/ui/password-input"

// Define the login form schema with Zod
const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Must be a valid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

// Define the signup form schema with Zod
const signupSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Must be a valid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

// Define the otp form schema with Zod
const otpSchema = z.object({
  otp: z.string().min(6, { message: "OTP must be 6 characters" }),
})

// Define the forgot password schema
const forgotPasswordSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Must be a valid email" }),
})

type LoginFormValues = z.infer<typeof loginSchema>
type SignupFormValues = z.infer<typeof signupSchema>
type OtpFormValues = z.infer<typeof otpSchema>
type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>

export function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"login" | "signup" | "otp" | "forgot">("login")
  const [emailForVerification, setEmailForVerification] = useState("")
  const [resendDisabled, setResendDisabled] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)
  const router = useRouter()

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value as "login" | "signup" | "otp" | "forgot")
  }

  // Initialize React Hook Form for login
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Initialize React Hook Form for signup
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  // Initialize React Hook Form for otp
  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  })

  // Initialize React Hook Form for forgot password
  const forgotPasswordForm = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  // Handle login form submission
  const onLoginSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)

    try {
      const loginResponse = await signInUser(data)
      if (loginResponse.success) {
        toast.success(loginResponse.message || "Login successful", {
          description: "You have been logged in successfully.",
        })
        router.push("/dashboard")
      } else {
        if (loginResponse.message === "Please verify your email first!") {
          toast.error("Account not verified", {
            description: "Redirecting to verification...",
          });
          setEmailForVerification(data.email);
          handleTabChange("otp");
          return;
        }

        toast.error(loginResponse.message || "Login failed", {
          description: "Invalid email or password. Please try again.",
        })
      }
    } catch (error) {
      toast.error("Login failed", {
        description: "Something went wrong. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle signup form submission
  const onSignupSubmit = async (data: SignupFormValues) => {
    setIsLoading(true)

    try {
      const signUpResponse = await signUpUser(data)
      if (signUpResponse.success) {
        // Simulate successful signup
        toast.success("Signup successful", {
          description: "Your account has been created successfully.",
        })

        toast.success("Signup successful", {
          description: "Please check your email for the OTP.",
        })
        setEmailForVerification(data.email);
        handleTabChange("otp")
      } else {
        toast.error(signUpResponse.message || "Signup failed", {
          description: "Please try again.",
        })
      }


    } catch (error) {
      toast.error("Account Creation Failed!", {
        description: "An error occurred. Please try again.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle OTP submission
  const onOtpSubmit = async (data: OtpFormValues) => {
    setIsLoading(true)
    try {
      const res = await verifyEmail({ email: emailForVerification, otp: data.otp })
      if (res.success) {
        toast.success("Verification successful", {
          description: "You can now login.",
        })
        handleTabChange("login")
      } else {
        toast.error(res.message || "Verification failed")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Forgot Password submission
  const onForgotPasswordSubmit = async (data: ForgotPasswordValues) => {
    // If they already entered an email, we can pass it as query param
    router.push(`/reset-pass?email=${encodeURIComponent(data.email)}`)
  }


  // Handle Resend OTP
  const onResendOtp = async () => {
    if (resendDisabled) return

    setIsLoading(true)
    try {
      const res = await resendOtp({ email: emailForVerification })
      if (res.success) {
        toast.success("OTP resent successfully", {
          description: "Check your email (including spam).",
        })
        setResendDisabled(true)
        setResendTimer(60) // Simple 60s cooldown for UI button, backend enforces 2/5min

        const interval = setInterval(() => {
          setResendTimer((prev) => {
            if (prev <= 1) {
              clearInterval(interval)
              setResendDisabled(false)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      } else {
        if (res.message?.includes("Too many resend attempts")) {
          setResendDisabled(true)
          toast.error("Limit Exceeded", {
            description: "Please wait 5 minutes before trying again."
          })
        } else {
          toast.error(res.message || "Resend failed")
        }
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Authentication</CardTitle>
        <CardDescription>Login or create a new account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          {/* Hide tabs when verifying OTP */}
          {activeTab !== 'otp' && (
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
          )}

          <TabsContent value="otp">
            <div className="flex flex-col space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-medium">Verify your email</h3>
                <p className="text-sm text-muted-foreground">Enter the code sent to {emailForVerification} <br /> <span className="font-bold text-xs text-amber-500">Please check your spam/junk folder</span></p>
              </div>
              <Form {...otpForm}>
                <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-4 flex flex-col items-center">
                  <FormField
                    control={otpForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPGroup>
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Verify
                  </Button>

                  <div className="text-center w-full">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={onResendOtp}
                      disabled={isLoading || resendDisabled}
                      className="text-muted-foreground"
                    >
                      {resendDisabled && resendTimer > 0
                        ? `Resend in ${resendTimer}s`
                        : "Resend Code"
                      }
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </TabsContent>

          <TabsContent value="forgot">
            <div className="flex flex-col space-y-4 pt-4">
              <div className="text-center">
                <h3 className="text-lg font-medium">Reset Password</h3>
                <p className="text-sm text-muted-foreground">Enter your email to receive a reset link</p>
              </div>
              <Form {...forgotPasswordForm}>
                <form onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)} className="space-y-4">
                  <FormField
                    control={forgotPasswordForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Proceed to Reset
                  </Button>
                  <Button type="button" variant="link" className="w-full" onClick={() => handleTabChange("login")}>
                    Back to Login
                  </Button>
                </form>
              </Form>
            </div>
          </TabsContent>

          <TabsContent value="login">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          type="email"
                          autoComplete="email"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Enter your password"
                          autoComplete="current-password"
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
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
                <Button type="button" variant="link" className="w-full text-sm" onClick={() => handleTabChange("forgot")}>
                  Forgot Password?
                </Button>

              </form>
            </Form>
          </TabsContent>
          <TabsContent value="signup">
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={signupForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" autoComplete="name" disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          type="email"
                          autoComplete="email"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
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
                  control={signupForm.control}
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
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
