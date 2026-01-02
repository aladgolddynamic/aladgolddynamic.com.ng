"use client"

import { NewsletterForm } from "./newsletter-form"
import { Card } from "@/components/ui/card"
import { Mail } from "lucide-react"

interface NewsletterSectionProps {
    title?: string
    description?: string
    className?: string
}

export function NewsletterSection({
    title = "Stay Updated with Our Latest Insights",
    description = "Subscribe to receive industry updates, project highlights, and expert insights directly to your inbox.",
    className = ""
}: NewsletterSectionProps) {
    return (
        <Card className={`p-8 md:p-12 relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 via-white to-primary/5 shadow-2xl ${className}`}>
            <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-2xl mx-auto text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 text-primary mb-6">
                    <Mail className="h-8 w-8" />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-card-foreground mb-4 tracking-tight">
                    {title}
                </h2>
                <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                    {description}
                </p>

                <div className="max-w-md mx-auto">
                    <NewsletterForm variant="light" />
                </div>

                <p className="mt-6 text-xs text-muted-foreground">
                    We respect your privacy. Unsubscribe at any time.
                </p>
            </div>
        </Card>
    )
}
