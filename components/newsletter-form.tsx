"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

interface NewsletterFormProps {
    variant?: "dark" | "light"
}

export function NewsletterForm({ variant = "dark" }: NewsletterFormProps) {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const isLight = variant === "light"

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!email || !email.includes("@")) {
            toast.error("Please enter a valid email address")
            return
        }

        setIsLoading(true)
        try {
            const response = await fetch("/api/newsletter/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })

            if (!response.ok) throw new Error("Failed to subscribe")

            toast.success("Subscribed successfully!")
            setEmail("")
        } catch (error) {
            toast.error("Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
            {!isLight && <p className="text-sm text-white/80 font-medium">Subscribe to our newsletter</p>}
            <div className="flex flex-col sm:flex-row gap-2">
                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className={`h-12 px-4 shadow-sm transition-all focus:ring-2 focus:ring-primary ${isLight
                        ? "bg-background border-border text-foreground placeholder:text-muted-foreground"
                        : "bg-white/10 border-white/20 text-white placeholder:text-white/40"
                        }`}
                />
                <Button
                    type="submit"
                    variant={isLight ? "default" : "secondary"}
                    disabled={isLoading}
                    size="lg"
                    className="shrink-0 shadow-lg"
                >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe Now"}
                </Button>
            </div>
        </form>
    )
}
