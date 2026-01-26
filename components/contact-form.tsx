"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Send, CheckCircle2, AlertCircle } from "lucide-react"

export function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        organization: "",
        message: "",
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<{
        type: "success" | "error" | null
        message: string
    }>({ type: null, message: "" })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus({ type: null, message: "" })

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.ok) {
                setSubmitStatus({
                    type: "success",
                    message: "Thank you! Your message has been sent successfully. We will get back to you shortly.",
                })
                // Reset form
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    organization: "",
                    message: "",
                })
            } else {
                setSubmitStatus({
                    type: "error",
                    message: data.error || "Failed to send message. Please try again or contact us directly.",
                })
            }
        } catch (error) {
            console.error("[CONTACT_SUBMIT_ERROR]", error)
            setSubmitStatus({
                type: "error",
                message: "Network error. Please check your connection and try again.",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="lg:col-span-2 p-8">
            <h3 className="text-2xl font-bold text-card-foreground mb-6">Send Us a Message</h3>

            {submitStatus.type && (
                <div
                    className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${submitStatus.type === "success"
                            ? "bg-green-50 border border-green-200 text-green-800"
                            : "bg-red-50 border border-red-200 text-red-800"
                        }`}
                >
                    {submitStatus.type === "success" ? (
                        <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    ) : (
                        <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm leading-relaxed">{submitStatus.message}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                            Full Name *
                        </label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Enter your full name"
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                            Email Address *
                        </label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="your.email@example.com"
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                            Phone Number *
                        </label>
                        <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="080 0000 0000"
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    <div>
                        <label htmlFor="organization" className="block text-sm font-medium text-foreground mb-2">
                            Organization
                        </label>
                        <Input
                            id="organization"
                            value={formData.organization}
                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                            placeholder="Your organization"
                            disabled={isSubmitting}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Project Details / Message *
                    </label>
                    <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your project requirements..."
                        rows={6}
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <Button type="submit" size="lg" className="w-full group" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
            </form>
        </Card>
    )
}
