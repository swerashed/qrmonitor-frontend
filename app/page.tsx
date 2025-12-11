"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Check, QrCode, BarChart3, Globe, Smartphone, Clock, TrendingUp, Lock, Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { subscribeUser, unsubscribeUser } from "./action"
import { QrLifecycleDemo } from "@/components/qr-lifecycle-demo"
import { AnalyticsPreview } from "@/components/analytics-preview"

export default function LandingPage() {
  const [isQrHovered, setIsQrHovered] = useState(false)

  // QR code animation
  const qrVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, rotate: 2 },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* <PushNotificationManager />
       <InstallPrompt /> */}
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">QrMonitor</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimonials
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button className="hidden md:inline-flex">
              <Link href="/payment-request">Get Started Free</Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="#features" className="text-lg font-medium hover:text-primary">
                    Features
                  </Link>
                  <Link href="#demo" className="text-lg font-medium hover:text-primary">
                    Demo
                  </Link>
                  <Link href="#analytics" className="text-lg font-medium hover:text-primary">
                    Analytics
                  </Link>
                  <Link href="#testimonials" className="text-lg font-medium hover:text-primary">
                    Testimonials
                  </Link>
                  <Link href="#pricing" className="text-lg font-medium hover:text-primary">
                    Pricing
                  </Link>
                  <Link href="#faq" className="text-lg font-medium hover:text-primary">
                    FAQ
                  </Link>
                  <div className="pt-4">
                    <Button className="w-full" asChild>
                      <Link href="/payment-request">Get Started Free</Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    One QR Code. Unlimited Possibilities. Forever.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Create QR codes that last a lifetime. Update destinations anytime, track every scan, and never reprint again. Your QR stays the same, your destination can change.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-primary text-primary-foreground">

                    <Link href="/payment-request">Get Started Free</Link>

                  </Button>

                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }} className="flex items-center justify-center">
                <motion.div
                  variants={qrVariants}
                  initial="initial"
                  animate={isQrHovered ? "hover" : "initial"}
                  onMouseEnter={() => setIsQrHovered(true)}
                  onMouseLeave={() => setIsQrHovered(false)}
                  className="relative w-full max-w-[400px] aspect-square"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-20 blur-xl"></div>
                  <div className="relative bg-card border rounded-2xl shadow-lg p-8 h-full flex items-center justify-center">
                    <div className="relative w-3/4 aspect-square">
                      <Image
                        src="/qr-code.png"
                        alt="Animated QR Code"
                        width={300}
                        height={300}
                        className="object-contain rounded-lg"
                      />
                      <div
                        className={cn(
                          "absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg opacity-0 transition-opacity duration-500",
                          isQrHovered && "opacity-20",
                        )}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/50">
          <motion.div initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Powerful QR Management</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to create, manage, and analyze your QR codes in one place.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-stretch gap-6 py-12 lg:grid-cols-3 lg:gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden rounded-lg border bg-background p-6 flex flex-col"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <div className="mt-4 space-y-2 flex-1">
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Interactive Demo Section */}
        <section id="demo" className="py-20">
          <motion.div initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }} className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Live Demo
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">See QrMonitor in Action</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Watch how easy it is to create a QR code once and update its destination forever.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-4xl py-12">
              <QrLifecycleDemo />
            </div>
          </motion.div>
        </section>

        {/* Analytics Preview Section */}
        <section id="analytics" className="py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Analytics
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Know Your Audience. Grow Your Business.</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Every scan tells a story. Discover who's scanning, when they're engaging, and where they're coming from. Turn data into decisions with real-time analytics that actually matter.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12 space-y-12">


              {/* Analytics Features Grid */}
              <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
                {analyticsFeatures.map((feature, index) => {
                  const icons = [
                    <BarChart3 className="h-6 w-6 text-green-500 stroke-[2.5]" />,
                    <Globe className="h-6 w-6 text-green-500 stroke-[2.5]" />,
                    <Smartphone className="h-6 w-6 text-green-500 stroke-[2.5]" />,
                    <Clock className="h-6 w-6 text-green-500 stroke-[2.5]" />,
                    <TrendingUp className="h-6 w-6 text-green-500 stroke-[2.5]" />,
                    <Lock className="h-6 w-6 text-green-500 stroke-[2.5]" />,
                  ]
                  const titles = [
                    "Scan Tracking",
                    "Geographic Insights",
                    "Device Analytics",
                    "Peak Times",
                    "Conversion Metrics",
                    "Security & Privacy",
                  ]
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex flex-col items-center text-center p-6 rounded-lg border bg-background hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-50 dark:bg-green-950 mb-4">
                        {icons[index]}
                      </div>
                      <h4 className="font-semibold mb-2">{titles[index]}</h4>
                      <p className="text-sm text-muted-foreground">{feature}</p>
                    </motion.div>
                  )
                })}
              </div>

              {/* Analytics Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-xl border bg-background shadow-lg"
              >

                <div className="relative bg-gradient-to-br from-muted/50 to-background overflow-hidden">
                  <AnalyticsPreview />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trusted by Businesses</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what our customers are saying about QrMonitor.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-lg border bg-background p-6"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">{testimonial.quote}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that's right for your business.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-5xl py-12">
              <Tabs defaultValue="monthly" className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="yearly">Yearly (Save 20%)</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="monthly">
                  <div className="grid gap-6 lg:grid-cols-3">
                    {pricingPlans.map((plan, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={cn(
                          "flex flex-col rounded-lg border bg-background p-6",
                          plan.popular && "border-primary shadow-lg",
                        )}
                      >
                        {plan.popular && (
                          <div className="inline-block rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground mb-4 self-start">
                            Most Popular
                          </div>
                        )}
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <div className="mt-4 flex items-baseline">
                          <span className="text-4xl font-bold">${plan.monthlyPrice}</span>
                          <span className="ml-1 text-muted-foreground">/month</span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                        <ul className="mt-6 space-y-3 flex-1">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-primary" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          className={cn("mt-8", !plan.popular && "bg-muted hover:bg-muted/80 text-foreground")}
                          variant={plan.popular ? "default" : "outline"}
                          asChild
                        >
                          <Link href="/payment-request">Get Started</Link>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="yearly">
                  <div className="grid gap-6 lg:grid-cols-3">
                    {pricingPlans.map((plan, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={cn(
                          "flex flex-col rounded-lg border bg-background p-6",
                          plan.popular && "border-primary shadow-lg",
                        )}
                      >
                        {plan.popular && (
                          <div className="inline-block rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground mb-4 self-start">
                            Most Popular
                          </div>
                        )}
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <div className="mt-4 flex items-baseline">
                          <span className="text-4xl font-bold">${Math.round(plan.monthlyPrice * 0.8)}</span>
                          <span className="ml-1 text-muted-foreground">/month</span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Billed annually (${Math.round(plan.monthlyPrice * 0.8 * 12)}/year)
                        </p>
                        <ul className="mt-6 space-y-3 flex-1">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-primary" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          className={cn("mt-8", !plan.popular && "bg-muted hover:bg-muted/80 text-foreground")}
                          variant={plan.popular ? "default" : "outline"}
                          asChild
                        >
                          <Link href="/payment-request">Get Started</Link>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">FAQ</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to know about QrMonitor.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl py-12">
              <Accordion type="single" collapsible className="w-full text-left">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
            <div className="mx-auto max-w-3xl text-center">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle>Ready to get started?</CardTitle>
                  <CardDescription>
                    Join thousands of businesses using QrMonitor to create dynamic QR codes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="lg" className="bg-primary text-primary-foreground">
                    <Link href="/payment-request">Get Started Free</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t pb-4 pt-12 md:pt-16 lg:pt-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center gap-4 justify-center">
              <div className="flex justify-center items-center gap-2">
                <QrCode className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">QrMonitor</span>
              </div>
              <p className="text-sm text-center text-muted-foreground max-w-[300px]">
                Dynamic QR codes that adapt to your needs. Track, analyze, and optimize your QR code performance.
              </p>
            </div>
            <div className="space-y-4">
              <ul className="text-sm flex gap-4 justify-center">
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 border-t pt-8">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} QrMonitor. All rights reserved.</p>
            <div className="flex gap-4 justify-center items-center">
              <p className="text-sm text-muted-foreground">Devloped by •</p>
              <Link href="https://www.linkedin.com/in/swerashed" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">LinkedIn</span>
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
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
              <Link href="https://github.com/swerashed" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">GitHub</span>
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
                  className="h-5 w-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Data
const features = [
  {
    title: "Dynamic Redirects",
    description: "Change your QR code's destination anytime, no reprint needed.",
    icon: (
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
        className="h-6 w-6"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" x2="21" y1="14" y2="3"></line>
      </svg>
    ),
  },
  {
    title: "Analytics Dashboard",
    description: "See scan counts, devices, locations, and more.",
    icon: (
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
        className="h-6 w-6"
      >
        <rect width="20" height="14" x="2" y="3" rx="2"></rect>
        <line x1="8" x2="8" y1="21" y2="17"></line>
        <line x1="16" x2="16" y1="21" y2="17"></line>
        <line x1="12" x2="12" y1="17" y2="21"></line>
        <path d="M2 9h20"></path>
      </svg>
    ),
  },
  {
    title: "Custom Settings",
    description: "Manage individual QR behavior with precision.",
    icon: (
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
        className="h-6 w-6"
      >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    ),
  },
]

const analyticsFeatures = [
  "Complete scan history with timestamps",
  "Location data by country & city",
  "Device types, OS, and browsers",
  "Hourly and daily engagement patterns",
  "Track conversions and goals",
  "Secure data with privacy controls",
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    avatar: "/placeholder.svg?height=48&width=48",
    quote:
      "QrMonitor has transformed how we manage our marketing campaigns. Being able to update QR destinations on the fly is a game-changer.",
  },
  {
    name: "Michael Chen",
    role: "Restaurant Owner",
    avatar: "/placeholder.svg?height=48&width=48",
    quote:
      "We use QrMonitor for our menus. When prices or items change, we update the link without reprinting anything. The analytics help us understand customer behavior.",
  },
  {
    name: "Emily Rodriguez",
    role: "Event Coordinator",
    avatar: "/placeholder.svg?height=48&width=48",
    quote:
      "For events, QrMonitor is essential. We can redirect attendees to updated schedules, maps, or emergency information instantly.",
  },
]

const pricingPlans = [
  {
    name: "Free",
    monthlyPrice: 0,
    description: "Perfect to get started with dynamic QR codes",
    features: [
      "Up to 6 dynamic QR codes",
      "9 destination changes per QR",
      "Basic analytics (30-day history)",
      "Email support",
      "QR code customization",
      "Lifetime QR codes"
    ],
    popular: false,
  },
  {
    name: "Starter",
    monthlyPrice: 9,
    description: "Perfect for individuals and small projects",
    features: [
      "Up to 25 dynamic QR codes",
      "Unlimited destination changes",
      "Advanced analytics (90-day history)",
      "Priority email support",
      "Custom branding",
      "Bulk operations",
      "Lifetime QR codes"
    ],
    popular: false,
  },
  {
    name: "Professional",
    monthlyPrice: 29,
    description: "Ideal for growing businesses",
    features: [
      "Up to 100 dynamic QR codes",
      "Unlimited destination changes",
      "Advanced analytics (1-year history)",
      "Priority support",
      "Custom branding",
      "API access",
      "Team collaboration (3 users)",
      "White-label options",
      "Lifetime QR codes"
    ],
    popular: true,
  },

]

const faqs = [
  {
    question: "Do my QR codes expire?",
    answer:
      "Never! Your QR codes work forever, even if you downgrade or cancel your subscription. Once created, your QR code is yours for life.",
  },
  {
    question: "Can I change my QR code's destination after printing?",
    answer:
      "Yes! That's the power of dynamic QR codes. Update the destination anytime from your dashboard without reprinting. The Free plan includes 9 changes per QR code, while paid plans offer unlimited changes.",
  },
  {
    question: "What happens when I reach my 9 destination changes on the Free plan?",
    answer:
      "You can upgrade to a paid plan for unlimited changes, or the QR will continue working with its last destination. Your QR code never stops working!",
  },
  {
    question: "What is a dynamic QR code?",
    answer:
      "Unlike static QR codes, dynamic QR codes can be updated after printing. This means you can change the destination URL without creating a new QR code.",
  },
  {
    question: "Do I need to install any software?",
    answer:
      "No, QrMonitor is a cloud-based platform. You only need a web browser to create, manage, and analyze your QR codes.",
  },
  {
    question: "Can I customize the appearance of my QR codes?",
    answer:
      "Yes, QrMonitor allows you to customize colors, add logos, and adjust the design of your QR codes while ensuring they remain scannable.",
  },
  {
    question: "What kind of analytics do you provide?",
    answer:
      "We track scans, locations, devices, operating systems, and time data. You can also set up conversion tracking for advanced analytics.",
  },
  {
    question: "Is there an API available?",
    answer:
      "Yes, our Professional and Enterprise plans include API access for integrating QR code generation and management into your own applications.",
  },
  {
    question: "How secure are the QR codes?",
    answer:
      "QrMonitor uses HTTPS for all redirects and implements security measures to prevent unauthorized access to your QR code management.",
  },
]

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}


function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  )
  const [message, setMessage] = useState('')

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      registerServiceWorker()
    }
  }, [])

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none',
    })
    const sub = await registration.pushManager.getSubscription()
    setSubscription(sub)
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    })
    setSubscription(sub)
    const serializedSub = JSON.parse(JSON.stringify(sub))
    await subscribeUser(serializedSub)
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe()
    setSubscription(null)
    await unsubscribeUser()
  }

  // async function sendTestNotification() {
  //   if (subscription) {
  //     await sendNotification(message)
  //     setMessage('')
  //   }
  // }

  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>
  }

  return (
    <div>
      <h3>Push Notifications</h3>
      {subscription ? (
        <>
          <p>You are subscribed to push notifications.</p>
          <button onClick={unsubscribeFromPush}>Unsubscribe</button>
          <input
            type="text"
            placeholder="Enter notification message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {/* <button onClick={sendTestNotification}>Send Test</button> */}
        </>
      ) : (
        <>
          <p>You are not subscribed to push notifications.</p>
          <button onClick={subscribeToPush}>Subscribe</button>
        </>
      )}
    </div>
  )
}


function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    )

    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
  }, [])

  if (isStandalone) {
    return null // Don't show install button if already installed
  }

  return (
    <div>
      <h3>Install App</h3>
      <button>Add to Home Screen</button>
      {isIOS && (
        <p>
          To install this app on your iOS device, tap the share button
          <span role="img" aria-label="share icon">
            {' '}
            ⎋{' '}
          </span>
          and then "Add to Home Screen"
          <span role="img" aria-label="plus icon">
            {' '}
            ➕{' '}
          </span>.
        </p>
      )}
    </div>
  )
}

